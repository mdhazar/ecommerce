import type React from "react";
import ShopCardSection from "../components/ui/HomePage/ShopCardSection";
import ShopPageBrandIcons from "../components/ui/ProductDetailPage/ShopPageBrandIcons";
import ProductFilter from "../components/ui/product/ProductFilter";
import ShopProducts from "../components/ui/product/ShopProducts";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import NavBar from "../layouts/Navbar";

const ShopPage: React.FC = () => {
	return (
		<div>
			<Header />
			<NavBar />
			<ShopCardSection />
			<ProductFilter />
			<ShopProducts />
			<ShopPageBrandIcons />
			<Footer />
		</div>
	);
};

export default ShopPage;
