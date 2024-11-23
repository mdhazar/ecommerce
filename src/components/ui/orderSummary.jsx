import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = ({
  onButtonClick,
  buttonText,
  buttonDisabled,
  showSecurityBadges = true,
}) => {
  const cart = useSelector((state) => state.shoppingCart.cart);

  const SHIPPING_FEE = 15;
  const DISCOUNT_PERCENTAGE = 10;

  const calculateSubtotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 0 ? SHIPPING_FEE : 0;
  const discountAmount = (subtotal * DISCOUNT_PERCENTAGE) / 100;
  const grandTotal = subtotal + shippingCost - discountAmount;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cart
          .filter((item) => item.checked)
          .map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.images?.[0]?.url || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.count}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                ${(item.product.price * item.count).toFixed(2)}
              </p>
            </div>
          ))}
      </div>

      <div className="space-y-3 py-4 border-t border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount ({DISCOUNT_PERCENTAGE}%)</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          disabled={buttonDisabled}
          className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {buttonText}
        </button>
      )}

      {showSecurityBadges && (
        <div className="mt-6 space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>30-day return policy</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
