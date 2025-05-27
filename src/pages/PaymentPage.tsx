import React from "react";
import { RouteComponentProps } from "react-router-dom";

const PaymentPage: React.FC<RouteComponentProps> = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      {/* Add your payment form and logic here */}
    </div>
  );
};

export default PaymentPage;
