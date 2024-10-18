import React from "react";
import productSlide1 from "../../assets/productSlide1.jpg";
const NewCollection = () => {
  return (
    <div className="relative h-screen  flex items-center justify-center text-white">
      
      <div className="absolute inset-0 z-0">
        <img
          src={productSlide1}
          alt="New Collection"
          className="object-cover w-full h-full"
        />
      </div>

     
      <div className="relative z-10 text-center">
        <p className="text-sm uppercase tracking-wider mb-2">Summer 2020</p>
        <h1 className="text-5xl font-bold uppercase mb-4">New Collection</h1>
        <p className="text-lg mb-8">
          We know how large objects will act, but things on a small scale.
        </p>
        <button className="bg-[#2DC071] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#2DC071]">
          Shop Now
        </button>
      </div>

     
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl">
        <button className="text-white">&#10094;</button>
      </div>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl">
        <button className="text-white">&#10095;</button>
      </div>
    </div>
  );
};

export default NewCollection;