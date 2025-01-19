import React from "react";

import Header from "@/layouts/header";
import NavBar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import NewCollection from "@/components/ui/HomePage/NewCollection";
import ShopCardSection from "@/components/ui/HomePage/shopCardSection";
import ShopSection from "@/components/ui/HomePage/shopSection";
import BuySection from "@/components/ui/HomePage/buySection";
import FeaturedProducts from "@/components/ui/HomePage/featuredProducts";
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
