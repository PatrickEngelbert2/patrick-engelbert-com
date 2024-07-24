import React from "react";
import { ReactComponent as LinkedIn } from "../images/linkedin.svg";
import { ReactComponent as GitHub } from "../images/github.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">
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
                backgroundColor: "white",
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

        {/* Additional Info */}
        <section className="">
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
        </section>
        {/* additional links */}
        <section className="">
          <p className="lead">
            Contact: <b>patrickengelbert2@gmail.com</b>
          </p>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 2
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 2
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 2
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Link 1
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 2
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      {/* copyright */}
      <div className="text-center pb-3 text-muted">
        © 2022 Copyright: Patrick Inc.
      </div>
    </footer>
  );
}

export default Footer;
