import React from "react";
import men from "../../assets/men.png";
import women from "../../assets/women.png";
import accessories from "../../assets/accessories.png";
import kids from "../../assets/kids.png";

const ShopCard = ({ image, label }) => {
  return (
    <div className="relative mb-8">
      <img
        src={image}
        alt={label}
        className="w-full h-72 object-cover rounded-lg shadow-md"
      />
      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-md shadow-lg">
        <p className="text-lg font-bold  uppercase">{label}</p>
      </div>
    </div>
  );
};

const ShopCardSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold">EDITOR'S PICK</h2>
        <p className="text-gray-500">Problems trying to resolve the conflict between</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ShopCard image={men} label="Men" />
        <ShopCard image={women} label="Women" />
        <ShopCard image={accessories} label="Accessories" />
        <ShopCard image={kids} label="Kids" />
      </div>
    </div>
  );
};

export default ShopCardSection;