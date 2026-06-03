import React from "react";
import { Link } from "react-router-dom";
import Rocket from "../images/rocket.svg";
import "./SpaceXTarget.css";

function SpaceXTarget() {
  return (
    <div className="spacex-brief">
      <section className="spacex-hero">
        <div className="spacex-hero-copy">
          <span className="spacex-kicker">Hidden mission brief</span>
          <h1>SpaceX Mission Brief</h1>
          <p>
            Patrick Engelbert: software engineer, robotics student, and
            controls-minded builder targeting automation work where code meets
            machines.
          </p>
          <div className="spacex-actions">
            <Link className="spacex-action primary" to="/resume/robotics-controls">
              Controls Resume
            </Link>
            <Link className="spacex-action" to="/resume/software-engineering">
              Software Resume
            </Link>
            <Link className="spacex-action" to="/contact">
              Contact
            </Link>
          </div>
        </div>
        <div className="spacex-vehicle" aria-hidden="true">
          <img src={Rocket} alt="" />
          <span className="spacex-orbit orbit-one" />
          <span className="spacex-orbit orbit-two" />
        </div>
      </section>

      <section className="spacex-band">
        <div className="spacex-band-copy">
          <span className="spacex-kicker">Target fit</span>
          <h2>Factory software, controls logic, and robotics integration</h2>
          <p>
            The strongest overlap is manufacturing automation: PLC programming,
            robot programming, industrial troubleshooting, documentation, and
            production software thinking applied to physical systems.
          </p>
        </div>
        <div className="spacex-systems-grid">
          <article>
            <span>01</span>
            <h3>Controls</h3>
            <p>PLC logic, VFDs, motor controls, I/O, and electromechanical systems.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Robotics</h3>
            <p>Robot programming, interfaces, workcells, frames, tooling, and recovery logic.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Software</h3>
            <p>React, JavaScript, testing habits, debugging, APIs, and user-centered tooling.</p>
          </article>
        </div>
      </section>

      <section className="spacex-checklist">
        <h2>What I would want SpaceX to notice</h2>
        <ul>
          <li>Comfort learning hard systems quickly and connecting separate domains.</li>
          <li>Hands-on controls training backed by production software experience.</li>
          <li>Bias toward clear documentation, reliable troubleshooting, and maintainable work.</li>
          <li>Interest in roles around automation, robotics, PLCs, integration, and test systems.</li>
        </ul>
      </section>
    </div>
  );
}

export default SpaceXTarget;
