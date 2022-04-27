import React from "react";
import { SocialMediaIconsReact } from "social-media-icons-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">
        {/* social media */}
        <section className="mb-2">
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            icon="linkedin"
            url="https://www.linkedin.com/in/patrick-engelbert/"
            size="50"
          />

          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0.25)"
            icon="github"
            url="https://github.com/PatrickEngelbert2"
            size="50"
          />
        </section>
        {/* newsletter */}
        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for my newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example21"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form5Example21">
                    Email address
                  </label>
                </div>
              </div>

              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Additional Info */}
        <section className="">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            distinctio earum repellat quaerat voluptatibus placeat nam, commodi
            optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>
        {/* additional links */}
        <section className="">
          <p className="lead">Contact: patrickengelbert2@gmail.com</p>
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
                <li>
                  <Link to="#!" className="text-white">
                    Link 3
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 4
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
                <li>
                  <Link to="#!" className="text-white">
                    Link 3
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 4
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
                <li>
                  <Link to="#!" className="text-white">
                    Link 3
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 4
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
                <li>
                  <Link to="#!" className="text-white">
                    Link 3
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Link 4
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
