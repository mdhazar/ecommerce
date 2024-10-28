import React from "react";
import roomImageMobile from "../../assets/roomImage1.png";
import roomImageDesktop from "../../assets/roomImage.png";

export default function ContactSection2() {
  return (
    <div className="relative  h-[40vh] w-full flex items-center justify-center">
      <div
        className="absolute inset-0  size-auto bg-contain bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(${roomImageDesktop})` }}
      ></div>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block lg:hidden"
        style={{ backgroundImage: `url(${roomImageMobile})` }}
      ></div>

      <div className="container relative p-8 z-10 flex flex-col items-center text-center  bg-opacity-80 ">
        <h1 className="text-4xl font-bold text-gray-800  p-10 leading-snug">
          Questions & Answers
        </h1>

        <p className="text-gray-600 text-xl mb-10 px-8 2xl:px-96">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics:
        </p>
        <button className="text-blue-400 font-bold text-xl hover:underline leading-snug">
          CONTACT US
        </button>
      </div>
    </div>
  );
}
