import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";

import productCard1 from "../../../assets/productCard1.jpg";
import productCard2 from "../../../assets/productCard2.jpg";
import filledStar from "../../../assets/filled-star.png";
import emptyStar from "../../../assets/empty-star.png";

const products: string[] = [productCard1, productCard2];

interface ColorButtonProps {
  color: string;
  index: number;
}

const ColorButton: React.FC<ColorButtonProps> = ({ color, index }) => (
  <button key={index} className={`w-6 h-6 rounded-full ${color}`} />
);

const ProductCards: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const nextImage = (): void => {
    setCurrentImage((prev) => (prev + 1) % products.length);
  };

  const prevImage = (): void => {
    setCurrentImage((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="container bg-white rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="relative">
          <img
            src={products[currentImage]}
            alt="Product"
            className="w-full h-96 object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex mt-4 mb-4">
            {products.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover mr-2 cursor-pointer ${
                  index === currentImage ? "" : ""
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-2">Floating Phone</h2>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < 4 ? filledStar : emptyStar}
                alt="Star"
                className="w-5 h-5"
              />
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
            {[
              "bg-[#23A6F0]",
              "bg-[#2DC071]",
              "bg-[#E77C40]",
              "bg-[#252B42]",
            ].map((color, index) => (
              <ColorButton key={index} color={color} index={index} />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-[#23A6F0] text-white px-4 py-2 rounded-md flex-grow">
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
    </div>
  );
};

export default ProductCards;
