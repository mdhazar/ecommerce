import AboutUsSection1 from "@/components/ui/AboutUsSection1";
import ShopPageBrandIcons from "@/components/ui/ProductDetailPage/ShopPageBrandIcons";
import TeamSection3 from "@/components/ui/TeamPage/TeamSection3";
import Footer from "@/layouts/footer";
import Header from "@/layouts/header";
import Navbar from "@/layouts/navbar";
import React from "react";

function AboutUs() {
  return (
    <div>
      <Header />
      <Navbar />
      <TeamSection3 />

      <ShopPageBrandIcons />
      <AboutUsSection1 />
      <Footer />
    </div>
  );
}
export default AboutUs;
