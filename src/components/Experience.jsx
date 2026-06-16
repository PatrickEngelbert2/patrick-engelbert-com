import React from "react";
import { Link } from "react-router-dom";

function Experience() {
  return (
    <>
      <div className="container p-3 my-3 bg-dark text-white">
        <h1>
          Experience:
          <small className="text-muted"> A specific set of skills &#128526;</small>
        </h1>
        <p className="lead">
          I'm a full-stack Software Engineer, but how I got to where I am is a
          bit out of the ordinary. Follow me on a journey of how a foggy road
          took me on more twists and turns than I once thought possible.
        </p>
      </div>
      <h3>My Story</h3>
      <article>
        <p>
          This page is still being shaped into a fuller career story. For now,
          the clearest overview of my background is available through my{" "}
          <Link to="/resume/software-engineering">software engineering resume</Link>
          ,{" "}
          <Link to="/resume/robotics-controls">
            robotics and controls resume
          </Link>
          , and <Link to="/portfolio">portfolio</Link>.
        </p>
      </article>
    </>
  );
}

export default Experience;
