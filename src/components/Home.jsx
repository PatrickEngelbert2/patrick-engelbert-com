import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import Rocket from "../images/rocket.svg";
import CowboyHatProfile from "../images/cowboyhat-profile.jpg";
import { useEasterEggs } from "../easterEggs/EasterEggContext";

function Home() {
  const history = useHistory();
  const selfImageUrl = CowboyHatProfile;
  const { openTerminal, unlockEgg } = useEasterEggs();
  const [helmetActive, setHelmetActive] = useState(false);
  const [rocketLaunching, setRocketLaunching] = useState(false);
  const [profileSecretActive, setProfileSecretActive] = useState(false);
  const [headlineSecretActive, setHeadlineSecretActive] = useState(false);
  const profilePhotoRef = useRef(null);
  const helmetTimerRef = useRef(null);
  const rocketTimerRef = useRef(null);
  const profileSecretTimerRef = useRef(null);
  const headlineTapRef = useRef({ count: 0, time: 0 });
  const headlineSecretTimerRef = useRef(null);
  const terminalTriggerRef = useRef({ source: "", time: 0 });

  const navigateToPortfolio = () => {
    history.push("/portfolio");
  };

  const navigateToResume = () => {
    history.push("/resume/software-engineering");
  };

  const navigateToRoboticsResume = () => {
    history.push("/resume/robotics-controls");
  };

  const navigateToContactMe = () => {
    history.push("/contact");
  };

  const registerTerminalTrigger = (source) => {
    const now = window.performance.now();
    const previousTrigger = terminalTriggerRef.current;

    if (previousTrigger.source === source && now - previousTrigger.time < 720) {
      terminalTriggerRef.current = { source: "", time: 0 };
      openTerminal();
      return;
    }

    terminalTriggerRef.current = { source, time: now };
  };

  const launchRocket = () => {
    registerTerminalTrigger("rocket");
    unlockEgg("liftoff");
    setHelmetActive(false);
    setRocketLaunching(false);
    window.clearTimeout(helmetTimerRef.current);
    window.clearTimeout(rocketTimerRef.current);

    const shouldScrollToProfile = window.matchMedia("(max-width: 768px)")
      .matches;
    if (shouldScrollToProfile && profilePhotoRef.current) {
      profilePhotoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    window.setTimeout(
      () => {
        window.requestAnimationFrame(() => {
          setHelmetActive(true);
          setRocketLaunching(true);
        });
      },
      shouldScrollToProfile ? 240 : 0
    );

    helmetTimerRef.current = window.setTimeout(() => {
      setHelmetActive(false);
    }, 5200);

    rocketTimerRef.current = window.setTimeout(() => {
      setRocketLaunching(false);
    }, 1200);
  };

  const revealProfileSecret = () => {
    registerTerminalTrigger("profile");
    unlockEgg("operator-mode");
    setProfileSecretActive(false);
    window.clearTimeout(profileSecretTimerRef.current);

    window.requestAnimationFrame(() => {
      setProfileSecretActive(true);
    });

    profileSecretTimerRef.current = window.setTimeout(() => {
      setProfileSecretActive(false);
    }, 7200);
  };

  const revealHeadlineSecret = () => {
    const now = window.performance.now();
    const previousTap = headlineTapRef.current;
    const count = now - previousTap.time < 2200 ? previousTap.count + 1 : 1;

    headlineTapRef.current = { count, time: now };

    if (count < 3) {
      return;
    }

    headlineTapRef.current = { count: 0, time: 0 };
    unlockEgg("headline-tamer");
    setHeadlineSecretActive(false);
    window.clearTimeout(headlineSecretTimerRef.current);
    window.requestAnimationFrame(() => {
      setHeadlineSecretActive(true);
    });

    headlineSecretTimerRef.current = window.setTimeout(() => {
      setHeadlineSecretActive(false);
    }, 1800);
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

  useEffect(() => {
    return () => {
      window.clearTimeout(helmetTimerRef.current);
      window.clearTimeout(rocketTimerRef.current);
      window.clearTimeout(profileSecretTimerRef.current);
      window.clearTimeout(headlineSecretTimerRef.current);
    };
  }, []);

  const wrapTextInSpans = (text) => {
    return text.split(/(\s+)/).map((word, wordIndex) => {
      if (/^\s+$/.test(word)) {
        return (
          <span key={wordIndex} className="recoil-space">
            {word.replace(/ /g, "\u00A0")}
          </span>
        );
      }

      return (
        <span key={wordIndex} className="recoil-word">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="recoil-letter">
              {char}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <>
      <div className="container">
        <div
          className={`header-internal-content${
            headlineSecretActive ? " headline-secret-active" : ""
          }`}
          onClick={revealHeadlineSecret}
        >
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
          <div
            className={`profile-photo-wrap${
              helmetActive ? " helmet-active" : ""
            }${profileSecretActive ? " profile-secret-active" : ""}`}
            ref={profilePhotoRef}
          >
            <button
              className="profile-photo-trigger"
              onClick={revealProfileSecret}
              onDoubleClick={openTerminal}
              type="button"
              aria-label="Reveal profile secret"
            >
              <img
                src={selfImageUrl}
                className="profile-photo img-thumbnail rounded max-size subtle-shadow"
                alt="Patrick Engelbert"
              />
              <svg
                className="astronaut-helmet-sketch"
                viewBox="0 0 320 300"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <filter
                    id="helmetCrayonRoughen"
                    x="-8%"
                    y="-8%"
                    width="116%"
                    height="116%"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.16"
                      numOctaves="4"
                      seed="23"
                      result="crayonNoise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="crayonNoise"
                      scale="2.8"
                    />
                  </filter>
                  <mask id="helmetCrayonMask">
                    <rect x="0" y="0" width="320" height="300" fill="white" />
                    <g
                      stroke="black"
                      strokeWidth="7.5"
                      strokeLinecap="round"
                      opacity="0.88"
                    >
                      <path d="M76 127 L87 130" />
                      <path d="M69 172 L81 170" />
                      <path d="M84 210 L98 213" />
                      <path d="M102 73 L114 67" />
                      <path d="M132 52 L144 49" />
                      <path d="M171 43 L185 45" />
                      <path d="M219 61 L230 70" />
                      <path d="M253 107 L262 120" />
                      <path d="M268 161 L259 174" />
                      <path d="M241 214 L226 219" />
                      <path d="M108 124 L122 119" />
                      <path d="M139 91 L154 88" />
                      <path d="M188 85 L202 89" />
                      <path d="M228 118 L239 129" />
                      <path d="M117 164 L133 168" />
                      <path d="M158 175 L174 174" />
                      <path d="M207 171 L222 166" />
                      <path d="M105 230 L121 236" />
                      <path d="M176 244 L192 242" />
                      <path d="M74 96 L82 107" />
                      <path d="M247 91 L256 103" />
                    </g>
                  </mask>
                </defs>
                <g
                  className="helmet-crayon-group"
                  filter="url(#helmetCrayonRoughen)"
                  mask="url(#helmetCrayonMask)"
                >
                  <path
                    className="helmet-line helmet-shell helmet-white"
                    d="M68 213 C55 166 65 104 108 63 C139 33 194 35 228 64 C271 101 286 161 266 214 C223 237 117 238 68 213 Z"
                  />
                  <path
                    className="helmet-line helmet-shell-wobble helmet-white"
                    d="M76 207 C61 158 76 101 116 68 C149 41 192 43 225 70 C263 104 274 158 255 209 C214 226 123 229 76 207 Z"
                  />
                  <path
                    className="helmet-line helmet-ear-left helmet-white"
                    d="M69 139 C48 142 38 165 47 190 C52 204 61 211 74 212"
                  />
                  <path
                    className="helmet-line helmet-ear-right helmet-white"
                    d="M266 139 C286 142 298 164 289 190 C284 204 275 211 262 212"
                  />
                  <path
                    className="helmet-line helmet-visor helmet-blue"
                    d="M98 162 C101 115 131 84 169 83 C212 82 243 112 249 160 C225 178 128 180 98 162 Z"
                  />
                  <path
                    className="helmet-line helmet-visor-wobble helmet-blue"
                    d="M107 154 C124 139 219 138 239 154"
                  />
                  <path
                    className="helmet-line helmet-neck helmet-white"
                    d="M89 214 C112 245 221 247 247 215"
                  />
                  <path
                    className="helmet-line helmet-glint helmet-white"
                    d="M131 103 C148 92 178 88 202 94"
                  />
                  <path
                    className="helmet-line helmet-badge helmet-yellow"
                    d="M156 60 C164 53 176 54 183 62 C179 72 164 74 156 60 Z"
                  />
                  <path
                    className="helmet-line helmet-star helmet-yellow"
                    d="M74 92 L80 104 L91 108 L81 113 L76 124 L70 113 L58 109 L69 103 Z"
                  />
                  <path
                    className="helmet-line helmet-star helmet-yellow"
                    d="M247 83 L253 94 L263 98 L254 103 L250 113 L244 103 L233 99 L243 94 Z"
                  />
                  <path
                    className="helmet-line helmet-crayon-dust helmet-white"
                    d="M86 184 C80 160 83 126 101 95"
                  />
                  <path
                    className="helmet-line helmet-crayon-dust helmet-white"
                    d="M226 82 C250 112 260 158 247 194"
                  />
                  <path
                    className="helmet-line helmet-crayon-dust helmet-blue"
                    d="M123 171 C151 182 205 181 235 168"
                  />
                </g>
              </svg>
            </button>
            <span
              className="profile-secret-card"
              aria-hidden={!profileSecretActive}
            >
              <span className="profile-secret-kicker">Operator Mode</span>
              <strong>Code brain, controls hands.</strong>
              <span className="profile-secret-grid">
                <button
                  className="profile-secret-action"
                  onClick={navigateToResume}
                  tabIndex={profileSecretActive ? 0 : -1}
                  type="button"
                >
                  Software
                </button>
                <button
                  className="profile-secret-action"
                  onClick={navigateToRoboticsResume}
                  tabIndex={profileSecretActive ? 0 : -1}
                  type="button"
                >
                  Robotics
                </button>
              </span>
            </span>
          </div>
          <div className="button-container home-btn-background mx-3">
            <div className="portfolio-action-row">
              <button
                className="btn btn-primary btn-animations-plus portfolio-btn btn-lg mb-3"
                onClick={navigateToPortfolio}
              >
                View My Portfolio
              </button>
              <button
                aria-label="Launch rocket"
                className={`rocket-easter-button${
                  rocketLaunching ? " launching" : ""
                }`}
                onClick={launchRocket}
                onDoubleClick={openTerminal}
                title="Launch rocket"
                type="button"
              >
                <img src={Rocket} alt="" className="rocket-icon" />
              </button>
            </div>
            <button
              className="btn btn-primary btn-animations-plus software-btn btn-lg mb-3"
              onClick={navigateToResume}
            >
              Software Engineering Resume
            </button>
            <button
              className="btn btn-primary btn-animations-plus robotics-btn btn-lg mb-3"
              onClick={navigateToRoboticsResume}
            >
              Robotics & Controls Resume
            </button>
            <button
              className="btn btn-primary btn-animations-plus contact-btn btn-lg"
              onClick={navigateToContactMe}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
