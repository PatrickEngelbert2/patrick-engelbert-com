import React from "react";
import { useHistory } from "react-router-dom";
import "./ContactMe.css";

function ContactMe() {
  const history = useHistory();

  const navigateToMessage = () => {
    history.push("/contact/message");
  };

  const navigateToRequestContactInfo = () => {
    history.push("/contact/request-contact-info");
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <div className="contact-options">
        <div className="contact-option">
          <h3>Send a Message</h3>
          <p>
            Reach out to me with job opportunities or any other inquiries by sending a message.
          </p>
          <button className="btn btn-primary" onClick={navigateToMessage}>
            Send a Message
          </button>
        </div>
        <div className="contact-option">
          <h3>Request Contact Info</h3>
          <p>
            Request an automated email containing my email address and phone number.
          </p>
          <button className="btn btn-secondary" onClick={navigateToRequestContactInfo}>
            Request Contact Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
