import AboutUsSection from "@/components/ui/common/AboutUsSection";
import ShopPageBrandIcons from "@/components/ui/ProductDetailPage/ShopPageBrandIcons";
import TeamSection3 from "@/components/ui/TeamPage/TeamSection3";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Navbar from "@/layouts/Navbar";
import React from "react";

function AboutUs() {
  return (
    <div>
      <Header />
      <Navbar />
      <TeamSection3 />

      <ShopPageBrandIcons />
      <AboutUsSection />
      <Footer />
    </div>
  );
}
export default AboutUs;
