import React from "react";
import Header from "../layouts/header";
import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";
import ProductCards from "../components/ui/ProductCards";

function ProductDetailPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <ProductCards />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
