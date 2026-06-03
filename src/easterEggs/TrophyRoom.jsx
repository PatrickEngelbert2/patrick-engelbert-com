import React, { useEffect, useState } from "react";
import { useEasterEggs } from "./EasterEggContext";
import "./TrophyRoom.css";

const SHARE_URL = "https://patrickengelbert.com/";

function buildShareText(unlockedCount, totalCount, terminalCheatUsed) {
  if (terminalCheatUsed && unlockedCount >= totalCount) {
    return `I found a secret terminal on patrickengelbert.com and unlocked all ${totalCount} easter eggs. Can you find it?`;
  }

  if (unlockedCount >= totalCount) {
    return `I found all ${totalCount} easter eggs on patrickengelbert.com! Can you find them all?`;
  }

  return `I found ${unlockedCount} out of ${totalCount} easter eggs on patrickengelbert.com! Can you find them all?`;
}

function TrophyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="trophy-icon"
      viewBox="0 0 48 48"
      focusable="false"
    >
      <path d="M16 8h16v7c0 7-3.4 12-8 12s-8-5-8-12V8Z" />
      <path d="M16 12H8v4c0 5.4 3.3 9 8.5 9" />
      <path d="M32 12h8v4c0 5.4-3.3 9-8.5 9" />
      <path d="M24 27v7" />
      <path d="M17 40h14" />
      <path d="M20 34h8l2 6H18l2-6Z" />
    </svg>
  );
}

function groupEggsByPage(eggs) {
  return eggs.reduce((groups, egg) => {
    const groupName = egg.group || "Other";
    const existingGroup = groups.find((group) => group.name === groupName);

    if (existingGroup) {
      existingGroup.eggs.push(egg);
      return groups;
    }

    return [...groups, { name: groupName, eggs: [egg] }];
  }, []);
}

function TrophyRoom() {
  const {
    blueprintMode,
    blueprintUnlocked,
    blueprintUnlockCount,
    dismissLatestUnlock,
    eggs,
    latestUnlock,
    resetEggs,
    terminalCheatUsed,
    toggleBlueprintMode,
    unlockEgg,
    unlockedEggs,
  } = useEasterEggs();
  const [isOpen, setIsOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [visibleHints, setVisibleHints] = useState({});
  const [schematicNoteVisible, setSchematicNoteVisible] = useState(false);
  const latestEgg = eggs.find((egg) => egg.id === latestUnlock);
  const unlockedCount = unlockedEggs.length;
  const totalEggs = eggs.length;
  const groupedEggs = groupEggsByPage(eggs);
  const shareText = buildShareText(
    unlockedCount,
    totalEggs,
    terminalCheatUsed
  );
  const shareLinks = [
    {
      icon: "bi-linkedin",
      label: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        SHARE_URL
      )}&title=${encodeURIComponent(
        "Patrick Engelbert Portfolio"
      )}&summary=${encodeURIComponent(shareText)}&source=${encodeURIComponent(
        "patrickengelbert.com"
      )}`,
    },
    {
      icon: "bi-twitter-x",
      label: "X",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      icon: "bi-facebook",
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        SHARE_URL
      )}&quote=${encodeURIComponent(shareText)}`,
    },
  ];

  useEffect(() => {
    if (!latestUnlock) {
      return undefined;
    }

    const timeoutId = window.setTimeout(dismissLatestUnlock, 4200);
    return () => window.clearTimeout(timeoutId);
  }, [dismissLatestUnlock, latestUnlock]);

  useEffect(() => {
    setShareStatus("");
  }, [unlockedCount]);

  const handleReset = () => {
    resetEggs();
    setSchematicNoteVisible(false);
    setShareStatus("");
    setVisibleHints({});
    setIsOpen(false);
  };

  const toggleHint = (id) => {
    setVisibleHints((currentHints) => ({
      ...currentHints,
      [id]: !currentHints[id],
    }));
  };

  const openShareWindow = (platform, url) => {
    const shareWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (shareWindow) {
      shareWindow.opener = null;
    }
    setShareStatus(`${platform} opened`);
  };

  const copyShareText = async () => {
    const shareMessage = `${shareText} ${SHARE_URL}`;

    try {
      await navigator.clipboard.writeText(shareMessage);
      setShareStatus("Copied");
      return;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareMessage;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setShareStatus("Copied");
    }
  };

  const revealSchematicNote = () => {
    setSchematicNoteVisible(true);
    unlockEgg("blueprint-inspector");
  };

  if (unlockedEggs.length === 0 && !latestUnlock) {
    return null;
  }

  return (
    <>
      <button
        className="trophy-room-button"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open trophy room"
        aria-expanded={isOpen}
      >
        <TrophyIcon />
        <span className="trophy-room-count">
          {unlockedEggs.length}/{eggs.length}
        </span>
      </button>

      {latestEgg && (
        <aside className="egg-toast" role="status">
          <span className="egg-toast-label">Unlocked</span>
          <strong>{latestEgg.name}</strong>
        </aside>
      )}

      {isOpen && (
        <aside
          className="trophy-room-panel"
          role="dialog"
          aria-label="Trophy room"
        >
          <div className="trophy-room-header">
            <h2>Trophy Room</h2>
            <div className="trophy-room-actions">
              <button
                className="trophy-room-small-button"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="trophy-room-small-button"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="trophy-list">
            {groupedEggs.map((group) => {
              const remainingCount = group.eggs.filter(
                (egg) => !unlockedEggs.includes(egg.id)
              ).length;

              return (
                <section className="trophy-group" key={group.name}>
                  <div className="trophy-group-header">
                    <h3>{group.name}</h3>
                    <span>
                      {remainingCount === 0
                        ? "Complete"
                        : `${remainingCount} more to find`}
                    </span>
                  </div>
                  <div className="trophy-group-list">
                    {group.eggs.map((egg) => {
                      const unlocked = unlockedEggs.includes(egg.id);
                      const hintVisible = visibleHints[egg.id];

                      return (
                        <article
                          className={`trophy-card${
                            unlocked ? " unlocked" : ""
                          }`}
                          key={egg.id}
                        >
                          <span className="trophy-card-mark">
                            {unlocked ? "OK" : "?"}
                          </span>
                          <div>
                            <h4>{egg.name}</h4>
                            <p>
                              {unlocked ? egg.description : "Undiscovered."}
                            </p>
                            {!unlocked && (
                              <div className="trophy-hint-area">
                                <button
                                  className="trophy-hint-button"
                                  onClick={() => toggleHint(egg.id)}
                                  type="button"
                                >
                                  {hintVisible ? "Hide hint" : "Hint"}
                                </button>
                                {hintVisible && (
                                  <p className="trophy-hint-text">
                                    {egg.hint || "Keep exploring."}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {blueprintUnlocked && (
            <section className="trophy-bonus-panel" aria-label="Blueprint mode">
              <div className="blueprint-reward-row">
                <div>
                  <span className="trophy-room-kicker">
                    {blueprintUnlockCount}+ found
                  </span>
                  <h3>Blueprint Mode</h3>
                </div>
                <button
                  aria-label="Inspect schematic note"
                  className={`schematic-mark${
                    schematicNoteVisible ? " active" : ""
                  }`}
                  onClick={revealSchematicNote}
                  type="button"
                >
                  <span />
                </button>
                <button
                  aria-checked={blueprintMode}
                  className={`blueprint-switch${
                    blueprintMode ? " active" : ""
                  }`}
                  onClick={toggleBlueprintMode}
                  role="switch"
                  type="button"
                >
                  <span className="blueprint-switch-track">
                    <span className="blueprint-switch-thumb" />
                  </span>
                  <span>{blueprintMode ? "On" : "Off"}</span>
                </button>
              </div>
              {schematicNoteVisible && (
                <p className="schematic-note">
                  Schematic note: two skill buses meet cleanly at the same
                  controller.
                </p>
              )}
            </section>
          )}

          <section className="share-panel" aria-label="Share trophy progress">
            <span className="trophy-room-kicker">Share success</span>
            <p className="share-message">{shareText}</p>
            <div className="share-actions">
              {shareLinks.map((link) => (
                <button
                  aria-label={`Share on ${link.label}`}
                  className="share-button"
                  key={link.label}
                  onClick={() => openShareWindow(link.label, link.url)}
                  title={`Share on ${link.label}`}
                  type="button"
                >
                  <i className={`bi ${link.icon}`} aria-hidden="true" />
                  <span>{link.label}</span>
                </button>
              ))}
              <button
                aria-label="Copy share text"
                className="share-button"
                onClick={copyShareText}
                title="Copy share text"
                type="button"
              >
                <i className="bi bi-link-45deg" aria-hidden="true" />
                <span>Copy</span>
              </button>
            </div>
            {shareStatus && (
              <span className="share-status" role="status">
                {shareStatus}
              </span>
            )}
          </section>
        </aside>
      )}
    </>
  );
}

export default TrophyRoom;
