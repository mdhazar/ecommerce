import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  updateCartItem,
  removeFromCart,
  toggleCartItem,
} from "@/redux/actions/shoppingCartActions";
import Header from "@/layouts/header";
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";

const ShoppingCartPage = () => {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, currentCount, change) => {
    const newCount = currentCount + change;
    if (newCount < 1) return;

    const cartItem = cart.find((item) => item.product.id === productId);
    if (newCount > cartItem.product.stock) {
      toast.error("Cannot exceed available stock!");
      return;
    }

    dispatch(updateCartItem(productId, newCount));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleCartItem(productId));
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
  };

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
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Table Header */}
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
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
                    >
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggleCheck(item.product.id)}
                          className="h-4 w-4 text-[#23A6F0] rounded border-gray-300 focus:ring-[#23A6F0]"
                        />
                      </div>

                      <div className="col-span-2">
                        <img
                          src={
                            item.product.images?.[0]?.url || "/placeholder.png"
                          }
                          alt={item.product.name}
                          className="h-16 w-16 object-cover rounded"
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

                      <div className="col-span-1">
                        ${item.product.price.toFixed(2)}
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.count,
                                -1
                              )
                            }
                            disabled={item.count <= 1}
                            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-12 text-center">{item.count}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.count,
                                1
                              )
                            }
                            disabled={item.count >= item.product.stock}
                            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 font-medium text-gray-900">
                        ${(item.product.price * item.count).toFixed(2)}
                      </div>

                      <div className="col-span-1">
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-end items-center space-x-4">
                  <span className="text-gray-600">
                    Total for Selected Items:
                  </span>
                  <span className="text-xl font-bold text-[#23A6F0]">
                    ${calculateTotal().toFixed(2)}
                  </span>
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