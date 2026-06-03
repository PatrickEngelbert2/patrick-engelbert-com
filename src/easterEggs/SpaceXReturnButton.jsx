import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useEasterEggs } from "./EasterEggContext";
import "./SpaceXReturnButton.css";

const SPACEX_PATH = "/spacex";

function SpaceXReturnButton() {
  const history = useHistory();
  const location = useLocation();
  const { markSpaceXVisited, spaceXVisited, terminalOpen } = useEasterEggs();
  const onSpaceXPage = location.pathname === SPACEX_PATH;

  useEffect(() => {
    if (onSpaceXPage) {
      markSpaceXVisited();
    }
  }, [markSpaceXVisited, onSpaceXPage]);

  if (!spaceXVisited || onSpaceXPage || terminalOpen) {
    return null;
  }

  return (
    <button
      className="spacex-return-button"
      onClick={() => history.push(SPACEX_PATH)}
      type="button"
    >
      <i className="bi bi-rocket-takeoff-fill" aria-hidden="true" />
      <span>Mission Brief</span>
    </button>
  );
}

export default SpaceXReturnButton;
