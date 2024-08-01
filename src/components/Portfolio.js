import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <>
      <div className="container p-3 my-3 bg-dark text-white">
        <h1>
          Portfolio:
          <small className="text-muted"> Creations worth sharing</small>
        </h1>
        <p className="lead">
          Checkout some of the apps and websites I've built over the years!
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col attention-border">
            <a
              href="https://tikverse.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="hover">
                <img
                  src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/tikverse-better.png"
                  className="img-thumbnail rounded max-size mx-auto d-block"
                  alt="Dashboard for my Tikverse app"
                />
              </div>
            </a>
            <h3>
              <a
                href="https://tikverse.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tikverse:
              </a>
              <small className="text-muted">
                {" "}
                Probably the coolest and most advanced app I’ve made, Tikverse
                is a social media app taking inspiration from TikTok, Instagram,
                and Facebook. It features the ability to create an account, log
                in, and post to your wall for others to see. You can also make
                comments on, and like, others’ posts. It features a basic
                recommendation algorithm and a search bar to find people and
                posts. The app was built with the latest technologies including
                server-side rendering with Next.js. This means it's extremely
                quick, secure, and compatible with even the least powerful
                devices. Checkout the{" "}
                <a
                  href="https://github.com/Jen-Pat-Multiverse-Backend-Project/tikverse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  git repo
                </a>{" "}
                to see how it works! Made in collaboration with jenperez613.
              </small>
            </h3>
          </div>
          <div className="row">
            <div className="col attention-border">
              <a
                href="https://pomodoro-timer-patrick-engelbert.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="hover">
                  <img
                    src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/pomodoro-timer-better.png"
                    className="img-thumbnail rounded max-size"
                    alt="Dashboard for my Timer app"
                  />
                </div>
              </a>
              <h3>
                <a
                  href="https://pomodoro-timer-patrick-engelbert.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pomodoro Timer:
                </a>
                <small className="text-muted">
                  {" "}
                  This application enables users to utilize a unique timer
                  system, inspired by Francesco Cirillo’s productivity method.
                  The concept involves setting a timer for a focused work period
                  of 25 minutes, followed by a 5-minute break, automatically
                  initiated by the timer. This approach is designed to enhance
                  productivity for tasks demanding high mental effort,
                  preventing burnout. The application was developed and launched
                  using a range of technologies including React.js, Bootstrap,
                  Git, Node.js, Vercel, Jira, and more{" "}
                </small>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col attention-border">
              <a
                href="https://www.stuffi.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="hover">
                  <img
                    src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/stuffi-better.png"
                    className="img-thumbnail rounded max-size"
                    alt="Dashboard for my Stuffi app"
                  />
                </div>
              </a>
              <h3>
                <a
                  href="https://www.stuffi.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stuffi:{" "}
                </a>
                <small className="text-muted">
                  Stuffi is a versatile bulletin app that empowers users to
                  create accounts (no email required) and post, organize, sort,
                  and filter ideas. Its open-ended design offers a wide range of
                  use cases:
                  <ul class="custom-list">
                    <li>
                      <strong>Big Purchases</strong>: Add items, tag them with
                      key features, and compare them side-by-side.
                    </li>
                    <li>
                      <strong>Recipe Catalog</strong>: Create an easy-to-use
                      catalog for your favorite recipes, tag them with
                      ingredients, and filter by what you have on hand.
                    </li>
                    <li>
                      <strong>Home Improvement & Gift Ideas</strong>: From home
                      improvement projects to gift ideas, the sky is the limit!
                    </li>
                  </ul>
                  Built with Next.js, Knex.js, Git, DBever, MySQL, Elephant SQL,
                  and more, Stuffi showcases my programming and web development
                  skills. Want to try it out without creating an account? Use
                  the test user credentials: <strong>Username: test</strong><br></br>
                  <strong>Password: Test@123</strong>
                </small>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item attention-border">
            <a
              href="https://periodic-reservations.herokuapp.com/dashboard?date=2022-04-30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="hover">
                <img
                  src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/periodic-reservations.png"
                  className="img-thumbnail rounded max-size"
                  alt="Dashboard for my Periodic Reservations app"
                />
              </div>
            </a>
            <h3>
              Periodic Reservations:{" "}
              <small className="text-muted">
                An app that lets you create, edit, view, seat, and cancel
                reservations. I created the whole application, front, and
                back-end, and deployed it with React.js, Bootstrap, Git,
                Node.js, Knex.js, SQL, DBever, Heroku, Jira, and more.
              </small>
            </h3>
          </div>
          <div className="flex-item attention-border">
            <a
              href="https://grubdash-client1.herokuapp.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="hover">
                <img
                  src="https://images-patrickengelbert.s3.us-east-2.amazonaws.com/grub-dash-better.png"
                  className="img-thumbnail rounded max-size"
                  alt="Dashboard for my Grub Dash app"
                />
              </div>
            </a>
            <h3>
              Grub Dash:{" "}
              <small className="text-muted">
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
