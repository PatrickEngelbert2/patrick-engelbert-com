import React, { useEffect, useRef, useState } from "react";
import LinkedIn from "../images/linkedin.svg?react";
import GitHub from "../images/github.svg?react";
import { Link, useLocation } from "react-router-dom";
import { useEasterEggs } from "../easterEggs/EasterEggContext";
import "./Header.css";

function Header() {
  const location = useLocation();
  const { unlockEgg } = useEasterEggs();
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const [brandPingActive, setBrandPingActive] = useState(false);
  const resumeMenuRef = useRef(null);
  const brandTapRef = useRef({ count: 0, time: 0 });
  const brandPingTimerRef = useRef(null);
  const resumeActive =
    location.pathname === "/resume/software-engineering" ||
    location.pathname === "/resume/robotics-controls" ||
    location.pathname === "/resume";

  const closeResumeMenu = () => {
    setResumeMenuOpen(false);
  };

  const revealBrandPing = () => {
    brandTapRef.current = { count: 0, time: 0 };
    unlockEgg("nameplate-ping");
    setBrandPingActive(false);
    window.clearTimeout(brandPingTimerRef.current);
    window.requestAnimationFrame(() => {
      setBrandPingActive(true);
    });
    brandPingTimerRef.current = window.setTimeout(() => {
      setBrandPingActive(false);
    }, 1400);
  };

  const handleBrandClick = () => {
    const now = window.performance.now();
    const previousTap = brandTapRef.current;
    const count = now - previousTap.time < 1600 ? previousTap.count + 1 : 1;

    brandTapRef.current = { count, time: now };

    if (count >= 2) {
      revealBrandPing();
    }
  };

  useEffect(() => {
    setResumeMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!resumeMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (resumeMenuRef.current?.contains(event.target)) {
        return;
      }

      setResumeMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setResumeMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [resumeMenuOpen]);

  useEffect(() => {
    return () => {
      window.clearTimeout(brandPingTimerRef.current);
    };
  }, []);

  return (
    <header className="sticky-inner subtle-shadow">
      <nav className="navbar navbar-default navbar-static-top navbar-expand-lg navbar-light navbar-dark bg-gradient">
        <Link
          className={`navbar-brand${brandPingActive ? " brand-ping" : ""}`}
          onClick={handleBrandClick}
          onDoubleClick={revealBrandPing}
          to="/"
        >
          Patrick Engelbert
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Home <span className="sr-only">(current)</span>
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === "/portfolio" ? "active" : ""
              }`}
              to="/portfolio"
            >
              Portfolio
            </Link>
            <div className="resume-nav-direct">
              <Link
                className={`nav-item nav-link ${
                  location.pathname === "/resume/software-engineering" ||
                  location.pathname === "/resume"
                    ? "active"
                    : ""
                }`}
                to="/resume/software-engineering"
              >
                Software Engineering
              </Link>
              <Link
                className={`nav-item nav-link ${
                  location.pathname === "/resume/robotics-controls"
                    ? "active"
                    : ""
                }`}
                to="/resume/robotics-controls"
              >
                Robotics & Controls
              </Link>
            </div>
            <div
              className={`resume-nav-menu${
                resumeMenuOpen ? " open" : ""
              }${resumeActive ? " active" : ""}`}
              ref={resumeMenuRef}
            >
              <button
                aria-controls="resumeNavDropdown"
                aria-expanded={resumeMenuOpen}
                aria-haspopup="true"
                className="nav-item nav-link resume-nav-toggle"
                onClick={() => setResumeMenuOpen((current) => !current)}
                type="button"
              >
                Resumes
                <i className="bi bi-chevron-down" aria-hidden="true" />
              </button>
              <div
                className="resume-nav-dropdown"
                id="resumeNavDropdown"
                role="menu"
              >
                <Link
                  className="resume-nav-dropdown-link"
                  onClick={closeResumeMenu}
                  role="menuitem"
                  to="/resume/software-engineering"
                >
                  Software Engineering
                </Link>
                <Link
                  className="resume-nav-dropdown-link"
                  onClick={closeResumeMenu}
                  role="menuitem"
                  to="/resume/robotics-controls"
                >
                  Robotics & Controls
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto d-flex align-items-center">
          <Link
            to="/contact"
            className="btn btn-secondary request-contact-info-btn btn-sm mr-2"
          >
            Contact Me
          </Link>
          <section className="mb-2 social-icons">
            <a
              href="https://www.linkedin.com/in/patrick-engelbert/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="social-icon social-icon-large social-icon-margin linkedin subtle-shadow" />
            </a>
            <a
              href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub className="social-icon social-icon-large github subtle-shadow" />
            </a>
          </section>
        </div>
      </nav>
    </header>
  );
}

export default Header;
