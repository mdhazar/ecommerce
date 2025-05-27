import React from "react";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import OrderPageContent from "../layouts/OrderPageContent";

const OrderPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <OrderPageContent />
      <Footer />
    </div>
  );
};

export default OrderPage;
