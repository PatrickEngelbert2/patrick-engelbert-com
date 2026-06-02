import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
