import { React, useEffect, useRef, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./index.css"
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import Footer from "./Footer";
import Bio from "../components/Bio"
import Experience from "../components/Experience";
import Portfolio from "../components/Portfolio";

function Layout() {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <>
    <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
      <Header />
      </div>
      <div className="container" id="main-content">
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
