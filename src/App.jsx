import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductDetailPage from "./pages/ProductDetailPage";

import TeamPage from "./pages/TeamPage";


import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/product" component={ProductDetailPage} />

        <Route exact path="/shop" component={ShopPage} />


        <Route exact path="/team" component={TeamPage} />

        <Route exact path="/contact" component={ContactPage} />


      </Switch>
    </Router>
  );
}

export default App;
