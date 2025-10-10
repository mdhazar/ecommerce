import type React from "react";
import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SignUp from "./pages/SignUp";
import TeamPage from "./pages/TeamPage";
import { verifyToken } from "./redux/thunks/authThunks";
import "react-toastify/dist/ReactToastify.css";
import PreviousOrdersPage from "@/pages/PreviousOrdersPage";
import ProtectedRoute from "./components/ui/layout/ProtectedRoute";
import ShoppingCartPage from "./components/ui/ProductDetailPage/ShoppingPageCartComponent";
import Login from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import Payment from "./pages/PaymentPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { loadCartFromStorage } from "./redux/actions/shoppingCartActions";
import type { AppDispatch } from "./redux/store";
import { fetchCategories } from "./redux/thunks/categoryThunks";

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

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
					render={() => (
						<ProtectedRoute>
							<OrderPage />
						</ProtectedRoute>
					)}
				/>
				<Route
					path="/orders"
					render={() => (
						<ProtectedRoute>
							<PreviousOrdersPage />
						</ProtectedRoute>
					)}
				/>
				<Route
					path="/payment"
					render={() => (
						<ProtectedRoute>
							<Payment />
						</ProtectedRoute>
					)}
				/>
			</Switch>
			<ToastContainer />
		</Router>
	);
};

export default App;
