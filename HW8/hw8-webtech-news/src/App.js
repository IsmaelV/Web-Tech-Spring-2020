import React from "react";
import MyNav from "./components/nav";
import Home from "./components/home";
import World from "./components/world";
import Politics from "./components/politics";
import Business from "./components/business";
import Technology from "./components/technology";
import Sports from "./components/sports";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <MyNav />
      <div className="App">
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/world" component={World} />
          <Route path="/politics" component={Politics} />
          <Route path="/business" component={Business} />
          <Route path="/technology" component={Technology} />
          <Route path="/sports" component={Sports} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
