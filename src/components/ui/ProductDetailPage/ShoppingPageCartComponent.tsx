import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  updateCartItem,
  removeFromCart,
  toggleCartItem,
} from "../../../redux/actions/shoppingCartActions";
import Header from "../../../layouts/Header";
import Navbar from "../../../layouts/Navbar";
import Footer from "../../../layouts/Footer";
import { toast } from "react-toastify";
import { RootState, AppDispatch } from "../../../redux/store";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  images?: Array<{ url: string }>;
}

interface CartItem {
  product: Product;
  count: number;
  checked: boolean;
}

interface User {
  [key: string]: any;
}

const ShoppingCartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.shoppingCart.cart);
  const user = useSelector((state: RootState) => state.client.user);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleQuantityChange = (
    productId: number,
    currentCount: number,
    change: number
  ): void => {
    const newCount = currentCount + change;
    if (newCount < 1) return;

    const cartItem = cart.find(
      (item: CartItem) => item.product.id === productId
    );
    if (newCount > cartItem.product.stock) {
      toast.error("Cannot exceed available stock!");
      return;
    }

    dispatch(updateCartItem(productId, newCount));
  };

  const handleRemove = (productId: number): void => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleCheck = (productId: number): void => {
    dispatch(toggleCartItem(productId));
  };

  const handleCreateOrder = (): void => {
    if (!user || !Object.keys(user).length) {
      history.push("/login", { from: "/order" });
      return;
    }

    history.push("/order");
  };

  const calculateSubtotal = (): number => {
    return cart
      .filter((item: CartItem) => item.checked)
      .reduce(
        (total: number, item: CartItem) =>
          total + item.product.price * item.count,
        0
      );
  };

  const SHIPPING_FEE = 15;
  const DISCOUNT = 10;

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 0 ? SHIPPING_FEE : 0;
  const discountAmount = (subtotal * DISCOUNT) / 100;
  const grandTotal = subtotal + shippingCost - discountAmount;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Add some items to your cart to see them here.
              </p>
              <Link
                to="/shop"
                className="bg-[#23A6F0] text-white px-6 py-3 rounded-lg hover:bg-[#1a8dd3] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50">
                      <div className="grid grid-cols-12 gap-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-1">Select</div>
                        <div className="col-span-2">Product</div>
                        <div className="col-span-3">Name</div>
                        <div className="col-span-1">Price</div>
                        <div className="col-span-2">Quantity</div>
                        <div className="col-span-2">Total</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                    </div>

                    <div className="bg-white divide-y divide-gray-200">
                      {cart.map((item: CartItem) => (
                        <div
                          key={item.product.id}
                          className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                        >
                          <div className="col-span-1">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() =>
                                handleToggleCheck(item.product.id)
                              }
                              className="h-4 w-4 text-[#23A6F0] rounded border-gray-300 focus:ring-[#23A6F0]"
                            />
                          </div>

                          <div className="col-span-2">
                            <img
                              src={
                                item.product.images?.[0]?.url ||
                                "/placeholder.png"
                              }
                              alt={item.product.name}
                              className="h-16 w-16 object-cover rounded-lg shadow-sm"
                            />
                          </div>

                          <div className="col-span-3">
                            <div className="font-medium text-gray-900">
                              {item.product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Stock: {item.product.stock}
                            </div>
                          </div>

                          <div className="col-span-1 font-medium">
                            ${item.product.price.toFixed(2)}
                          </div>

                          <div className="col-span-2">
                            <div className="flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-1">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.count,
                                    -1
                                  )
                                }
                                disabled={item.count <= 1}
                                className="p-1.5 rounded-md hover:bg-white disabled:opacity-50 transition-colors"
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.count}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.count,
                                    1
                                  )
                                }
                                disabled={item.count >= item.product.stock}
                                className="p-1.5 rounded-md hover:bg-white disabled:opacity-50 transition-colors"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                          </div>

                          <div className="col-span-2 font-medium text-[#23A6F0]">
                            ${(item.product.price * item.count).toFixed(2)}
                          </div>

                          <div className="col-span-1">
                            <button
                              onClick={() => handleRemove(item.product.id)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Fee</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount ({DISCOUNT}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="flex justify-between text-lg font-bold">
                      <span>Grand Total</span>
                      <span className="text-[#23A6F0]">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handleCreateOrder}
                      className="w-full bg-[#23A6F0] text-white py-3 px-6 rounded-lg hover:bg-[#1a8dd3] transition-colors mt-6 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={!cart.some((item: CartItem) => item.checked)}
                    >
                      Create Order
                    </button>

                    <div className="text-sm text-gray-500 mt-4 space-y-2">
                      <p className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Secure checkout
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Free shipping on orders over $100
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
