import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import "./ContactInfoRequestForm.css";
import clipboardQuestion from "../images/clipboard-question.svg";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  PORTFOLIO_URL,
} from "../constants/contact";

function ContactInfoRequestForm() {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: `Hello ${formData.name},\n\nThank you for your interest. Here is my current contact information:\n\nEmail: ${CONTACT_EMAIL}\nPhone: ${CONTACT_PHONE}\nWebsite: ${PORTFOLIO_URL}\nLinkedIn: ${LINKEDIN_URL}\nGitHub: ${GITHUB_URL}\n\nBest,\nPatrick Engelbert`,
    };

    emailjs
      .send(
        "service_91op5rj",
        "template_8zjw9r9",
        templateParams,
        "kCF5yg38mVA4ty81a"
      )
      .then(() => {
        setSubmissionStatus({
          type: "success",
          message:
            "An email has been sent with my current contact information. Thank you for reaching out.",
        });
        setFormData({ name: "", email: "" });
      })
      .catch(() => {
        setSubmissionStatus({
          type: "error",
          message:
            "The contact information email could not be sent. Please try again.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleGoBack = () => {
    //send user back to the previous page
    history.goBack();
  };

  return (
    <form
      aria-busy={isSubmitting}
      className="simple-contact-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="name" title="Enter your full name">
          <div className="my-tooltip">
            <img src={clipboardQuestion} alt="Question mark inside clipboard" />
            <span className="tooltiptext">
              Enter your full name so that I know who to address when
              responding.
            </span>
          </div>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" title="Enter your email address">
          <div className="my-tooltip">
            <img src={clipboardQuestion} alt="Question mark inside clipboard" />
            <span className="tooltiptext">
              Enter the email address where you want to receive my contact info.
            </span>
          </div>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {submissionStatus && (
        <p
          className={`form-status form-status--${submissionStatus.type}`}
          role={submissionStatus.type === "error" ? "alert" : "status"}
        >
          {submissionStatus.message}
        </p>
      )}
      <div className="button-container">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request Contact Info"}
        </button>
        <button type="button" className="btn btn-cancel" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </form>
  );
}

export default ContactInfoRequestForm;
