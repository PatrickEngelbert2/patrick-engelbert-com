import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactInfoRequestForm.css";

function ContactInfoRequestForm() {
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

    emailjs.send(
      "service_91op5rj",
      "template_8zjw9r9",
      templateParams,
      "kCF5yg38mVA4ty81a"
    )
    .then((response) => {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "" });
    })
    .catch((error) => {
      alert("Failed to send message. Please try again.");
    });
  };

  return (
    <form className="simple-contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
}

export default ContactInfoRequestForm;
