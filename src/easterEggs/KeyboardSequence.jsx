import React, { useEffect, useRef, useState } from "react";
import { useEasterEggs } from "./EasterEggContext";
import "./KeyboardSequence.css";

const SEQUENCE = [
  { key: "ArrowUp", label: "UP" },
  { key: "ArrowUp", label: "UP" },
  { key: "ArrowDown", label: "DN" },
  { key: "ArrowDown", label: "DN" },
  { key: "ArrowLeft", label: "LT" },
  { key: "ArrowRight", label: "RT" },
  { key: "ArrowLeft", label: "LT" },
  { key: "ArrowRight", label: "RT" },
];

function isSequenceKey(key) {
  return key?.startsWith("Arrow");
}

function isLaunchCodeTrigger(key) {
  return isSequenceKey(key) || key?.length === 1;
}

function isEditableElement(element) {
  if (!element) {
    return false;
  }

  const tagName = element.tagName?.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    element.isContentEditable
  );
}

function KeyboardSequence() {
  const { flashTerminal, unlockEgg } = useEasterEggs();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Launch-code listener armed.");
  const hideTimerRef = useRef(null);
  const progressRef = useRef(0);
  const flashTerminalRef = useRef(flashTerminal);
  const unlockEggRef = useRef(unlockEgg);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    flashTerminalRef.current = flashTerminal;
  }, [flashTerminal]);

  useEffect(() => {
    unlockEggRef.current = unlockEgg;
  }, [unlockEgg]);

  useEffect(() => {
    const hideLater = (delay = 5200) => {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, delay);
    };

    const handleKeyDown = (event) => {
      const key = event.key;

      if (!isLaunchCodeTrigger(key) || isEditableElement(event.target)) {
        return;
      }

      if (isSequenceKey(key) || key === " ") {
        event.preventDefault();
      }

      setVisible(true);
      hideLater();

      const expectedKey = SEQUENCE[progressRef.current]?.key;

      if (key === expectedKey) {
        const nextProgress = progressRef.current + 1;
        setProgress(nextProgress);
        setMessage("Signal locked. Keep going.");

        if (nextProgress === SEQUENCE.length) {
          unlockEggRef.current("keyboard-wizard");
          flashTerminalRef.current();
          setProgress(0);
          setMessage("Launch code accepted. Terminal online.");
          hideLater(2600);
        }
        return;
      }

      if (key === SEQUENCE[0].key) {
        setProgress(1);
        setMessage("Sequence restarted. Classic pattern detected.");
        return;
      }

      setProgress(0);
      setMessage("Signal detected. Try the classic arrow-key pattern.");
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(hideTimerRef.current);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <aside className="keyboard-sequence-panel" aria-live="polite">
      <span className="keyboard-sequence-kicker">Launch code</span>
      <strong>{message}</strong>
      <div className="keyboard-sequence-steps" aria-label="Launch code sequence">
        {SEQUENCE.map((step, index) => (
          <span
            className={index < progress ? "complete" : ""}
            key={`${step.key}-${index}`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </aside>
  );
}

export default KeyboardSequence;
