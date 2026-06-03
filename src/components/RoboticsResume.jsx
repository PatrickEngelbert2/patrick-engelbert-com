import React, { useEffect, useState } from "react";
import "./Resume.css";
import { Link } from "react-router-dom";
import LinkedIn from "../images/linkedin.svg?react";
import GitHub from "../images/github.svg?react";
import { useEasterEggs } from "../easterEggs/EasterEggContext";

const commissioningSteps = [
  { id: "power", label: "Power", status: "PWR" },
  { id: "plc", label: "PLC", status: "PLC" },
  { id: "robot", label: "Robot", status: "ROBOT" },
  { id: "cycle", label: "Cycle Start", status: "RUN" },
];

function RoboticsResume() {
  const roboticsResumePdf = "/Patrick_Engelbert_Robotics_Controls_Resume.pdf";
  const { isUnlocked, markResumeVisited, unlockEgg } = useEasterEggs();
  const commissioned = isUnlocked("commissioned");
  const [panelOpen, setPanelOpen] = useState(false);
  const [commissioningStep, setCommissioningStep] = useState(0);
  const [panelStatus, setPanelStatus] = useState(commissioned ? "RUN" : "IDLE");

  useEffect(() => {
    markResumeVisited("robotics");
  }, [markResumeVisited]);

  useEffect(() => {
    if (commissioned) {
      setPanelStatus("RUN");
      setCommissioningStep(commissioningSteps.length);
      return;
    }

    setPanelStatus("IDLE");
    setCommissioningStep(0);
  }, [commissioned]);

  const handleCommissioningStep = (stepId, stepIndex) => {
    if (commissioned) {
      setPanelStatus("RUN");
      return;
    }

    const expectedStep = commissioningSteps[commissioningStep];
    if (!expectedStep || expectedStep.id !== stepId || stepIndex !== commissioningStep) {
      setCommissioningStep(0);
      setPanelStatus("FAULT");
      return;
    }

    const nextStep = commissioningStep + 1;
    setCommissioningStep(nextStep);

    if (nextStep === commissioningSteps.length) {
      setPanelStatus("RUN");
      unlockEgg("commissioned");
      return;
    }

    setPanelStatus(commissioningSteps[nextStep - 1].status);
  };

  return (
    <div className="resume-container">
      <div className="resume-button">
        <a href={roboticsResumePdf} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-secondary">
            View Robotics & Controls PDF
          </button>
        </a>
      </div>
      <div className="resume-title-control">
        <h1 className="resume-title">Robotics & Industrial Controls Resume</h1>
        <div className={`commissioning-console${commissioned ? " run" : ""}`}>
          <button
            aria-expanded={panelOpen}
            className="commissioning-trigger"
            onClick={() => setPanelOpen((current) => !current)}
            type="button"
          >
            <span className="commissioning-light" />
            <span>{panelStatus}</span>
          </button>
          {panelOpen && (
            <div className="commissioning-panel" aria-label="Commissioning panel">
              <div className="commissioning-steps">
                {commissioningSteps.map((step, index) => {
                  const complete = commissioned || index < commissioningStep;
                  const armed = !commissioned && index === commissioningStep;
                  return (
                    <button
                      className={`commissioning-step${
                        complete ? " complete" : ""
                      }${armed ? " armed" : ""}`}
                      key={step.id}
                      onClick={() => handleCommissioningStep(step.id, index)}
                      type="button"
                    >
                      {step.label}
                    </button>
                  );
                })}
              </div>
              <div className="commissioning-readout">
                {commissioned ? "COMMISSIONED" : panelStatus}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="resume-switcher">
        <Link className="resume-switcher-link" to="/resume/software-engineering">
          Software Engineering
        </Link>
        <Link className="resume-switcher-link active" to="/resume/robotics-controls">
          Robotics & Industrial Controls
        </Link>
      </div>

      <div className="resume-section">
        <h2>Contact Information</h2>
        <p>
          Waco, TX | patrickengelbert2@gmail.com | (785) 418-1614 |
          <a
            href="https://www.linkedin.com/in/patrick-engelbert/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn{" "}
            <LinkedIn className="social-icon social-icon-resume linkedin subtle-shadow" />
          </a>{" "}
          |
          <a
            href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            GitHub{" "}
            <GitHub className="social-icon social-icon-resume github subtle-shadow" />
          </a>
        </p>
      </div>

      <div className="resume-section">
        <h2>Profile</h2>
        <p>
          Robotics & Industrial Controls student at Texas State Technical
          College focused on PLC programming, robot programming, and industrial
          automation integration. Hands-on training includes Studio 5000 ladder
          logic, FANUC and Universal Robots, robot-to-PLC interfacing, VFDs,
          computer vision, sensors, motor controls, AC/DC circuits, and
          maintenance-ready documentation. Prior production software engineering
          experience adds disciplined troubleshooting, structured logic,
          documentation, and careful execution in systems where reliability
          matters.
        </p>
      </div>

      <div className="resume-section">
        <h2>Core Capabilities</h2>
        <ul>
          <li>
            <strong>PLC Programming & Troubleshooting:</strong> Build,
            document, and troubleshoot ladder logic using timers, latching,
            sequencing, interlocks, industrial I/O, and sensor-driven behavior.
          </li>
          <li>
            <strong>Robot Programming & Integration:</strong> Program robot
            motion, validate repeatability, work with teach pendants and
            position data, and connect robot behavior with PLCs and external
            controls.
          </li>
          <li>
            <strong>Maintenance & Electrical Readiness:</strong> Read
            schematics, reason through AC/DC circuits, sensors, motor controls,
            VFDs, relays, and electro-mechanical devices, and create clear
            documentation for upkeep and troubleshooting.
          </li>
          <li>
            <strong>Software-Backed Automation Thinking:</strong> Apply
            production software habits such as Git-based change tracking,
            structured debugging, secure data handling, testing discipline, and
            clear technical communication.
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Technical Skills</h2>
        <ul>
          <li>
            <strong>PLC & Controls:</strong> Rockwell Studio 5000, ladder
            logic, relays, start/stop latching, timers, sequencing, interlocks,
            troubleshooting, industrial I/O, PLC-to-device interfacing.
          </li>
          <li>
            <strong>Robotics & Integration:</strong> FANUC 200i, Universal
            Robots, teach pendant operation, position registers, offset-based
            motion, pick-and-place sequencing, auto-mode validation,
            robot-to-PLC integration concepts.
          </li>
          <li>
            <strong>Maintenance & Electrical:</strong> AC/DC circuits, VFDs,
            sensors, motor controls, relays, electro-mechanical devices,
            schematic reading, fault isolation, parts lists, sequence of
            operation.
          </li>
          <li>
            <strong>Vision & Interfacing:</strong> Computer vision concepts,
            robot-to-PLC communication, sensors, electromechanical controls,
            and integration with industrial devices.
          </li>
          <li>
            <strong>Documentation & Tools:</strong> AutoCAD, technical
            documentation, JavaScript, TypeScript, Python, Git/GitHub.
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Selected Automation Projects</h2>
        <ul>
          <li>
            <strong>Conveyor Control Circuit</strong> - Start/stop latch,
            inductive sensor, documentation.
            <ul>
              <li>
                Designed a conveyor control circuit with start/stop latch logic
                and an inductive-sensor interlock that pauses movement when a
                target is detected and resumes when clear.
              </li>
              <li>
                Created maintenance-ready documentation including project
                purpose, circuit diagram, parts list, sequence of operation,
                and troubleshooting context.
              </li>
            </ul>
          </li>
          <li>
            <strong>PLC Arcade Machine</strong> - Rockwell Studio 5000.
            <ul>
              <li>
                Programmed an 8-light reflex game with operator pushbutton
                input, timer-based sequencing, and six selectable difficulty
                modes.
              </li>
              <li>
                Added randomized turbo-speed logic to demonstrate timing
                variation, state control, fault-aware sequencing, and
                responsive operator interaction.
              </li>
            </ul>
          </li>
          <li>
            <strong>FANUC 200i Pick-and-Place Program</strong> - Offset-based
            robot programming.
            <ul>
              <li>
                Reduced teach time by manually teaching one reference point and
                calculating the remaining eight slot positions in-program using
                offsets and position registers.
              </li>
              <li>
                Validated repeatability by running the 9-slot pick-and-place
                sequence overnight in auto mode with no crashes or faults.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <ul>
          <li>
            <strong>Robotics & Industrial Controls</strong>, Texas State
            Technical College. Expected Dec 2026.
            <ul>
              <li>
                Coursework: Robotics, DC Circuits, AutoCAD, AC Circuits, Motor
                Controls, Electro-Mechanical Devices, Robot Programming,
                Sensors, PLC Programming, VFDs, Computer Vision, and Robot
                Interfacing.
              </li>
            </ul>
          </li>
          <li>
            <strong>Software Engineering Program</strong>, Thinkful. 2021-2022.
          </li>
          <li>
            <strong>Associate of Science; Associate of Arts</strong>, Neosho
            County Community College. 2020.
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Professional Experience</h2>
        <ul>
          <li>
            <strong>Full-Stack Software Engineer</strong>, Citizens Bank.
            Johnston, RI (Mar 2022 - Nov 2024)
            <ul>
              <li>
                Built and supported customer-facing web components using
                Angular, TypeScript, and Node.js within an Agile development
                team.
              </li>
              <li>
                Worked in production environments requiring careful testing,
                secure data handling, change discipline, and collaboration
                across teams.
              </li>
              <li>
                Developed habits directly relevant to controls work: traceable
                changes, clear documentation, state-based reasoning, and careful
                troubleshooting under real delivery constraints.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Additional Experience</h2>
        <p>
          Pharmacy Technician, Cosentino's Price Chopper (2021); After School
          Teacher, RFTS (2019-2020); Sales Associate, Walmart SuperCenter
          (2015-2019); Bank Teller, Kansas State Bank (2014-2015).
        </p>
        <p>
          Earlier roles strengthened accuracy, customer interaction,
          organization, communication, and dependable execution in fast-paced
          environments.
        </p>
      </div>
    </div>
  );
}

export default RoboticsResume;
