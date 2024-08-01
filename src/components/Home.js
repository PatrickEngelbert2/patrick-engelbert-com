import React from "react";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="container p-3 my-3 bg-dark text-white">
        <h1>
          Patrick Engelbert:
          <small className="text-muted"> A Full-Stack Software Engineer</small>
        </h1>
        <p className="lead">
          Welcome! This is my personal website - created using React, and
          deployed via AWS. 
        </p>
      </div>
      <div className="container row justify-content-center">
      <img
        src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/bluebackground-better2.jpg"
        className="img-thumbnail rounded max-size col-3"
        alt="Patrick Engelbert's self portrait"
      />
      </div>
    </>
  );
}

export default Home;
