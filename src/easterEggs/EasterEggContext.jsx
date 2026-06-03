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
  },
  {
    id: "commissioned",
    name: "Commissioned",
    description: "Bring the cell into RUN mode.",
  },
  {
    id: "operator-mode",
    name: "Operator Mode",
    description: "Found the software-and-controls split.",
  },
];

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
  const [blueprintMode, setBlueprintMode] = useState(() =>
    readStoredBlueprintMode(unlockedEggs.length >= BLUEPRINT_UNLOCK_COUNT)
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalFocusRequest, setTerminalFocusRequest] = useState(0);
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
    setTerminalCheatUsed(false);
    setUnlockedEggs([]);
  }, []);

  const grantAllEggsFromTerminal = useCallback(() => {
    setLatestUnlock(null);
    setTerminalCheatUsed(true);
    setUnlockedEggs(EASTER_EGGS.map((egg) => egg.id));
  }, []);

  const openTerminal = useCallback(() => {
    setTerminalOpen(true);
    setTerminalFocusRequest((current) => current + 1);
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
      grantAllEggsFromTerminal,
      unlockedEggs,
      latestUnlock,
      dismissLatestUnlock,
      isUnlocked: (id) => unlockedEggs.includes(id),
      markSpaceXVisited,
      openTerminal,
      resetEggs,
      spaceXVisited,
      terminalCheatUsed,
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
      grantAllEggsFromTerminal,
      latestUnlock,
      markSpaceXVisited,
      openTerminal,
      resetEggs,
      spaceXVisited,
      terminalCheatUsed,
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
