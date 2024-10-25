import React from "react";
import roomImage from "../../assets/roomImage.png";

export default function ContactSection2() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${roomImage})` }}
    >
      <div className="flex flex-col items-center text-center bg-white bg-opacity-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Get answers to all your questions.
        </h1>
        <p className="text-gray-600 mb-6">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics:
        </p>
        <button className="text-blue-400 font-bold text-xl hover:underline">
          CONTACT US
        </button>
      </div>
    </div>
  );
}
