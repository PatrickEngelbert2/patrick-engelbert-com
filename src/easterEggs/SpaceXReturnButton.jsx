import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useEasterEggs } from "./EasterEggContext";
import Rocket from "../images/rocket.svg";
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
      <img alt="" aria-hidden="true" src={Rocket} />
      <span>Mission Brief</span>
    </button>
  );
}

export default SpaceXReturnButton;
