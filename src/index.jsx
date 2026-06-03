import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = document.getElementById("root");
if (root !== null) {
  const hydrateRoot = ReactDOM.createRoot(root);
  hydrateRoot.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}
