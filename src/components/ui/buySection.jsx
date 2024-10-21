import React from "react";
import couple from "../../assets/coupleWithScarf.png";

function BuySection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      
      <p className="text-gray-500 uppercase tracking-wide text-sm text-center">
        Summer 2020
      </p>

      
      <h1 className="text-4xl font-bold text-center text-gray-800 my-4">
        Part of the <br /> Neural Universe
      </h1>

      
      <p className="text-center text-gray-600 max-w-sm mb-6">
        We know how large objects will act, but things on a small scale.
      </p>

     
      <div className="flex flex-col gap-4 mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">
          Buy Now
        </button>
        <button className="border border-blue-500 hover:bg-blue-50 text-blue-500 font-bold py-2 px-6 rounded">
          Learn More
        </button>
      </div>

      
      <img
        src={couple}
        alt="Couple with Scarf"
        className="rounded-lg w-full max-w-xs mb-6"
      />
    </div>
  )
}

export default BuySection