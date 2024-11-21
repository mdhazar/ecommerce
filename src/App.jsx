import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { verifyToken } from "./redux/thunks/authThunks";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/LoginPage";
import { fetchCategories } from "./redux/thunks/categoryThunks";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShoppingCartPage from "./components/ui/shoppingPageCartComponent";
import { loadCartFromStorage } from "./redux/actions/shoppingCartActions";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./components/ui/protectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(fetchCategories());
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/shop/:gender" component={ShopPage} />
        <Route exact path="/shop/:gender/:categoryId" component={ShopPage} />
        <Route
          exact
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route path="/signup" component={SignUp} />
        <Route path="/cart" component={ShoppingCartPage} />
        <Route path="/login" component={Login} />
        <Route exact path="/team" component={TeamPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/about" component={AboutUs} />
        <Route
          path="/order"
          render={(props) => (
            <ProtectedRoute>
              <OrderPage {...props} />
            </ProtectedRoute>
          )}
        />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
