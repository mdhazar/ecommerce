import React from "react";

import Header from "../layouts/header";
import NavBar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ShopCardSection from "../components/ui/shopCardSection";

import ShopPageBrandIcons from "../components/ui/ShopPageBrandIcons";
import ShopProducts from "@/components/ui/shopProducts";

function ShopPage() {
  return (
    <div>
      <Header />
      <NavBar />

      <ShopCardSection />
      <ShopProducts />
      <ShopPageBrandIcons />
      <Footer />
    </div>
  );
}

export default ShopPage;
