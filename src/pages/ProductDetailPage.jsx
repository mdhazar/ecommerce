import React from "react";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ProductCards from "../components/ui/ProductCards";
import ProductCardInfo from "../components/ui/ProductCardInfo";
import BestSellerProducts from "../components/ui/BestSellerProducts";

function ProductDetailPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <ProductCards />
      <ProductCardInfo />
      <BestSellerProducts />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
