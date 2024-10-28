import React from "react";
import contactSection4a from "../../assets/contactSection4a.png"; // Adjust the path as needed

export default function ContactSection4() {
  return (
    <div className="min-h-screen lg:h-auto flex flex-col lg:flex-row items-center justify-center bg-[#2A7CC7] text-white p-6 lg:p-0">
      {/* Text Section */}
      <div className="flex flex-col xl:px-32 items-center lg:items-start lg:w-1/2 lg:p-8">
        <h2 className="uppercase text-xl mb-2 text-center lg:text-left">
          Work with us
        </h2>

        <h1 className="text-4xl font-bold mb-4 text-center lg:text-left leading-tight">
          Now Let’s grow Yours
        </h1>

        <p className="text-center lg:text-left text-base mb-4 leading-relaxed max-w-md lg:max-w-none">
          The gradual accumulation of information about atomic and small-scale
          behavior during the first quarter of the 20th
        </p>

        <button className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">
          Button
        </button>
      </div>

      {/* Image Section for Desktop View */}
      <div className="hidden  lg:flex lg:w-1/2 items-center justify-center lg:h-full">
        <img
          src={contactSection4a}
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
