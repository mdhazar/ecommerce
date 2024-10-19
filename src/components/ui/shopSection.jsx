import React from 'react';
import cover2 from "../../assets/cover2.png";
const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="relative bg-[#23856D] text-white p-8 rounded-lg max-w-md mx-auto">
      
      <div className="text-center mb-8">
        <p className="uppercase text-sm tracking-wide">Summer 2020</p>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg mb-4">{description}</p>
        <p className="text-2xl font-semibold mb-6">${price}</p>
        <button className="bg-[#23856D] px-6 py-2 rounded-lg text-white font-semibold">
          Add to Cart
        </button>
      </div>

      
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl">
        <button className="text-white">&#10094;</button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl">
        <button className="text-white">&#10095;</button>
      </div>

      
      <div className="relative z-0">
        <img src={image} alt={title} className="object-cover w-full h-72 rounded-b-lg" />
      </div>
    </div>
  );
};

const ShopSection = () => {
  return (
    <div className="p-8 bg-gray-100">
      <ProductCard
        image={cover2}
        title="Vita Classic Product"
        description="We know how large objects will act, but things on a small scale."
        price="16.48"
      />
    </div>
  );
};

export default ShopSection;