import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("renders accessible semantic homepage text and preserves the headline secret", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Patrick Engelbert",
  });
  expect(heading).toHaveTextContent(/^Patrick Engelbert$/);
  expect(
    screen.getByText("Software Engineer | Robotics & Industrial Automation")
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "I build software and automation systems where code meets real-world machines."
    )
  ).toBeInTheDocument();

  const decorativeLayers = document.querySelectorAll(".recoil-text__visual");
  expect(decorativeLayers.length).toBeGreaterThan(0);
  decorativeLayers.forEach((layer) => {
    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer).toHaveTextContent("");
  });

  fireEvent.click(heading);
  fireEvent.click(heading);
  fireEvent.click(heading);
  expect(await screen.findByText("Headline Tamer")).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /software engineering resume/i })
  ).toBeInTheDocument();
});

test("renders accessible semantic portfolio introduction text", () => {
  render(
    <MemoryRouter initialEntries={["/portfolio"]}>
      <App />
    </MemoryRouter>
  );

  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Portfolio:",
  });
  expect(heading).toHaveTextContent(/^Portfolio:$/);
  expect(screen.getByText("Creations worth sharing")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Check out some of the apps and websites I've built over the years!"
    )
  ).toBeInTheDocument();

  document.querySelectorAll(".recoil-text__visual").forEach((layer) => {
    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer).toHaveTextContent("");
  });
});
