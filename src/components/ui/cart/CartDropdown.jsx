import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  updateCartItem,
  removeFromCart,
  toggleCartItem,
} from "../../redux/actions/shoppingCartActions";

const CartDropdown = ({ isOpen, onClose }) => {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleQuantityChange = (productId, newCount) => {
    if (newCount < 1) return;
    dispatch(updateCartItem(productId, newCount));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0);
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Shopping Cart ({cart.length})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center py-4 border-b"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleCartItem(item.product.id))}
                    className="mr-4 h-4 w-4 text-[#23A6F0]"
                  />

                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="ml-4 flex-grow">
                    <h4 className="text-sm font-medium">{item.product.name}</h4>
                    <div className="text-sm text-[#23A6F0] mt-1">
                      ${(item.product.price * item.count).toFixed(2)}
                    </div>

                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.count - 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="mx-3 min-w-[20px] text-center">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, item.count + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="ml-4 p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold text-[#23A6F0]">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-[#23A6F0] border border-[#23A6F0] rounded hover:bg-[#23A6F0] hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
                <Link to="/cart" className="flex-1" onClick={onClose}>
                  <button className="w-full px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8dd3] transition-colors">
                    View Cart
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
