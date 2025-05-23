import React, { useEffect, useState } from "react";
import bestSellerImage from "@/assets/bestSellerProduct1.png";

const initialProducts = [
  {
    id: 1,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
  {
    id: 2,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
  {
    id: 3,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
  {
    id: 4,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
];

const additionalProducts = [
  {
    id: 5,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
  {
    id: 6,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
  {
    id: 7,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
  {
    id: 8,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: "$16.48",
    discountedPrice: "$6.48",
    image: bestSellerImage,
  },
];

export default function BestSellerProducts() {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleScreenChange = (e) => {
      if (e.matches) {
        setProducts([...initialProducts, ...additionalProducts]);
      } else {
        setProducts(initialProducts);
      }
    };

    mediaQuery.addEventListener("change", handleScreenChange);

    if (mediaQuery.matches) {
      setProducts([...initialProducts, ...additionalProducts]);
    }

    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        BESTSELLER PRODUCTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-md font-semibold mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.department}</p>
              <div className="flex justify-center space-x-2">
                <span className="text-gray-500 line-through">
                  {product.originalPrice}
                </span>
                <span className="text-green-500 font-bold">
                  {product.discountedPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
