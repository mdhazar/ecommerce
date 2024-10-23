import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Header from "./layouts/header";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import NewCollection from "./components/ui/NewCollection";
import ShopCardSection from "./components/ui/shopCardSection";
import ShopSection from "./components/ui/shopSection";
import BuySection from "./components/ui/buySection";
import FeaturedProducts from "./components/ui/featuredProducts";


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
