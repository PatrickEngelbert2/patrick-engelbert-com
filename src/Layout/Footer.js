import React from "react";
import { SocialIcon } from 'react-social-icons'
import { Link } from "react-router-dom";

function Footer() {
  const LinkedinIcon = <SocialIcon url="www.linkedin.com" network="linkedin" />
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">
        {/* social media */}
        <section className="mb-2">
        {LinkedinIcon}
            <div>Heloooooo!!!</div>
          <SocialIcon url="www.github.com" network="github" />
        </section>

        {/* Additional Info */}
        <section className="">
          <p>
            Have a job oportunity, or just want to chat? Contact me via email, LinkedIn, or GitHub. 
          </p>
        </section>
        {/* additional links */}
        <section className="">
          <p className="lead">Contact: <b>patrickengelbert2@gmail.com</b></p>
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
      <div className="text-center pb-3 text-muted">© 2022 Copyright: Patrick Inc.</div>
    </footer>
  );
}

export default Footer;
