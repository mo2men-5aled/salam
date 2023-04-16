import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import NoData from "./components/NoData";

import Show from "./components/Show";
import Home from "./components/home.js";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={Show} />
        <Route exact path="/NoData" component={NoData} />
      </Router>
    </div>
  );
}

export default App;
