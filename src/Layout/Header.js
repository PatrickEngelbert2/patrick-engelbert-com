import React from "react";
import { ReactComponent as LinkedIn } from "../images/linkedin.svg";
import { ReactComponent as GitHub } from "../images/github.svg";
import { Link } from "react-router-dom";
import "./Header.css";


function Header() {

  return (
    <header className="sticky-inner">
      <nav className="navbar navbar-default navbar-static-top navbar-expand-lg navbar-light navbar-dark bg-primary">
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
            <Link className="nav-item nav-link" to="/bio">
              Bio
            </Link>
            <Link className="nav-item nav-link" to="/experience">
              Experience
            </Link>
            <Link className="nav-item nav-link" to="/portfolio">
              Portfolio
            </Link>
          </div>
        </div>
        {/* social media */}
        <section className="mb-2">
          <a
            href="https://www.linkedin.com/in/patrick-engelbert/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn
              style={{
                width: "50px",
                height: "50px",
                marginRight: "20px",
                color: "white",
                backgroundColor: "#0A66C2",
              }}
            />
          </a>
          <a
            href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub style={{ width: "50px", height: "50px" }} />
          </a>
        </section>
      </nav>
    </header>
  );
}

export default Header;
