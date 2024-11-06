import React from "react";

import Header from "../layouts/header";
import NavBar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ShopCardSection from "../components/ui/shopCardSection";

import ShopPageBrandIcons from "../components/ui/ShopPageBrandIcons";

function ShopPage() {
  return (
    <div>
      <Header />
      <NavBar />

      <ShopCardSection />

      <ShopPageBrandIcons />
      <Footer />
    </div>
  );
}

export default ShopPage;
