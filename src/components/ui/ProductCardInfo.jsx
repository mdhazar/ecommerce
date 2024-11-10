import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductCardInfo() {
  const [activeTab, setActiveTab] = useState("description");
  const { currentProduct } = useSelector((state) => state.product);

  if (!currentProduct) {
    return null;
  }

  const tabContent = {
    description: (
      <>
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold mb-4">{currentProduct.name}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {currentProduct.description}
          </p>

          <p className="text-gray-600 text-sm mb-4">Product Features:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm mb-4">
            <li>High-quality materials</li>
            <li>Durable construction</li>
            <li>Modern design</li>
            <li>Comfortable fit</li>
          </ul>
        </div>

        <div className="flex-1 flex flex-col mb-6">
          <h3 className="text-xl font-semibold mb-4">Product Highlights</h3>
          <ul className="flex flex-col space-y-2">
            <li className="flex items-center space-x-2">
              <span>›</span>
              <span>Rating: {currentProduct.rating} out of 5</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>›</span>
              <span>Total Sales: {currentProduct.sell_count} units</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>›</span>
              <span>Stock Available: {currentProduct.stock} units</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>›</span>
              <span>Price: ${currentProduct.price.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </>
    ),
    additional: (
      <div className="flex-1">
        <table className="w-full">
          <tbody className="divide-y">
            <tr className="py-2">
              <td className="py-2 font-semibold text-gray-600 w-1/3">SKU</td>
              <td className="py-2 text-gray-600">PRD-{currentProduct.id}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold text-gray-600">Category</td>
              <td className="py-2 text-gray-600">
                ID: {currentProduct.category_id}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold text-gray-600">Store</td>
              <td className="py-2 text-gray-600">
                ID: {currentProduct.store_id}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold text-gray-600">Stock Status</td>
              <td className="py-2 text-gray-600">
                {currentProduct.stock > 0 ? "In Stock" : "Out of Stock"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    reviews: (
      <div className="flex-1 text-center py-8">
        <p className="text-gray-600">No reviews yet.</p>
        <button className="mt-4 text-blue-600 hover:text-blue-700">
          Be the first to write a review
        </button>
      </div>
    ),
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start space-x-4 mb-4 border-b">
        {[
          { id: "description", label: "Description" },
          { id: "additional", label: "Additional Information" },
          { id: "reviews", label: "Reviews (0)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 -mb-px ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-1 flex-shrink-0">
          {currentProduct.images && currentProduct.images.length > 0 ? (
            <img
              src={currentProduct.images[0].url}
              alt={currentProduct.name}
              className="object-cover w-full rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {tabContent[activeTab]}
      </div>
    </div>
  );
}
