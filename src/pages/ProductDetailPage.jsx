import React from "react";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ProductCardInfo from "../components/ui/ProductDetailPage/ProductCardInfo";
import BestSellerProducts from "../components/ui/HomePage/BestSellerProducts";
import ShopPageBrandIcons from "../components/ui/ProductDetailPage/ShopPageBrandIcons";
import ProductDetailPageContent from "../layouts/ProductDetailPageContent";

function ProductDetailPage() {
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
}

export default ProductDetailPage;
