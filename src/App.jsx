import React from "react";
import "./App.css";
import HomePage from "./pages/homePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Note the change

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
