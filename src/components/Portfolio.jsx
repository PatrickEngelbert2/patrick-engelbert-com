import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import { useEasterEggs } from "../easterEggs/EasterEggContext";
import walkTheRosaryPreview from "../images/walk-the-rosary.png";

const PROJECT_INSPECTION_TARGET = 3;

function Portfolio() {
  const { unlockEgg } = useEasterEggs();
  const [inspectedProjects, setInspectedProjects] = useState([]);
  const inspectedProjectsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const letters = document.querySelectorAll(".recoil-letter");
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        const scale = Math.max(0, 1 - distance / maxDistance);
        letter.style.transform = `translate(${-dx * scale}px, ${
          -dy * scale
        }px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const inspectProject = useCallback((projectId) => {
    if (inspectedProjectsRef.current.includes(projectId)) {
      return;
    }

    const nextProjects = [...inspectedProjectsRef.current, projectId];
    inspectedProjectsRef.current = nextProjects;
    setInspectedProjects(nextProjects);

    if (nextProjects.length >= PROJECT_INSPECTION_TARGET) {
      unlockEgg("portfolio-inspector");
    }
  }, [unlockEgg]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const projectId = entry.target.getAttribute("data-project-id");
          if (projectId) {
            inspectProject(projectId);
          }
        });
      },
      { threshold: 0.35 }
    );

    const projectCards = document.querySelectorAll(".portfolio-project-card");
    projectCards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [inspectProject]);

  const projectCardClass = (projectId, baseClass) =>
    `${baseClass}${
      inspectedProjects.includes(projectId) ? " portfolio-inspected" : ""
    }`;

  const wrapTextInSpans = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="recoil-letter">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="header-internal-content">
          <h1 className="header-title">
            {wrapTextInSpans("Portfolio: ")}
            <small className="header-subtitle">
              {wrapTextInSpans("Creations worth sharing")}
            </small>
          </h1>
          <p className="header-lead">
            {wrapTextInSpans(
              "Check out some of the apps and websites I've built over the years!"
            )}
          </p>
        </div>
        <div className="container">
          <div className="row">
            <article
              className={projectCardClass(
                "walk-the-rosary",
                "col-12 attention-border card-background portfolio-project-card portfolio-featured-card"
              )}
              data-project-id="walk-the-rosary"
              onMouseEnter={() => inspectProject("walk-the-rosary")}
            >
              <div className="portfolio-featured-heading">
                <div>
                  <span className="featured-project-label">
                    Featured Project
                  </span>
                  <h2>
                    <a
                      href="https://walktherosary.vercel.app/"
                      onFocus={() => inspectProject("walk-the-rosary")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Walk the Rosary
                    </a>
                  </h2>
                </div>
                <span className="featured-project-type">
                  Full-featured web application
                </span>
              </div>

              <a
                href="https://walktherosary.vercel.app/"
                className="portfolio-featured-preview-link"
                onFocus={() => inspectProject("walk-the-rosary")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="hover">
                  <img
                    src={walkTheRosaryPreview}
                    className="img-thumbnail portfolio-featured-preview"
                    alt="Walk the Rosary application interface"
                  />
                </div>
              </a>

              <div className="portfolio-featured-copy">
                <p>
                  Walk the Rosary is a local-first Catholic Rosary application
                  that combines guided prayer with tools for creating,
                  customizing, saving, and printing complete prayer guides. It
                  supports day-aware mystery selection, beginner-friendly quick
                  building, detailed guide editing, and responsive step-by-step
                  prayer flows designed for desktop and mobile use.
                </p>
                <p>
                  The application keeps its builder, guided experience, and
                  printable front-and-back guide cards aligned through shared
                  structured content and transformation logic. Users can choose
                  English, Latin, or Spanish prayer text, customize card layouts
                  and content, save guides locally, and export or validate JSON
                  backups without creating an account or sending data to a
                  backend.
                </p>
              </div>

              <ul className="portfolio-tech-list" aria-label="Technology stack">
                <li>Next.js 16</li>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>Tailwind CSS 4</li>
                <li>Vitest</li>
                <li>Vercel</li>
              </ul>

              <div className="portfolio-featured-actions">
                <a
                  className="btn btn-primary"
                  href="https://walktherosary.vercel.app/"
                  onFocus={() => inspectProject("walk-the-rosary")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Walk the Rosary
                </a>
                <a
                  className="btn btn-outline-primary"
                  href="https://github.com/PatrickEngelbert2/RosaryApp"
                  onFocus={() => inspectProject("walk-the-rosary")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source Code
                </a>
              </div>
            </article>
            <div
              className={projectCardClass(
                "tikverse",
                "col attention-border card-background portfolio-project-card"
              )}
              data-project-id="tikverse"
              onMouseEnter={() => inspectProject("tikverse")}
            >
              <a
                href="https://tikverse.vercel.app/"
                onFocus={() => inspectProject("tikverse")}
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
                  Probably the coolest and most advanced personal app I’ve made,
                  Tikverse is a social media app taking inspiration from TikTok,
                  Instagram, and Facebook. It features the ability to create an
                  account, log in, and post to your wall for others to see. You
                  can also make comments on, and like, others’ posts. It
                  features a basic recommendation algorithm and a search bar to
                  find people and posts. The app was built with the latest
                  technologies including server-side rendering with Next.js.
                  This means it's extremely quick, secure, and compatible with
                  even the least powerful devices. Check out the{" "}
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
              <div
                className={projectCardClass(
                  "pomodoro",
                  "col attention-border card-background portfolio-project-card"
                )}
                data-project-id="pomodoro"
                onMouseEnter={() => inspectProject("pomodoro")}
              >
                <a
                  href="https://pomodoro-timer-patrick-engelbert.vercel.app/"
                  onFocus={() => inspectProject("pomodoro")}
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
                    The concept involves setting a timer for a focused work
                    period of 25 minutes, followed by a 5-minute break,
                    automatically initiated by the timer. This approach is
                    designed to enhance productivity for tasks demanding high
                    mental effort, preventing burnout. The application was
                    developed and launched using a range of technologies
                    including React.js, Bootstrap, Git, Node.js, Vercel, Jira,
                    and more{" "}
                  </small>
                </h3>
              </div>
            </div>
            <div className="row">
              <div
                className={projectCardClass(
                  "stuffi",
                  "col attention-border card-background portfolio-project-card"
                )}
                data-project-id="stuffi"
                onMouseEnter={() => inspectProject("stuffi")}
              >
                <a
                  href="https://www.stuffi.app/"
                  onFocus={() => inspectProject("stuffi")}
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
                    create accounts (no email required) and post, organize,
                    sort, and filter ideas. Its open-ended design offers a wide
                    range of use cases:
                    <ul className="custom-list">
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
                        <strong>Home Improvement & Gift Ideas</strong>: From
                        home improvement projects to gift ideas, the sky is the
                        limit!
                      </li>
                    </ul>
                    Built with Next.js, Knex.js, Git, DBeaver, MySQL, Elephant
                    SQL, and more, Stuffi showcases my programming and web
                    development skills. Want to try it out without creating an
                    account? Use the test user credentials:{" "}
                    <strong>Username: test</strong>
                    <br></br>
                    <strong>Password: Test@123</strong>
                  </small>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col attention-border card-background">
                <h3>
                  The following apps were hosted on Heroku, which was previously
                  hacked. I am currently working on redeploying them. Please
                  check back soon! You can learn more about the Heroku hack at
                  the link below.<br></br>
                  <a
                    href="https://www.bleepingcomputer.com/news/security/heroku-admits-that-customer-credentials-were-stolen-in-cyberattack/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </h3>
              </div>
            </div>
          </div>
          <div className="flex-container">
            <div
              className={projectCardClass(
                "periodic-reservations",
                "flex-item attention-border card-background portfolio-project-card"
              )}
              data-project-id="periodic-reservations"
              onMouseEnter={() => inspectProject("periodic-reservations")}
            >
              <a
                href="https://periodic-reservations.herokuapp.com/dashboard?date=2022-04-30"
                onFocus={() => inspectProject("periodic-reservations")}
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
                  Node.js, Knex.js, SQL, DBeaver, Heroku, Jira, and more.
                </small>
              </h3>
            </div>
            <div
              className={projectCardClass(
                "grub-dash",
                "flex-item attention-border card-background portfolio-project-card"
              )}
              data-project-id="grub-dash"
              onMouseEnter={() => inspectProject("grub-dash")}
            >
              <a
                href="https://grubdash-client1.herokuapp.com/dashboard"
                onFocus={() => inspectProject("grub-dash")}
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
                  An app that lets you order food and create dishes. I created
                  the back-end to this application, and deployed it with
                  React.js, Bootstrap, Git, Node.js, Knex.js, SQL, DBeaver,
                  Heroku, Jira, and more.
                </small>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
