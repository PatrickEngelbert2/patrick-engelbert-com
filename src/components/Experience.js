import React from "react";
import forest from "../images/way-in-foggy-forest-861x574.jpg";

function Experience() {
  return (
    <>
    <div className="container p-3 my-3 bg-dark text-white">
      <h1>
        Experience:
        <small className="text-muted"> A long, unpredictable path</small>
      </h1>
      <p className="lead">
        I'm a full-stack Software Engineer, but how I got to where I am is a bit
        out of the ordinary. Follow me on a journey of how a foggy road took me
        on more twists and turns than I once thought possible.
      </p>
      </div>
      <img
        src={forest}
        className="rounded mx-auto d-block"
        alt="Foggy Forest"
      />
      <h3>My Story</h3>
      <p>Here is some placeholder text for my story.</p>
    </>
  );
}

export default Experience;
