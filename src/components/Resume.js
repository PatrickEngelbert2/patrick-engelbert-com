import React from "react";
import "./Resume.css";
import { ReactComponent as LinkedIn } from "../images/linkedin.svg";
import { ReactComponent as GitHub } from "../images/github.svg";

function Resume() {
  const myResume =
    "https://images-patrickengelbert.s3.us-east-2.amazonaws.com/Patrick+Engelbert+Resume.pdf";

  return (
    <div className="resume-container">
      <div className="resume-button">
        <a href={myResume} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-secondary">
            View as Downloadable PDF
          </button>
        </a>
      </div>
      <h1 className="resume-title">Patrick Engelbert's Resume</h1>
      <div className="resume-section">
        <h2>Contact Information</h2>
        <p>
          Ottawa, KS 66067 | patrickengelbert2@gmail.com | (785) 418-1614 |
          <a
            href="https://www.linkedin.com/in/patrick-engelbert/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn{" "}
            <LinkedIn className="social-icon social-icon-resume linkedin subtle-shadow" />
          </a>{" "}
          |
          <a
            href="https://github.com/PatrickEngelbert2/PatrickEngelbert2"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            GitHub{" "}
            <GitHub className="social-icon social-icon-resume github subtle-shadow" />
          </a>
        </p>
      </div>
      <div className="resume-section">
        <h2>Summary</h2>
        <p>
          I am a Full-Stack Software Engineer with over 3 years of experience in
          the field who is also well-versed in computer hardware and networking.
          I’ve created advanced algorithms using cutting-edge technologies, and
          am always learning. I've professionally leveraged React, Angular,
          TypeScript, JavaScript ES6+, Node.js, and more, creating responsive
          websites on both front and back ends. I have extensive experience in
          customer service, collaborating as a team, and manipulating complex
          data structures. My main hobbies are building computers and learning
          about the latest in science and technology.
        </p>
      </div>
      <div className="resume-section">
        <h2>Tech Skills</h2>
        <p className="center-text">
          React.js | JavaScript ES6+ | Next.js | Node.js | Angular | TypeScript
          | Python LLM Development | AI Development | Full-Stack Development |
          Cyber Security | HTML & CSS | Bootstrap | Git & GitHub | Jira |
          Bitbucket | Agile | SQL | Knex.js | .md | .json | Data Structures &
          Algorithms | npm & yarn | Windows & Linux | Documentation
        </p>
      </div>
      <div className="resume-section">
        <h2>Projects</h2>
        <ul>
          <li>
            <strong>Tikverse</strong> - Advanced social media platform with
            elements from TikTok, Instagram, & Facebook.
            <ul>
              <li>
                Led development utilizing Next.js with server-side rendering,
                optimizing for speed, security, and cross-device compatibility.
                Tikverse Git Repo (2 Person Team)
              </li>
              <li>
                Crafted a recommendation engine + search functionality to
                enhance user experience
              </li>
            </ul>
          </li>
          <li>
            <strong>Stuffi</strong> - Open-ended, versatile bulletin app
            empowering users with numerous use-cases.
            <ul>
              <li>
                Developed with a modern tech stack, including Next.js and MySQL,
                showcasing my full-stack development capabilities. (2 Person
                Team)
              </li>
              <li>
                Enabled diverse applications like tracking purchases & managing
                recipe/project ideas.
              </li>
            </ul>
          </li>
          <li>
            <strong>Pomodoro Timer App</strong> - Timer app that lets you set
            focus and break times. Timer Git Repo
            <ul>
              <li>
                Created a full Pomodoro Timer application with React.js,
                Bootstrap, JS, and Node.js.
              </li>
            </ul>
          </li>
          <li>
            <strong>Decoder Ring</strong> - Encryption/decryption program with 3
            different encryption protocols.
            <ul>
              <li>
                Engineered encryption and decryption algorithms for an
                encryption program.
              </li>
            </ul>
          </li>
          <li>
            <strong>Reservation App</strong> - An app that lets you create,
            view, edit, seat, and cancel reservations.
            <ul>
              <li>
                Created the whole application, front, and back-end, and deployed
                it with React.js, Bootstrap, Git, Node.js, Knex.js, SQL, Heroku,
                Jira, and more. Reservation Git Repo
              </li>
            </ul>
          </li>
          <li>
            <strong>Flashcard App</strong> - Flashcard app that lets you create,
            edit, view, and study flashcards.
            <ul>
              <li>
                Created a full Flashcard application with React.js, Bootstrap,
                Git, and Node.js.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="resume-section">
        <h2>Experience</h2>
        <ul>
          <li>
            <strong>Full-Stack Software Engineer</strong>, Citizens Bank.
            Johnston, RI (Mar 2022 – Nov 2023)
            <ul>
              <li>
                Leveraged Angular, Typescript, and Node.js to engineer fast,
                reliable web pages.
              </li>
              <li>
                Worked as part of an Agile pod to refine and execute a wide
                range of user stories.
              </li>
              <li>
                Developed proprietary company software for securely capturing
                customer data.
              </li>
              <li>
                Developed core components of the consumer website -
                citizensbank.com (Sign in req)
              </li>
            </ul>
          </li>
          <li>
            <strong>Pharmacy Technician</strong>, Cosentino's Price Chopper.
            Ottawa, Kansas (June 2021 – Sep 2021)
            <ul>
              <li>
                Securely maintained application data with customers’ data.
              </li>
              <li>
                Collaborated as part of a focused team dispensing and selling
                life-saving medications.
              </li>
              <li>
                Cleaned and organized the pharmacy area for rapid dispensing in
                minimal time.
              </li>
            </ul>
          </li>
          <li>
            <strong>After School Teacher</strong>, RFTS (USD 290). Ottawa,
            Kansas (Aug 2019 – Apr 2020)
            <ul>
              <li>
                Conducted classes to teach principles in life skills, workforce
                entry skills, and more.
              </li>
              <li>
                Established and communicated clear objectives for lessons, and
                projects.
              </li>
              <li>
                Collaborated with coworkers and supervisors to create lessons,
                units, and projects.
              </li>
            </ul>
          </li>
          <li>
            <strong>Sales Associate</strong>, Walmart SuperCenter.
            Ottawa/Salina, Kansas (Apr 2015 – Jun 2019)
            <ul>
              <li>
                Demonstrated products or services to persuade customers to
                purchase or use them.
              </li>
              <li>
                Supervised the activities engaged in receiving, storing,
                testing, and selling products.
              </li>
              <li>
                Practiced outstanding customer service, even in challenging
                circumstances or situations.
              </li>
            </ul>
          </li>
          <li>
            <strong>Bank Teller</strong>, Kansas State Bank. Ottawa, Kansas (Apr
            2014 – Mar 2015)
            <ul>
              <li>
                Established and maintained relationships with individual and
                business customers.
              </li>
              <li>
                Oversaw the flow of cash or financial instruments through the
                process of bank telling.
              </li>
              <li>
                Cleaned and organized our bank area for rapid, accurate
                transactions in minimal time.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="resume-section">
        <h2>Education</h2>
        <ul>
          <li>
            <strong>Software Engineering Student</strong>, Thinkful. Remote (Sep
            2021 – Feb 2022)
            <ul>
              <li>
                Learned the tools and skills needed for full-stack web
                development.
              </li>
            </ul>
          </li>
          <li>
            <strong>Newman University</strong>, Wichita, KS - Bachelor
            Philosophy for Theological Studies (Aug. 2020-2021)
          </li>
          <li>
            <strong>Neosho County Community College</strong>, Ottawa, KS
            <ul>
              <li>Associate of Science DEGREE, Philosophy (May 2020)</li>
              <li>Associate of Arts DEGREE, Philosophy (May 2020)</li>
              <li>
                Yes. I did earn 2 associate degrees in the same school year.
                &#x1F60E;
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Resume;
