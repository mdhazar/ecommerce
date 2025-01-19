import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "@/redux/thunks/productThunks";
import { addToCart } from "@/redux/actions/shoppingCartActions";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const ProductDetailPageContent = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const { currentProduct, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  const handleBack = () => {
    history.goBack();
  };

  const handleAddToCart = () => {
    if (currentProduct.stock < quantity) {
      toast.error("Not enough stock available!");
      return;
    }

    // Add the selected quantity to cart
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(currentProduct));
    }

    toast.success(`${currentProduct.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!currentProduct) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section - Unchanged */}
        <div className="space-y-4">
          {currentProduct.images && currentProduct.images.length > 0 ? (
            <>
              <div className="aspect-square w-full rounded-lg overflow-hidden">
                <img
                  src={currentProduct.images[0].url}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={`${currentProduct.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Product Details Section - Updated with quantity selector */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentProduct.name}
          </h1>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-gray-900">
              ${currentProduct.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(currentProduct.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({currentProduct.rating.toFixed(1)})
              </span>
            </div>
          </div>

          <p className="text-gray-600">{currentProduct.description}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Stock:</span>
              <span
                className={`font-semibold ${currentProduct.stock === 0 ? "text-red-500" : "text-green-500"}`}
              >
                {currentProduct.stock > 0
                  ? `${currentProduct.stock} available`
                  : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sold:</span>
              <span className="font-semibold">{currentProduct.sell_count}</span>
            </div>
          </div>

          {/* Quantity Selector */}
          {currentProduct.stock > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(currentProduct.stock, quantity + 1))
                  }
                  className="px-3 py-1 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#23A6F0] text-white py-3 px-6 rounded-lg hover:bg-[#1a8dd3] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={currentProduct.stock === 0}
            >
              {currentProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button className="w-full border border-[#23A6F0] text-[#23A6F0] py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageContent;
