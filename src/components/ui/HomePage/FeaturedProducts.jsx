import React from "react";
import featuredProduct1 from "@/assets/featuredProduct1.png";
import featuredProduct2 from "@/assets/featuredProduct2.png";
import featuredProduct3 from "@/assets/featuredProduct3.png";
const products = [
  {
    id: 1,
    title: "Loudest à la Madison #1 (L’integral)",
    category: ["Google", "Trending", "New"],
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
    imageUrl: featuredProduct1,
  },
  {
    id: 2,
    title: "Loudest à la Madison #1 (L’integral)",
    category: ["Google", "Trending", "New"],
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
    imageUrl: featuredProduct2,
  },
  {
    id: 3,
    title: "Loudest à la Madison #1 (L’integral)",
    category: ["Google", "Trending", "New"],
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
    imageUrl: featuredProduct3,
  },
];
const FeaturedProducts = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-sm text-blue-500 uppercase font-semibold">
            Practice Advice
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Problems trying to resolve the conflict between the two major
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
                  New
                </span>
              </div>

              <div className="p-5">
                <div className="flex space-x-3 text-sm text-gray-500 mb-2">
                  {product.category.map((cat, idx) => (
                    <span key={idx} className="font-semibold">
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <i className="far fa-calendar-alt"></i>
                    <span>{product.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="far fa-comments"></i>
                    <span>{product.comments}</span>
                  </span>
                </div>

                <div className="mt-4">
                  <a
                    href="#"
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
