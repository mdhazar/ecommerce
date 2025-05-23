import React from "react";

import Header from "@/layouts/Header";
import NavBar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import NewCollection from "@/components/ui/HomePage/NewCollection";
import ShopCardSection from "@/components/ui/HomePage/ShopCardSection";
import ShopSection from "@/components/ui/HomePage/ShopSection";
import BuySection from "@/components/ui/HomePage/BuySection";
import FeaturedProducts from "@/components/ui/HomePage/FeaturedProducts";
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
