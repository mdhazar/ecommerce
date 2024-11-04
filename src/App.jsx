import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductDetailPage from "./pages/ProductDetailPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/product" component={ProductDetailPage} />

        <Route exact path="/shop" component={ShopPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route exact path="/team" component={TeamPage} />

        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/about" component={AboutUs} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
