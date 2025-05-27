import React from "react";
import Header from "../layouts/Header";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import ProductCardInfo from "../components/ui/ProductDetailPage/ProductCardInfo";
import BestSellerProducts from "../components/ui/HomePage/BestSellerProducts";
import ShopPageBrandIcons from "../components/ui/ProductDetailPage/ShopPageBrandIcons";
import ProductDetailPageContent from "../layouts/ProductDetailPageContent";

const ProductDetailPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-grow">
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
