import React from "react";
import { Link } from "react-router-dom";
import "./FooterLinks.css";

function FooterLinks() {
  return (
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
  );
}

export default FooterLinks;
