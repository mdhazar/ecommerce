import React from "react";

import Header from "../layouts/header";
import NavBar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ShopCardSection from "../components/ui/shopCardSection";

import FeaturedProducts from "../components/ui/featuredProducts";
import ShopPageBrandIcons from "../components/ui/ShopPageBrandIcons";

function ShopPage() {
  return (
    <div>
      <Header />
      <NavBar />

      <ShopCardSection />

      <FeaturedProducts />
      <ShopPageBrandIcons />
      <Footer />
    </div>
  );
}

export default ShopPage;
