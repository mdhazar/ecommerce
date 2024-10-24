import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";
import productCard1 from "../../assets/productCard1.jpg";
import productCard2 from "../../assets/productCard1.jpg";
import productCard3 from "../../assets/productCard2.jpg";

const products = [productCard1, productCard2, productCard3];

export default function ProductCards() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % products.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={products[currentImage]}
          alt="Product"
          className="w-full h-64 object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex mt-2 px-4">
        {products.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={"Thumbnail " + (index + 1)}
            className={
              "w-16 h-16 object-cover mr-2 cursor-pointer " +
              (index === currentImage ? "border-2 border-blue-500" : "")
            }
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Floating Phone</h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={
                "w-5 h-5 " + (i < 4 ? "text-yellow-400" : "text-gray-300")
              }
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-gray-600 ml-2">10 Reviews</span>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-4">$1,139.33</p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Availability:</span> In Stock
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          RELIT official consequent door ENIM RELIT Mollie. Excitation venial
          consequent sent nostrum met.
        </p>
        <div className="flex space-x-2 mb-4">
          {["bg-blue-500", "bg-green-500", "bg-orange-500", "bg-gray-800"].map(
            (color, index) => (
              <button
                key={index}
                className={"w-6 h-6 rounded-full " + color}
              ></button>
            )
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex-grow">
            Select Options
          </button>
          <button className="p-2 rounded-md border border-gray-300">
            <Heart className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-md border border-gray-300">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-md border border-gray-300">
            <Eye className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
