import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import "./ContactInfoRequestForm.css";
import clipboardQuestion from "../images/clipboard-question.svg";

function ContactInfoRequestForm() {
  const history = useHistory();
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

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: `Hello ${formData.name},\n\nThank you so much for your interest and attention!\n\nBest wishes,\nPatrick Engelbert\n\nEmail: patrick.engelbert@example.com\nPhone: (123) 456-7890`,
    };

    emailjs
      .send(
        "service_91op5rj",
        "template_8zjw9r9",
        templateParams,
        "kCF5yg38mVA4ty81a"
      )
      .then((response) => {
        alert(
          "Success! An email has been sent to you with my contact info. Feel free to reach out with any job opportunities or just to chat. Thank you for your time and attention."
        );
        setFormData({ name: "", email: "" });
      })
      .catch((error) => {
        alert("Failed to send message. Please try again.");
      });
  };

  const handleGoBack = () => {
    //send user back to the previous page
    history.goBack();
  };

  return (
    <form className="simple-contact-form" onSubmit={handleSubmit}>
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
              Enter the email address that you wish to recieve my contact info.
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
      <div className="button-container">
        <button type="submit" className="btn btn-primary">
          Request Contact Info
        </button>
        <button type="button" className="btn btn-cancel" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </form>
  );
}

export default ContactInfoRequestForm;
