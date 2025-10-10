import type React from "react";
import BestSellerProducts from "../components/ui/HomePage/BestSellerProducts";
import BuySection from "../components/ui/HomePage/BuySection";
import FeaturedProducts from "../components/ui/HomePage/FeaturedProducts";
import NewCollection from "../components/ui/HomePage/NewCollection";
import ShopCardSection from "../components/ui/HomePage/ShopCardSection";
import ShopSection from "../components/ui/HomePage/ShopSection";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import NavBar from "../layouts/Navbar";

const HomePage: React.FC = () => {
	return (
		<div>
			<Header />
			<NavBar />
			<NewCollection />
			<ShopCardSection />
			<BestSellerProducts />
			<ShopSection />
			<BuySection />
			<FeaturedProducts />
			<Footer />
		</div>
	);
};

export default HomePage;
