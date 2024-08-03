import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import Rocket from "../images/rocket.svg";

function Home() {
  const history = useHistory();
  const selfImageUrl =
    "https://images-patrickengelbert.s3.us-east-2.amazonaws.com/bluebackground-better2.jpg";

  const navigateToPortfolio = () => {
    history.push("/portfolio");
  };

  return (
    <>
    <div className="container">
      <div className="header-internal-content">
        <h1 className="header-title">
          Patrick Engelbert:
          <small className="header-subtitle">
            {" "}
            A Full-Stack Software Engineer
          </small>
        </h1>
        <p className="header-lead">
          Welcome! This is my personal website - created using React, and
          deployed via AWS.
        </p>
      </div>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center section-spacing">
        <img
          src={selfImageUrl}
          className="img-thumbnail rounded max-size d-none d-lg-block subtle-shadow"
          alt="Patrick Engelbert's self portrait of him wearing a suit and tie"
        />
        <div className="text-center mx-3 my-3 my-md-0">
          <button
            className="btn btn-primary btn-lg mb-3 mb-md-0"
            onClick={navigateToPortfolio}
          >
            View My Portfolio
            <img
              src={Rocket}
              alt="Rocket icon"
              className="ml-2 rocket-icon"
            />{" "}
          </button>
        </div>
        <img
          src={selfImageUrl}
          className="img-thumbnail rounded max-size subtle-shadow"
          alt="Patrick Engelbert's self portrait of him wearing a suit and tie"
        />
      </div>
    </div>
    </>
  );
}

export default Home;
