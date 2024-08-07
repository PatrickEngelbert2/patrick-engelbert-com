import React, { useEffect } from "react";
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

  const navigateToResume = () => {
    history.push("/resume");
  };

  const navigateToContactMe = () => {
    history.push("/contact");
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const letters = document.querySelectorAll(".recoil-letter");
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        const scale = Math.max(0, 1 - distance / maxDistance);
        letter.style.transform = `translate(${-dx * scale}px, ${
          -dy * scale
        }px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const wrapTextInSpans = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="recoil-letter">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="header-internal-content">
          <h1 className="header-title">
            {wrapTextInSpans("Patrick Engelbert:")}
            <small className="header-subtitle">
              {wrapTextInSpans(" A Full-Stack Software Engineer")}
            </small>
          </h1>
          <p className="header-lead">
            {wrapTextInSpans(
              "Welcome! This is my personal website - created using React, and deployed via AWS."
            )}
          </p>
        </div>
        <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center section-spacing">
          <img
            src={selfImageUrl}
            className="img-thumbnail rounded max-size d-none d-lg-block subtle-shadow"
            alt="Patrick Engelbert's self portrait of him wearing a suit and tie"
          />
          <div className="button-container home-btn-background mx-3">
            <button
              className="btn btn-primary btn-animations-plus btn-lg mb-3"
              onClick={navigateToPortfolio}
            >
              View My Portfolio
              <img
                src={Rocket}
                alt="Rocket icon"
                className="ml-2 rocket-icon"
              />{" "}
            </button>
            <button
              className="btn btn-primary btn-animations-plus btn-lg mb-3"
              onClick={navigateToResume}
            >
              Interactive Resume
            </button>
            <button
              className="btn btn-primary btn-animations-plus btn-lg"
              onClick={navigateToContactMe}
            >
              Contact Me
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
