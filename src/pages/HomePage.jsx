import React from "react";

import Header from "../layouts/header";
import NavBar from "../layouts/navbar";
import Footer from "../layouts/footer";
import NewCollection from "../components/ui/NewCollection";
import ShopCardSection from "../shopCardSection";
import ShopSection from "../shopSection";
import BuySection from "../buySection";
import FeaturedProducts from "../featuredProducts";
import BestSellerProducts from "@/components/ui/HomePage/BestSellerProducts";

function HomePage() {
  return (
    <div>
      <Header />
      <NavBar />
      <NewCollection />
      <ShopCardSection />
      <BestSellerProducts />
      <ShopSection />
      <BuySection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default HomePage;
