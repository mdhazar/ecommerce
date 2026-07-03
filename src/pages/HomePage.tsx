import type React from "react";
import BestSellerProducts from "@/components/ui/HomePage/BestSellerProducts";
import BuySection from "@/components/ui/HomePage/BuySection";
import FeaturedProducts from "@/components/ui/HomePage/FeaturedProducts";
import NewCollection from "@/components/ui/HomePage/NewCollection";
import ShopCardSection from "@/components/ui/HomePage/ShopCardSection";
import ShopSection from "@/components/ui/HomePage/ShopSection";
import ShopPageBrandIcons from "@/components/ui/ProductDetailPage/ShopPageBrandIcons";
import SiteLayout from "@/layouts/SiteLayout";

const HomePage: React.FC = () => {
	return (
		<SiteLayout>
			<NewCollection />
			<ShopCardSection />
			<BestSellerProducts />
			<ShopSection />
			<FeaturedProducts />
			<BuySection />
			<ShopPageBrandIcons />
		</SiteLayout>
	);
};

export default HomePage;
