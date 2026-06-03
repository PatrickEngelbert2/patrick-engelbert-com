import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "patrick-engelbert:easter-eggs";
const BLUEPRINT_MODE_STORAGE_KEY = "patrick-engelbert:blueprint-mode";
const TERMINAL_CHEAT_STORAGE_KEY = "patrick-engelbert:terminal-cheat";
const SPACEX_VISITED_STORAGE_KEY = "patrick-engelbert:spacex-visited";
export const BLUEPRINT_UNLOCK_COUNT = 3;

export const EASTER_EGGS = [
  {
    id: "liftoff",
    name: "Liftoff",
    description: "Suit up for launch.",
    group: "Home",
    hint: "Home page: the smallest launch control is not just decorative.",
  },
  {
    id: "commissioned",
    name: "Commissioned",
    description: "Bring the cell into RUN mode.",
    group: "Robotics Resume",
    hint: "Robotics resume: industrial systems like the right startup sequence.",
  },
  {
    id: "operator-mode",
    name: "Operator Mode",
    description: "Found the software-and-controls split.",
    group: "Home",
    hint: "Home page: the profile photo hides a software-and-controls split.",
  },
  {
    id: "keyboard-wizard",
    name: "Keyboard Wizard",
    description: "Entered the launch-code sequence.",
    group: "Global",
    hint: "Any page: a classic key pattern starts with two ups.",
  },
  {
    id: "nameplate-ping",
    name: "Nameplate Ping",
    description: "Tapped the gold nameplate until it answered.",
    group: "Global",
    hint: "Any page: the gold name in the navigation bar likes repeated attention.",
  },
  {
    id: "headline-tamer",
    name: "Headline Tamer",
    description: "Got the home page headline to settle down.",
    group: "Home",
    hint: "Home page: the big intro text reacts when you give it a few taps.",
  },
  {
    id: "portfolio-inspector",
    name: "Portfolio Inspector",
    description: "Inspected enough projects to find the pattern.",
    group: "Portfolio",
    hint: "Portfolio page: look closely at several project cards.",
  },
  {
    id: "double-degree",
    name: "Double Degree",
    description: "Found the fine print in the education section.",
    group: "Software Resume",
    hint: "Software resume: one education note is more clickable than it looks.",
  },
  {
    id: "orbit-check",
    name: "Orbit Check",
    description: "Calibrated the hidden mission brief vehicle.",
    group: "SpaceX",
    hint: "SpaceX brief: the vehicle display is not just a decoration.",
  },
  {
    id: "blueprint-inspector",
    name: "Blueprint Inspector",
    description: "Found the schematic note inside blueprint mode.",
    group: "Trophy Room",
    hint: "Trophy Room: after Blueprint Mode unlocks, inspect the schematic mark.",
  },
  {
    id: "dual-stack",
    name: "Dual Stack",
    description: "Saw both sides of the machine.",
    group: "Resumes",
    hint: "Resumes: compare both the software side and the controls side in one session.",
  },
  {
    id: "root-access",
    name: "Root Access",
    description: "Ran the recruiter-grade terminal command.",
    group: "Terminal",
    hint: "Terminal: try a confident command that starts with sudo and ends with Patrick.",
  },
  {
    id: "flight-ready",
    name: "Flight Ready",
    description: "Completed the SpaceX launch checklist.",
    group: "SpaceX",
    hint: "SpaceX brief: use the action links in mission order: controls, software, contact.",
  },
  {
    id: "recovered-signal",
    name: "Recovered Signal",
    description: "Recovered from a lost route.",
    group: "404",
    hint: "404 page: the lost signal panel can still route you somewhere useful.",
  },
];

const SPACEX_CHECKLIST_STEPS = ["controls", "software", "contact"];

const EasterEggContext = createContext(null);

function readStoredEggs() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id) => EASTER_EGGS.some((egg) => egg.id === id))
      : [];
  } catch {
    return [];
  }
}

function readStoredBlueprintMode(defaultValue = false) {
  try {
    const stored = window.localStorage.getItem(BLUEPRINT_MODE_STORAGE_KEY);
    return stored === null ? defaultValue : stored === "true";
  } catch {
    return defaultValue;
  }
}

function readStoredTerminalCheat() {
  try {
    return window.localStorage.getItem(TERMINAL_CHEAT_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function readStoredSpaceXVisited() {
  try {
    return window.localStorage.getItem(SPACEX_VISITED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function EasterEggProvider({ children }) {
  const [unlockedEggs, setUnlockedEggs] = useState(readStoredEggs);
  const [latestUnlock, setLatestUnlock] = useState(null);
  const [resumeVisits, setResumeVisits] = useState({
    robotics: false,
    software: false,
  });
  const [spaceXChecklistStep, setSpaceXChecklistStep] = useState(0);
  const [blueprintMode, setBlueprintMode] = useState(() =>
    readStoredBlueprintMode(unlockedEggs.length >= BLUEPRINT_UNLOCK_COUNT)
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalFocusRequest, setTerminalFocusRequest] = useState(0);
  const [terminalFlashRequest, setTerminalFlashRequest] = useState(0);
  const [terminalCheatUsed, setTerminalCheatUsed] = useState(
    readStoredTerminalCheat
  );
  const [spaceXVisited, setSpaceXVisited] = useState(readStoredSpaceXVisited);
  const blueprintUnlocked = unlockedEggs.length >= BLUEPRINT_UNLOCK_COUNT;
  const previouslyBlueprintUnlocked = useRef(blueprintUnlocked);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedEggs));
  }, [unlockedEggs]);

  useEffect(() => {
    window.localStorage.setItem(
      BLUEPRINT_MODE_STORAGE_KEY,
      String(blueprintMode)
    );
  }, [blueprintMode]);

  useEffect(() => {
    window.localStorage.setItem(
      TERMINAL_CHEAT_STORAGE_KEY,
      String(terminalCheatUsed)
    );
  }, [terminalCheatUsed]);

  useEffect(() => {
    window.localStorage.setItem(
      SPACEX_VISITED_STORAGE_KEY,
      String(spaceXVisited)
    );
  }, [spaceXVisited]);

  useEffect(() => {
    if (blueprintUnlocked && !previouslyBlueprintUnlocked.current) {
      setBlueprintMode(true);
    }

    if (!blueprintUnlocked) {
      setBlueprintMode(false);
    }

    previouslyBlueprintUnlocked.current = blueprintUnlocked;
  }, [blueprintUnlocked]);

  useEffect(() => {
    const blueprintActive = blueprintUnlocked && blueprintMode;
    document.documentElement.classList.toggle("blueprint-mode", blueprintActive);
    document.body.classList.toggle("blueprint-mode", blueprintActive);

    return () => {
      document.documentElement.classList.remove("blueprint-mode");
      document.body.classList.remove("blueprint-mode");
    };
  }, [blueprintMode, blueprintUnlocked]);

  const unlockEgg = useCallback(
    (id) => {
      const eggExists = EASTER_EGGS.some((egg) => egg.id === id);
      if (!eggExists || unlockedEggs.includes(id)) {
        return false;
      }

      setUnlockedEggs((currentEggs) =>
        currentEggs.includes(id) ? currentEggs : [...currentEggs, id]
      );
      setLatestUnlock(id);
      return true;
    },
    [unlockedEggs]
  );

  const dismissLatestUnlock = useCallback(() => {
    setLatestUnlock(null);
  }, []);

  const resetEggs = useCallback(() => {
    setLatestUnlock(null);
    setBlueprintMode(false);
    setResumeVisits({ robotics: false, software: false });
    setSpaceXChecklistStep(0);
    setTerminalCheatUsed(false);
    setUnlockedEggs([]);
  }, []);

  const grantAllEggsFromTerminal = useCallback(() => {
    setLatestUnlock(null);
    setTerminalCheatUsed(true);
    setUnlockedEggs(EASTER_EGGS.map((egg) => egg.id));
  }, []);

  const markResumeVisited = useCallback(
    (resumeType) => {
      setResumeVisits((currentVisits) => {
        const nextVisits = { ...currentVisits, [resumeType]: true };
        if (nextVisits.robotics && nextVisits.software) {
          unlockEgg("dual-stack");
        }

        return nextVisits;
      });
    },
    [unlockEgg]
  );

  const markSpaceXChecklistStep = useCallback(
    (step) => {
      setSpaceXChecklistStep((currentStep) => {
        const expectedStep = SPACEX_CHECKLIST_STEPS[currentStep];

        if (step === expectedStep) {
          const nextStep = currentStep + 1;
          if (nextStep === SPACEX_CHECKLIST_STEPS.length) {
            unlockEgg("flight-ready");
            return 0;
          }

          return nextStep;
        }

        return step === SPACEX_CHECKLIST_STEPS[0] ? 1 : 0;
      });
    },
    [unlockEgg]
  );

  const openTerminal = useCallback(() => {
    setTerminalOpen(true);
    setTerminalFocusRequest((current) => current + 1);
  }, []);

  const flashTerminal = useCallback(() => {
    setTerminalOpen(true);
    setTerminalFocusRequest((current) => current + 1);
    setTerminalFlashRequest((current) => current + 1);
  }, []);

  const closeTerminal = useCallback(() => {
    setTerminalOpen(false);
  }, []);

  const markSpaceXVisited = useCallback(() => {
    setSpaceXVisited(true);
  }, []);

  const toggleBlueprintMode = useCallback(() => {
    if (!blueprintUnlocked) {
      return;
    }

    setBlueprintMode((current) => !current);
  }, [blueprintUnlocked]);

  const value = useMemo(
    () => ({
      blueprintMode: blueprintUnlocked && blueprintMode,
      blueprintUnlocked,
      blueprintUnlockCount: BLUEPRINT_UNLOCK_COUNT,
      closeTerminal,
      eggs: EASTER_EGGS,
      flashTerminal,
      grantAllEggsFromTerminal,
      unlockedEggs,
      latestUnlock,
      dismissLatestUnlock,
      isUnlocked: (id) => unlockedEggs.includes(id),
      markSpaceXVisited,
      markResumeVisited,
      markSpaceXChecklistStep,
      openTerminal,
      resetEggs,
      spaceXVisited,
      spaceXChecklistStep,
      terminalCheatUsed,
      terminalFlashRequest,
      terminalFocusRequest,
      terminalOpen,
      toggleBlueprintMode,
      unlockEgg,
    }),
    [
      blueprintMode,
      blueprintUnlocked,
      closeTerminal,
      dismissLatestUnlock,
      flashTerminal,
      grantAllEggsFromTerminal,
      latestUnlock,
      markResumeVisited,
      markSpaceXChecklistStep,
      markSpaceXVisited,
      openTerminal,
      resetEggs,
      spaceXChecklistStep,
      spaceXVisited,
      terminalCheatUsed,
      terminalFlashRequest,
      terminalFocusRequest,
      terminalOpen,
      toggleBlueprintMode,
      unlockEgg,
      unlockedEggs,
    ]
  );

  return (
    <EasterEggContext.Provider value={value}>
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error("useEasterEggs must be used inside EasterEggProvider");
  }

  return context;
}
