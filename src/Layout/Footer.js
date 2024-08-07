import React from "react";
import { ReactComponent as LinkedIn } from "../images/linkedin.svg";
import { ReactComponent as GitHub } from "../images/github.svg";
import { Link } from "react-router-dom";
// import FooterLinks from "../components/FooterLinks";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container pb-1">
        {/* social media */}
        <section className="mb-2">
          <a
            href="https://www.linkedin.com/in/patrick-engelbert/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className="social-icon social-icon-large social-icon-margin linkedin subtle-shadow" />
          </a>
          <a
            href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub className="social-icon social-icon-large github subtle-shadow" />
          </a>
        </section>

        {/* Additional Info */}
        <section className="footer-links">
          <p>
            Have a job oportunity, or just want to chat? Contact me via email,
            <a
              href="https://www.linkedin.com/in/patrick-engelbert/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              LinkedIn
            </a>
            <a
              href="https://www.linkedin.com/in/patrick-engelbert/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn style={{ backgroundColor: "white" }} />
            </a>
            , or
            <a
              href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              GitHub
            </a>
            <a
              href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
            .
          </p>
          <p>
            You can also send me a message or request my phone number using the
            form linked below. Just click the button below to get started!
          </p>
        </section>
        <p className="lead">
          <Link to="/contact" className="btn btn-primary btn-sm mr-2">
            Contact Me
          </Link>
          <b> patrickengelbert2@gmail.com</b>
        </p>
      </div>
      <div className="text-center">© 2022 Copyright: Patrick Inc.</div>
    </footer>
  );
}

export default Footer;
