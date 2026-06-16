import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import "./UserContactPatrickForm.css";
import clipboardQuestion from "../images/clipboard-question.svg";

function UserContactPatrickForm() {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoBack = () => {
    //send user back to the previous page
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_91op5rj",
        "template_dvu5d2q",
        formData,
        "kCF5yg38mVA4ty81a"
      )
      .then((response) => {
        alert(
          "Success. Your message has been sent to Patrick. Thank you for reaching out."
        );
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        alert("Sorry, your message could not be sent. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
              Enter your email address so that I can respond to you directly.
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
      <div className="form-group">
        <label htmlFor="message" title="Enter your message">
          <div className="my-tooltip">
            <img src={clipboardQuestion} alt="Question mark inside clipboard" />
            <span className="tooltiptext">
              Enter your message. This can be details about job opportunities, a
              request to chat, a recommendation, or anything else you'd like to
              say to me. &#128522;
            </span>
          </div>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="button-container">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
        <div className="button-container"></div>
        <button type="button" className="btn btn-cancel" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </form>
  );
}

export default UserContactPatrickForm;
