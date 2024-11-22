import React from "react";
import OrderSummary from "@/components/ui/orderSummary";
import Footer from "@/layouts/footer";
import Navbar from "@/layouts/navbar";
import PaymentPageContent from "@/layouts/PaymentPageContent";

function Payment() {
  const handlePlaceOrder = () => {
    console.log("Place order");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Payment</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <PaymentPageContent />
            </div>

            <div className="lg:w-1/3">
              <OrderSummary
                buttonText="Place Order"
                buttonDisabled={false}
                onButtonClick={handlePlaceOrder}
                showSecurityBadges={true}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Payment;
