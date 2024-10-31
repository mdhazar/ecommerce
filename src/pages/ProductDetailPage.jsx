import React from "react";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ProductCards from "../components/ui/ProductCards";
import ProductCardInfo from "../components/ui/ProductCardInfo";
import BestSellerProducts from "../components/ui/BestSellerProducts";
import ShopPageBrandIcons from "../components/ui/ShopPageBrandIcons";

function ProductDetailPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <ProductCards />
      <ProductCardInfo />
      <BestSellerProducts />
      <ShopPageBrandIcons />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
