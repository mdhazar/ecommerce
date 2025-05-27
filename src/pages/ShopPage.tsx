import React from "react";
import Header from "../layouts/Header";
import NavBar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import ShopCardSection from "../components/ui/HomePage/ShopCardSection";
import ShopPageBrandIcons from "../components/ui/ProductDetailPage/ShopPageBrandIcons";
import ShopProducts from "../components/ui/product/ShopProducts";
import ProductFilter from "../components/ui/product/ProductFilter";

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
