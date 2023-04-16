import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import NoData from "./components/NoData";

import Show from "./components/Show";
import Home from "./components/home.js";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={Show} />
        <Route exact path="/NoData" component={NoData} />
      </div>
    </Router>
  );
}

export default App;
