import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/thunks/productThunks";
import { useParams, useHistory } from "react-router-dom";

const ShopProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { filter, sort } = useSelector((state) => state.filter);
  const {
    products = [],
    total = 0,
    loading,
    error,
  } = useSelector((state) => state.product);
  const categories = useSelector((state) => state.category.categories);

  const { gender, categoryId } = useParams();

  useEffect(() => {
    const offset = (currentPage - 1) * productsPerPage;
    const queryParams = {
      offset,
      limit: productsPerPage,
    };
    if (categoryId) {
      queryParams.category = categoryId;
    }
    if (sort) {
      queryParams.sort = sort;
    }
    if (filter) {
      queryParams.filter = filter;
    }
    dispatch(fetchProducts(queryParams));
  }, [dispatch, currentPage, categoryId, filter, sort]);

  const handleProductClick = (product) => {
    const productNameSlug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const category = categories.find((cat) => cat.id === product.category_id);
    if (!category) return;

    const categoryName = category.code.split(":")[1];

    const productGender = category.gender;

    history.push(
      `/shop/${productGender}/${categoryName}/${category.id}/${productNameSlug}/${product.id}`
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort, categoryId]);

  const totalPages = Math.ceil(total / productsPerPage);

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-full h-64 bg-gray-200">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-green-600 font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-500">In Stock</span>
                ) : (
                  <span className="text-sm text-red-500">Out of Stock</span>
                )}
              </div>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(product.rating || 0)
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
                <span className="text-sm text-gray-500 ml-1">
                  ({product.rating?.toFixed(1) || "N/A"})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-1">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) =>
            Math.abs(currentPage - pageNumber) <= 2 && (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-1 rounded-md border border-gray-300 transition-colors duration-200 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            )
        )}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopProducts;
