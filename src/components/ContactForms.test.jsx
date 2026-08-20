import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import emailjs from "emailjs-com";
import ContactInfoRequestForm from "./ContactInfoRequestForm";
import UserContactPatrickForm from "./UserContactPatrickForm";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  PORTFOLIO_URL,
} from "../constants/contact";

vi.mock("emailjs-com", () => ({
  default: {
    send: vi.fn(),
  },
}));

function deferredPromise() {
  let resolve;
  const promise = new Promise((promiseResolve) => {
    resolve = promiseResolve;
  });

  return { promise, resolve };
}

beforeEach(() => {
  emailjs.send.mockReset();
});

test("sends a visitor message and exposes an accessible submitting state", async () => {
  const request = deferredPromise();
  emailjs.send.mockReturnValue(request.promise);

  render(
    <MemoryRouter>
      <UserContactPatrickForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
    target: { value: "Recruiter" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
    target: { value: "recruiter@example.com" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
    target: { value: "I would like to discuss a role." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

  expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
  expect(emailjs.send).toHaveBeenCalledWith(
    "service_91op5rj",
    "template_dvu5d2q",
    {
      name: "Recruiter",
      email: "recruiter@example.com",
      message: "I would like to discuss a role.",
    },
    "kCF5yg38mVA4ty81a"
  );

  request.resolve({ status: 200 });

  expect(
    await screen.findByRole("status", { name: "" })
  ).toHaveTextContent("Your message has been sent to Patrick.");
  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Send Message" })).toBeEnabled();
  });
});

test("requests contact information using the centralized real contact details", async () => {
  emailjs.send.mockResolvedValue({ status: 200 });

  render(
    <MemoryRouter>
      <ContactInfoRequestForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
    target: { value: "Hiring Manager" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
    target: { value: "hiring@example.com" },
  });
  fireEvent.click(
    screen.getByRole("button", { name: "Request Contact Info" })
  );

  await waitFor(() => expect(emailjs.send).toHaveBeenCalledOnce());
  const templateParams = emailjs.send.mock.calls[0][2];

  expect(templateParams).toMatchObject({
    name: "Hiring Manager",
    email: "hiring@example.com",
  });
  expect(templateParams.message).toContain(CONTACT_EMAIL);
  expect(templateParams.message).toContain(CONTACT_PHONE);
  expect(templateParams.message).toContain(PORTFOLIO_URL);
  expect(templateParams.message).toContain(LINKEDIN_URL);
  expect(templateParams.message).toContain(GITHUB_URL);
  expect(await screen.findByRole("status", { name: "" })).toHaveTextContent(
    "An email has been sent with my current contact information."
  );
});
