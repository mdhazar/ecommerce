import type React from "react";
import BestSellerProducts from "../components/ui/HomePage/BestSellerProducts";
import ProductCardInfo from "../components/ui/ProductDetailPage/ProductCardInfo";
import ShopPageBrandIcons from "../components/ui/ProductDetailPage/ShopPageBrandIcons";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Navbar from "../layouts/Navbar";
import ProductDetailPageContent from "../layouts/ProductDetailPageContent";

const ProductDetailPage: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Navbar />
			<main className="grow">
				<ProductDetailPageContent />
				<ProductCardInfo />
				<BestSellerProducts />
				<ShopPageBrandIcons />
			</main>
			<Footer />
		</div>
	);
};

export default ProductDetailPage;
