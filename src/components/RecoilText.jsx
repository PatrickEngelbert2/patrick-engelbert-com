import { useEffect } from "react";
import "./RecoilText.css";

const MAX_RECOIL_DISTANCE = 100;

function prefersStaticText() {
  if (typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)"
  ).matches;
}

function resetRecoilGroup(group) {
  group.element.classList.remove("recoil-text--active");
  group.letters.forEach((letter) => {
    letter.style.transform = "";
  });
}

export function useRecoilEffect(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const groups = Array.from(
      container.querySelectorAll("[data-recoil-text]")
    ).map((element) => ({
      element,
      letters: Array.from(element.querySelectorAll(".recoil-letter")),
    }));

    if (groups.length === 0 || prefersStaticText()) {
      return undefined;
    }

    let animationFrameId = null;
    let pointer = null;

    const updateLetters = () => {
      animationFrameId = null;
      if (!pointer) {
        return;
      }

      groups.forEach((group) => {
        const groupRect = group.element.getBoundingClientRect();
        const isNearGroup =
          pointer.x >= groupRect.left - MAX_RECOIL_DISTANCE &&
          pointer.x <= groupRect.right + MAX_RECOIL_DISTANCE &&
          pointer.y >= groupRect.top - MAX_RECOIL_DISTANCE &&
          pointer.y <= groupRect.bottom + MAX_RECOIL_DISTANCE;

        if (!isNearGroup) {
          resetRecoilGroup(group);
          return;
        }

        group.element.classList.add("recoil-text--active");
        group.letters.forEach((letter) => {
          const rect = letter.getBoundingClientRect();
          const dx = pointer.x - (rect.left + rect.width / 2);
          const dy = pointer.y - (rect.top + rect.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const scale = Math.max(0, 1 - distance / MAX_RECOIL_DISTANCE);

          letter.style.transform = `translate(${-dx * scale}px, ${
            -dy * scale
          }px)`;
        });
      });
    };

    const handleMouseMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateLetters);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      groups.forEach(resetRecoilGroup);
    };
  }, [containerRef]);
}

function DecorativeLetters({ text }) {
  return text.split(/(\s+)/).map((part, partIndex) => {
    if (/^\s+$/.test(part)) {
      return <span className="recoil-space" key={`space-${partIndex}`} />;
    }

    return (
      <span className="recoil-word" key={`word-${partIndex}`}>
        {Array.from(part).map((character, characterIndex) => (
          <span
            className="recoil-letter"
            data-character={character}
            key={`${character}-${characterIndex}`}
          />
        ))}
      </span>
    );
  });
}

function RecoilText({ text }) {
  return (
    <span className="recoil-text" data-recoil-text>
      <span className="recoil-text__semantic">{text}</span>
      <span className="recoil-text__visual" aria-hidden="true">
        <DecorativeLetters text={text} />
      </span>
    </span>
  );
}

export default RecoilText;
