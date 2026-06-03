import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useEasterEggs } from "./EasterEggContext";
import "./SecretTerminal.css";

const SPACE_ROUTE = "/spacex";

const SPACE_TERMS = [
  "space",
  "spacex",
  "grok",
  "musk",
  "dragon",
  "raptor",
  "starship",
  "star",
  "mars",
  "moon",
  "merlin",
  "falcon",
  "orbit",
  "launch",
  "rocket",
  "superheavy",
  "booster",
];

const HELP_LINES = [
  "help - show this command list",
  "hint - get clues for undiscovered easter eggs",
  "cheat - grant every current easter egg",
  "spacex - open the SpaceX mission brief",
  "mars - also opens the SpaceX mission brief",
  "clear - clear the terminal",
  "close - hide the terminal",
];

function normalizeCommand(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^[\\/]+/, "")
    .replace(/[^a-z0-9]+/g, "");
}

function isHelpCommand(command) {
  return ["help", "commands", "cmds"].includes(command);
}

function isHintCommand(command) {
  return ["hint", "hints", "clue", "clues"].includes(command);
}

function isCheatCommand(command) {
  return ["cheat", "unlockall", "unlockeggs", "sudo"].includes(command);
}

function isClearCommand(command) {
  return ["clear", "cls"].includes(command);
}

function isCloseCommand(command) {
  return ["close", "exit", "quit"].includes(command);
}

function isSpaceCommand(command) {
  return SPACE_TERMS.some((term) => command.includes(term));
}

function SecretTerminal() {
  const history = useHistory();
  const {
    closeTerminal,
    eggs,
    grantAllEggsFromTerminal,
    terminalFlashRequest,
    terminalFocusRequest,
    terminalOpen,
    unlockedEggs,
  } = useEasterEggs();
  const [command, setCommand] = useState("");
  const [terminalFlashing, setTerminalFlashing] = useState(false);
  const [lines, setLines] = useState([
    { kind: "system", text: "Terminal online." },
    { kind: "system", text: "Type help for commands." },
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!terminalOpen) {
      return;
    }

    window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  }, [terminalFocusRequest, terminalOpen]);

  useEffect(() => {
    if (!terminalOpen || terminalFlashRequest === 0) {
      return undefined;
    }

    setTerminalFlashing(true);
    const timeoutId = window.setTimeout(() => {
      setTerminalFlashing(false);
    }, 1320);

    return () => window.clearTimeout(timeoutId);
  }, [terminalFlashRequest, terminalOpen]);

  if (!terminalOpen) {
    return null;
  }

  const appendLines = (nextLines) => {
    setLines((currentLines) => [...currentLines, ...nextLines]);
  };

  const showHelp = () => {
    appendLines([
      { kind: "system", text: "Available commands:" },
      ...HELP_LINES.map((text) => ({ kind: "output", text })),
    ]);
  };

  const showHints = () => {
    const remainingEggs = eggs.filter((egg) => !unlockedEggs.includes(egg.id));

    if (remainingEggs.length === 0) {
      appendLines([
        {
          kind: "output",
          text: "No pending hints. Every current easter egg is unlocked.",
        },
      ]);
      return;
    }

    appendLines([
      { kind: "system", text: "Remaining hints:" },
      ...remainingEggs.map((egg) => ({
        kind: "output",
        text: egg.hint || "Keep exploring the controls.",
      })),
    ]);
  };

  const runCommand = (event) => {
    event.preventDefault();
    const rawCommand = command.trim();
    const normalizedCommand = normalizeCommand(rawCommand);

    if (!rawCommand) {
      return;
    }

    setCommand("");
    appendLines([{ kind: "command", text: `> ${rawCommand}` }]);

    if (!normalizedCommand) {
      appendLines([{ kind: "error", text: "Command not recognized." }]);
      return;
    }

    if (isHelpCommand(normalizedCommand)) {
      showHelp();
      return;
    }

    if (isHintCommand(normalizedCommand)) {
      showHints();
      return;
    }

    if (isCheatCommand(normalizedCommand)) {
      grantAllEggsFromTerminal();
      appendLines([
        {
          kind: "output",
          text: "Override accepted. All current easter eggs are unlocked.",
        },
        {
          kind: "output",
          text: "Trophy Room sharing now mentions the secret terminal.",
        },
      ]);
      return;
    }

    if (isClearCommand(normalizedCommand)) {
      setLines([{ kind: "system", text: "Terminal cleared." }]);
      return;
    }

    if (isCloseCommand(normalizedCommand)) {
      closeTerminal();
      return;
    }

    if (isSpaceCommand(normalizedCommand)) {
      appendLines([{ kind: "output", text: "Opening SpaceX mission brief..." }]);
      window.setTimeout(() => {
        history.push(SPACE_ROUTE);
        closeTerminal();
      }, 260);
      return;
    }

    appendLines([
      { kind: "error", text: "Command not recognized. Try help." },
    ]);
  };

  return (
    <aside
      aria-label="Secret terminal"
      className={`secret-terminal${terminalFlashing ? " flashing" : ""}`}
      role="dialog"
    >
      <div className="secret-terminal-header">
        <span className="terminal-status-dot" aria-hidden="true" />
        <strong>patrick://hidden</strong>
        <button
          aria-label="Close terminal"
          className="terminal-close"
          onClick={closeTerminal}
          type="button"
        >
          X
        </button>
      </div>
      <div className="terminal-output" aria-live="polite">
        {lines.map((line, index) => (
          <div
            className={`terminal-line ${line.kind}`}
            key={`${line.text}-${index}`}
          >
            {line.text}
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={runCommand}>
        <span aria-hidden="true" className="terminal-prompt">
          &gt;
        </span>
        <input
          aria-label="Terminal command"
          autoComplete="off"
          className="terminal-input"
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeTerminal();
            }
          }}
          placeholder="type help"
          ref={inputRef}
          spellCheck="false"
          value={command}
        />
        <button className="terminal-submit" type="submit">
          Run
        </button>
      </form>
    </aside>
  );
}

export default SecretTerminal;
