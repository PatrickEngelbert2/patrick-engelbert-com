import React, { useEffect, useState } from "react";
import "./Resume.css";
import { Link } from "react-router-dom";
import LinkedIn from "../images/linkedin.svg?react";
import GitHub from "../images/github.svg?react";
import { useEasterEggs } from "../easterEggs/EasterEggContext";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../constants/contact";

const commissioningSteps = [
  { id: "power", label: "Power", status: "PWR" },
  { id: "plc", label: "PLC", status: "PLC" },
  { id: "robot", label: "Robot", status: "ROBOT" },
  { id: "cycle", label: "Cycle Start", status: "RUN" },
];

function RoboticsResume() {
  const roboticsResumePdf =
    "/resumes/Patrick_Engelbert_Automation_Controls_Resume_2026-10_b84c91dbf624.pdf";
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
      <div className="resume-button resume-pdf-actions">
        <a
          className="btn btn-secondary"
          href={roboticsResumePdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </a>
        <a
          className="btn btn-secondary"
          href={roboticsResumePdf}
          download="Patrick_Engelbert_Automation_Controls_Resume_October_2026.pdf"
        >
          Download PDF
        </a>
      </div>
      <div className="resume-title-control">
        <h1 className="resume-title">Robotics, Automation & Industrial Controls Resume</h1>
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
        <Link
          aria-current="page"
          className="resume-switcher-link active"
          to="/resume/robotics-controls"
        >
          Robotics & Industrial Controls
        </Link>
      </div>

      <div className="resume-section">
        <h2>Contact Information</h2>
        <p>
          {CONTACT_LOCATION} | {CONTACT_EMAIL} | {CONTACT_PHONE} |
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn{" "}
            <LinkedIn
              aria-hidden="true"
              focusable="false"
              className="social-icon social-icon-resume linkedin subtle-shadow"
            />
          </a>{" "}
          |
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            GitHub{" "}
            <GitHub
              aria-hidden="true"
              focusable="false"
              className="social-icon social-icon-resume github subtle-shadow"
            />
          </a>
        </p>
      </div>

      <div className="resume-section">
        <h2>Professional Profile</h2>
        <p>
          Automation and industrial controls professional working directly with
          engineering teams at MP Materials on programming, design, maintenance,
          and troubleshooting. Former full-stack software engineer with production
          development experience at Citizens Bank. Completing an Associate of
          Applied Science in Robotics & Industrial Controls Technology at Texas
          State Technical College, with graduation expected December 2026.
        </p>
      </div>

      <div className="resume-section">
        <h2>Technical Strengths</h2>
        <ul>
          <li>
            <strong>PLC Programming & Industrial Controls:</strong> Rockwell
            Studio 5000, ladder logic, relay circuits, industrial I/O, timers,
            interlocks, sequencing, and troubleshooting.
          </li>
          <li>
            <strong>Robotics & Integration:</strong> FANUC 200i, Universal Robots /
            PolyScope, teach pendants, position registers, motion offsets,
            robotic pick-and-place, and sensors.
          </li>
          <li>
            <strong>Electrical Systems & Devices:</strong> AC/DC circuits,
            motor controls, VFDs, sensors, and electromechanical devices.
          </li>
          <li>
            <strong>Design & Automation Integration:</strong> HMIs, schematic
            reading, AutoCAD, system integration, and maintenance-oriented
            technical documentation.
          </li>
          <li>
            <strong>Software Development & Collaboration:</strong> Python,
            JavaScript, TypeScript, Angular, React, Node.js, SQL, Git, Agile
            development, technical documentation, and cross-functional collaboration.
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Professional Experience</h2>
        <ul>
          <li>
            <strong>Facilities & Maintenance Intern (Engineering Projects)</strong>
            {" "}| MP Materials - Fort Worth, TX
            <span className="resume-entry-dates">August 2026 - Present</span>
            <ul>
              <li>
                Work directly with engineering teams daily, contributing to
                equipment design, automation programming, system implementation,
                and maintenance activities.
              </li>
              <li>
                Program and test industrial robotic systems, developing logic for
                sensing, positioning, automated handling, and repeatable motion sequences.
              </li>
              <li>
                Participate in engineering planning and design meetings;
                contribute ideas on system architecture, equipment functionality,
                and practical implementation.
              </li>
              <li>
                Support troubleshooting and maintenance of manufacturing equipment
                and automation systems through hands-on diagnostics and problem solving.
              </li>
            </ul>
          </li>
          <li>
            <strong>Full-Stack Software Engineer</strong> | Citizens Bank - Johnston, RI
            <span className="resume-entry-dates">March 2022 - November 2024</span>
            <ul>
              <li>
                Developed and maintained production web applications and
                customer-facing components using Angular, TypeScript, and Node.js.
              </li>
              <li>
                Built proprietary functionality for secure collection of customer
                data and contributed core components to citizensbank.com.
              </li>
              <li>
                Collaborated on an Agile engineering team to design, review, test,
                document, and deliver software under production requirements.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Education & Current Capstone</h2>
        <ul>
          <li>
            <strong>Associate of Applied Science - Robotics & Industrial Controls Technology</strong>
            {" "}| Texas State Technical College - Waco, TX
            <span className="resume-entry-dates">In progress - Expected December 2026</span>
            <ul>
              <li>
                Final-semester integrated automation capstone (in progress):
                combining a PLC, HMI, VFD, sensors, and industrial robot into one
                coordinated control system.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Selected Automation Projects</h2>
        <ul>
          <li>
            <strong>FANUC 200i - Nine-Position Pick-and-Place</strong> | Robotics / TSTC
            <ul>
              <li>
                Programmed one reference position and computed the remaining eight
                positions with offsets and position registers, reducing manual teaching.
              </li>
              <li>
                Verified repeatability by running the full nine-position sequence
                overnight in automatic mode without faults or collisions.
              </li>
            </ul>
          </li>
          <li>
            <strong>Studio 5000 PLC Arcade</strong> | Rockwell / Ladder Logic
            <ul>
              <li>
                Programmed an eight-light reflex game with operator pushbuttons,
                timer-driven sequencing, and six selectable difficulty
                modes.
              </li>
              <li>
                Implemented randomized timing in turbo modes to demonstrate state
                management, dynamic sequencing, and reliable I/O logic.
              </li>
            </ul>
          </li>
          <li>
            <strong>Sensor-Controlled Conveyor</strong> | Industrial Circuits / Documentation
            <ul>
              <li>
                Designed a start/stop latch and inductive-sensor interlock to pause
                conveyor motion on detection and resume automatically when clear.
              </li>
              <li>
                Prepared circuit schematics, parts list, system purpose, and
                sequence-of-operation documentation for maintenance and troubleshooting.
              </li>
            </ul>
          </li>
          <li>
            <strong>Universal Robots - Automated Workpiece Handling</strong> | Industrial Robotics
            <ul>
              <li>
                Programmed robotic motion and feedback-driven handling sequences
                using tool I/O, position sensing, and vacuum pickup verification.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Additional Work Experience</h2>
        <ul>
          <li>
            <strong>Pharmacy Technician</strong> | Cosentino's Price Chopper - Ottawa, KS
            <span className="resume-entry-dates">June - September 2021</span>
            <ul>
              <li>
                Coordinated with pharmacy personnel to dispense medications
                accurately while safeguarding sensitive customer information.
              </li>
            </ul>
          </li>
          <li>
            <strong>After-School Teacher</strong> | RFTS / USD 290 - Ottawa, KS
            <span className="resume-entry-dates">August 2019 - April 2020</span>
            <ul>
              <li>
                Planned and delivered instruction; collaborated with colleagues
                on lessons, projects, and clear learning objectives.
              </li>
            </ul>
          </li>
          <li>
            <strong>Sales Associate</strong> | Walmart Supercenter - Ottawa / Salina, KS
            <span className="resume-entry-dates">April 2015 - June 2019</span>
            <ul>
              <li>
                Maintained nearly four years of retail employment, supporting
                customer needs, product operations, inventory, and team coordination.
              </li>
            </ul>
          </li>
          <li>
            <strong>Bank Teller</strong> | Kansas State Bank - Ottawa, KS
            <span className="resume-entry-dates">April 2014 - March 2015</span>
            <ul>
              <li>
                Handled financial transactions accurately and built dependable
                relationships with individual and business customers.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Additional Education & Credentials</h2>
        <ul>
          <li>
            <strong>Software Engineering Program</strong> | Thinkful | 2021-2022
          </li>
          <li>
            <strong>Software Engineering Certificates</strong> | Three completed certificates
          </li>
          <li>
            <strong>Associate of Science & Associate of Arts, Philosophy</strong>
            {" "}| Neosho County Community College | 2020
          </li>
          <li>
            <strong>Undergraduate Studies, Philosophy / Theological Studies</strong>
            {" "}| Newman University | 2020-2021
          </li>
        </ul>
      </div>

    </div>
  );
}

export default RoboticsResume;
