import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";
import Rocket from "../images/rocket.svg";

function NotFound() {
  const history = useHistory();

  const navigateToHome = () => {
    history.push("/");
  };
  return (
    <div className="NotFound">
      <h1>Oops! We've made a wrong turn! This page doesn't exist!</h1>
      <p>Sorry, but the page you are looking for does not exist, has been removed, or is temporarily unavailable.</p>
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
