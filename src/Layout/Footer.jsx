import React from "react";
import LinkedIn from "../images/linkedin.svg?react";
import GitHub from "../images/github.svg?react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "../constants/contact";
// import FooterLinks from "../components/FooterLinks";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container pb-1">
        {/* social media */}
        <section className="mb-2">
          <a
            aria-label="Patrick Engelbert on LinkedIn"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn
              aria-hidden="true"
              focusable="false"
              className="social-icon social-icon-large social-icon-margin linkedin subtle-shadow"
            />
          </a>
          <a
            aria-label="Patrick Engelbert on GitHub"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub
              aria-hidden="true"
              focusable="false"
              className="social-icon social-icon-large github subtle-shadow"
            />
          </a>
        </section>

        {/* Additional Info */}
        <section className="footer-links">
          <p>
            Have a job opportunity, or just want to chat? Contact me via email,
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              LinkedIn
            </a>
            <a
              aria-label="Patrick Engelbert on LinkedIn"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn
                aria-hidden="true"
                focusable="false"
                style={{ backgroundColor: "white" }}
              />
            </a>
            , or
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              GitHub
            </a>
            <a
              aria-label="Patrick Engelbert on GitHub"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub aria-hidden="true" focusable="false" />
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
          <b> {CONTACT_EMAIL}</b>
        </p>
      </div>
      <div className="text-center">© 2026 Patrick Engelbert</div>
    </footer>
  );
}

export default Footer;
