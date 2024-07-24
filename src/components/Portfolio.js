import React from "react";
import periodicReservations from "../images/periodic-reservations.PNG";
import grubDash from "../images/grub-dash.PNG";
import "./Portfolio.css";

function Portfolio() {
  return (
    <>
      <div className="container p-3 my-3 bg-dark text-white">
        <h1>
          Portfolio:
          <small className="text-muted"> Creations worth sharing</small>
        </h1>
        <p className="lead">lorem ipsum</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="https://periodic-reservations.herokuapp.com/dashboard?date=2022-04-30">
              <div className="hover">
                <img
                  src={periodicReservations}
                  className="img-thumbnail rounded max-size"
                  alt="Dashboard for my Periodic Reservations app"
                />
              </div>
            </a>
            <h3>
              Periodic Reservations:
              <small className="text-muted">
                {" "}
                An app that lets you create, edit, view, seat, and cancel
                reservations. I created the whole application, front, and
                back-end, and deployed it with React.js, Bootstrap, Git,
                Node.js, Knex.js, SQL, DBever, Heroku, Jira, and more.{" "}
              </small>
            </h3>
          </div>
          <div className="col">
            <a href="https://grubdash-client1.herokuapp.com/dashboard">
              <div className="hover">
                <img
                  src={grubDash}
                  className="img-thumbnail rounded max-size"
                  alt="Dashboard for my Grub Dash app"
                />
              </div>
            </a>
            <h3>
              Grub Dash:
              <small className="text-muted">
                {" "}
                An app that lets you order food and create dishes. I created the
                back-end to this application, and deployed it with React.js,
                Bootstrap, Git, Node.js, Knex.js, SQL, DBever, Heroku, Jira, and
                more.
              </small>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
