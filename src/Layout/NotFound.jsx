import React, { useState } from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";
import Rocket from "../images/rocket.svg";
import { useEasterEggs } from "../easterEggs/EasterEggContext";

function NotFound() {
  const history = useHistory();
  const { openTerminal, unlockEgg } = useEasterEggs();
  const [signalCommand, setSignalCommand] = useState("");

  const navigateToHome = () => {
    history.push("/");
  };

  const openLostSignalTerminal = () => {
    unlockEgg("recovered-signal");
    openTerminal();
  };

  const openLostSignalMission = () => {
    unlockEgg("recovered-signal");
    history.push("/spacex");
  };

  const handleSignalSubmit = (event) => {
    event.preventDefault();
    const normalizedCommand = signalCommand.trim().toLowerCase();

    if (normalizedCommand.includes("space") || normalizedCommand.includes("mars")) {
      openLostSignalMission();
      return;
    }

    openLostSignalTerminal();
  };

  return (
    <div className="NotFound">
      <h1>Oops! We've made a wrong turn! This page doesn't exist!</h1>
      <p>Sorry, but the page you are looking for does not exist, has been removed, or is temporarily unavailable.</p>
      <form className="lost-signal-panel" onSubmit={handleSignalSubmit}>
        <span>Lost signal</span>
        <input
          aria-label="Lost signal command"
          onChange={(event) => setSignalCommand(event.target.value)}
          placeholder="recover"
          value={signalCommand}
        />
        <div className="lost-signal-actions">
          <button type="submit">Recover</button>
          <button onClick={openLostSignalMission} type="button">
            Mission
          </button>
        </div>
      </form>
      <div className="col-6 text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={navigateToHome}
          >
            Take Me Home
            <img
              src={Rocket}
              alt="Rocket icon"
              className="ml-2 rocket-icon"
            />{" "}
          </button>
        </div>
    </div>
  );
}

export default NotFound;
