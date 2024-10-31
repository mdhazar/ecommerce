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

      <div className="container relative flex flex-col items-center text-center  bg-opacity-80 ">
        <h1 className="text-xl lg:text-4xl font-bold text-gray-800 px-2 py-4 ">
          Questions & Answers
        </h1>

        <p className="text-gray-600 text-sm lg:text-xl 2xl:px-56">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics:
        </p>
      </div>
    </div>
  );
}
