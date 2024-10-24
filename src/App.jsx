import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product" component={ProductDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
