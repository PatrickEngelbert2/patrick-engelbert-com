import React from "react";
import { ReactComponent as LinkedIn } from "../images/linkedin.svg";
import { ReactComponent as GitHub } from "../images/github.svg";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="sticky-inner subtle-shadow">
      <nav className="navbar navbar-default navbar-static-top navbar-expand-lg navbar-light navbar-dark bg-gradient">
        <Link className="navbar-brand" to="/">
          Patrick Engelbert
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
            {/* <Link className="nav-item nav-link" to="/contact">
              Contact Me
            </Link> */}
            {/* <Link className="nav-item nav-link" to="/experience">
              Experience
            </Link> */}
            <Link className="nav-item nav-link" to="/portfolio">
              Portfolio
            </Link>
          </div>
        </div>
        <div className="ml-auto d-flex align-items-center">
          <Link to="/contact" className="btn btn-primary btn-sm mr-2">
            Contact Me
          </Link>
          <section className="mb-2 social-icons">
            <a
              href="https://www.linkedin.com/in/patrick-engelbert/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="social-icon linkedin subtle-shadow" />
            </a>
            <a
              href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub className="social-icon github subtle-shadow" />
            </a>
          </section>
        </div>
      </nav>
    </header>
  );
}

export default Header;
