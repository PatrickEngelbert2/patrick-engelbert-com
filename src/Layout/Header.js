import React from "react";
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
      </nav>
    </header>
  );
}

export default Header;
