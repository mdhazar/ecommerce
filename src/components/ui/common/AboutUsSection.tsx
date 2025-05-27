import React from "react";
import about from "../../../assets/about1.png";

const AboutUsSection1: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center min-h-screen bg-[#2A7CC7] text-white">
      {/* Left Side - Text */}
      <div className="w-full lg:w-1/2 flex flex-col items-center px-4 lg:px-8 py-8 lg:py-0 text-center">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
          Work With Us
        </h3>
        <h1 className="text-2xl font-bold mb-4">
          Now Let's <br /> grow Yours
        </h1>
        <p className="text-base max-w-md mb-6">
          The gradual accumulation of information about atomic and small-scale
          behavior during the first quarter of the 20th
        </p>
        <button className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
          Button
        </button>
      </div>

      <div className="w-full lg:w-1/2 hidden lg:flex">
        <img
          src={about}
          alt="About Us"
          className="object-contain max-h-[500px] w-full"
        />
      </div>
    </section>
  );
};

export default AboutUsSection1;
