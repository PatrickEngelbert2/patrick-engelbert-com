import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { EasterEggProvider, useEasterEggs } from "../easterEggs/EasterEggContext";
import Resume from "./Resume";
import RoboticsResume from "./RoboticsResume";

function EggStatus() {
  const { unlockedEggs, resetEggs } = useEasterEggs();
  return (
    <>
      <output aria-label="Discovered secrets">{unlockedEggs.join(", ")}</output>
      <button type="button" onClick={resetEggs}>Reset secrets</button>
    </>
  );
}

function renderResume() {
  render(
    <MemoryRouter initialEntries={["/resume/robotics-controls"]}>
      <EasterEggProvider>
        <Route path="/resume/robotics-controls" component={RoboticsResume} />
        <Route path="/resume/software-engineering" component={Resume} />
        <EggStatus />
      </EasterEggProvider>
    </MemoryRouter>
  );
}

beforeEach(() => window.localStorage.clear());

test("presents October 2026 experience, education, projects, and the updated PDF", () => {
  renderResume();
  const experience = screen.getByRole("heading", { name: "Professional Experience" }).parentElement;
  expect(within(experience).getByText("Facilities & Maintenance Intern (Engineering Projects)"))
    .toBeInTheDocument();
  expect(experience).toHaveTextContent("MP Materials - Fort Worth, TX");
  expect(experience).toHaveTextContent("August 2026 - Present");
  expect(experience).toHaveTextContent("Citizens Bank - Johnston, RI");
  expect(experience).toHaveTextContent("March 2022 - November 2024");
  expect(experience).toHaveTextContent("citizensbank.com");
  const education = screen.getByRole("heading", { name: "Education & Current Capstone" }).parentElement;
  expect(education).toHaveTextContent("In progress - Expected December 2026");
  expect(education).toHaveTextContent("capstone (in progress)");
  expect(education).toHaveTextContent("PLC, HMI, VFD, sensors, and industrial robot");
  [
    "FANUC 200i - Nine-Position Pick-and-Place",
    "Studio 5000 PLC Arcade",
    "Sensor-Controlled Conveyor",
    "Universal Robots - Automated Workpiece Handling",
    "Pharmacy Technician",
    "After-School Teacher",
    "Sales Associate",
    "Bank Teller",
    "Software Engineering Certificates",
    "Associate of Science & Associate of Arts, Philosophy",
    "Undergraduate Studies, Philosophy / Theological Studies",
  ].forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
  const view = screen.getByRole("link", { name: "View PDF" });
  const download = screen.getByRole("link", { name: "Download PDF" });
  expect(view).toHaveAttribute("href", "/resumes/Patrick_Engelbert_Automation_Controls_Resume_2026-10_b84c91dbf624.pdf");
  expect(view).toHaveAttribute("target", "_blank");
  expect(view).toHaveAttribute("rel", "noopener noreferrer");
  expect(download).toHaveAttribute("href", view.getAttribute("href"));
  expect(download).toHaveAttribute("download", "Patrick_Engelbert_Automation_Controls_Resume_October_2026.pdf");
});

test("commissioning handles faults, unlocks RUN, and resets its buttons", () => {
  renderResume();
  fireEvent.click(screen.getByRole("button", { name: "IDLE" }));
  fireEvent.click(screen.getByRole("button", { name: "Robot", exact: true }));
  expect(screen.getByRole("button", { name: "FAULT" })).toBeInTheDocument();
  ["Power", "PLC", "Robot", "Cycle Start"].forEach((name) => {
    fireEvent.click(screen.getByRole("button", { name, exact: true }));
  });
  expect(screen.getByRole("button", { name: "RUN" })).toBeInTheDocument();
  expect(screen.getByLabelText("Discovered secrets")).toHaveTextContent("commissioned");
  expect(screen.getByText("COMMISSIONED")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset secrets" }));
  expect(screen.getByRole("button", { name: "IDLE" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Power", exact: true })).toHaveClass("armed");
  expect(document.querySelectorAll(".commissioning-step.complete")).toHaveLength(0);
});

test("resume navigation still unlocks Dual Stack and preserves the software PDF", () => {
  renderResume();
  fireEvent.click(screen.getByRole("link", { name: "Software Engineering", exact: true }));
  expect(screen.getByRole("heading", { level: 1, name: "Software Engineering Resume" })).toBeInTheDocument();
  expect(screen.getByLabelText("Discovered secrets")).toHaveTextContent("dual-stack");
  expect(screen.getByRole("link", { name: "View as Downloadable PDF" })).toHaveAttribute(
    "href", "https://images-patrickengelbert.s3.us-east-2.amazonaws.com/Patrick+Engelbert+Resume.pdf"
  );
  fireEvent.click(screen.getByRole("link", { name: "Robotics & Industrial Controls", exact: true }));
  expect(screen.getByRole("link", { name: "Download PDF" })).toBeInTheDocument();
});
