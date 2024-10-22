import React from "react";
import cover2 from "../../assets/cover2.png";
import vector1 from "../../assets/Vector1.png";
import vector2 from "../../assets/Vector2.png";

const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="relative bg-[#23856D] text-white p-6 rounded-lg ">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="text-center container lg:text-left flex-1 mb-8 ">
          <p className="uppercase text-sm tracking-wide">Summer 2020</p>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg mb-4">{description}</p>
          <p className="text-2xl font-semibold mb-6">${price}</p>
          <button className="bg-white text-[#23856D] px-6 py-2 rounded-lg font-semibold hover:bg-[#1f7c62] hover:text-white transition-all">
            Add to Cart
          </button>
        </div>

        <div className="flex-1">
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-auto rounded-b-lg"
          />
        </div>
      </div>

      <div className="absolute left-0 top-1/2 transform ">
        <button className="hover:opacity-80">
          <img src={vector1} alt="Left Arrow" className="w-8 h-8" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform ">
        <button className="hover:opacity-80">
          <img src={vector2} alt="Right Arrow" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

const ShopSection = () => {
  return (
    <div className="p-4 bg-gray-100">
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
