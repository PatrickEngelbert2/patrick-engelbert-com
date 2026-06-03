import { React, useEffect, useRef, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import Footer from "./Footer";
import Bio from "../components/Bio";
import Experience from "../components/Experience";
import Portfolio from "../components/Portfolio";
import ContactMe from "../components/ContactMe";
import UserContactPatrickForm from "../components/UserContactPatrickForm";
import ContactInfoRequestForm from "../components/ContactInfoRequestForm";
import Resume from "../components/Resume";
import RoboticsResume from "../components/RoboticsResume";
import SpaceXTarget from "../components/SpaceXTarget";
import { EasterEggProvider } from "../easterEggs/EasterEggContext";
import KeyboardSequence from "../easterEggs/KeyboardSequence";
import SecretTerminal from "../easterEggs/SecretTerminal";
import SpaceXReturnButton from "../easterEggs/SpaceXReturnButton";
import TrophyRoom from "../easterEggs/TrophyRoom";

function Layout() {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <EasterEggProvider>
    <div className="app-container parallax">
      {/* Added container for flexbox layout */}
      <div className={`sticky-wrapper${isSticky ? " sticky" : ""}`} ref={ref}>
        <Header />
      </div>
      <main className="content" id="main-content">
        {/* Updated main content */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/bio">
              <Bio />
            </Route>
            <Route exact path="/experience">
              <Experience />
            </Route>
            <Route exact path="/portfolio">
              <Portfolio />
            </Route>
            <Route exact path="/contact">
              <ContactMe />
            </Route>
            <Route exact path="/contact/message">
              <UserContactPatrickForm />
            </Route>
            <Route exact path="/contact/request-contact-info">
              <ContactInfoRequestForm />
            </Route>
            <Route exact path="/resume">
              <Redirect to="/resume/software-engineering" />
            </Route>
            <Route exact path="/resume/software-engineering">
              <Resume />
            </Route>
            <Route exact path="/resume/robotics-controls">
              <RoboticsResume />
            </Route>
            <Route exact path="/spacex">
              <SpaceXTarget />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
      </main>
      <Footer />
    </div>
    <KeyboardSequence />
    <SecretTerminal />
    <SpaceXReturnButton />
    <TrophyRoom />
    </EasterEggProvider>
  );
}

export default Layout;
