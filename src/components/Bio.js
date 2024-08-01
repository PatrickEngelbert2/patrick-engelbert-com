import React from "react";

function Bio() {
  return (
    <>
      <div className="container p-3 my-3 bg-dark text-white">
        <h1>
          Bio:
          <small className="text-muted"> A long, unpredictable path</small>
        </h1>
        <p className="lead">I'm a full-stack Software Engineer, but how I got to where I am is a
          bit out of the ordinary. Follow me on a journey of how a foggy road
          took me on more twists and turns than I once thought possible.</p>
      </div>
      <img
        src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/way-in-foggy-forest-better.jpg"
        className="mx-auto d-block img-thumbnail rounded"
        alt="Foggy Forest"
      />
    </>
  );
}

export default Bio;