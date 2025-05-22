import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ContactSection1() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl md:px-8 lg:px-32 xl:px-56 2xl:px-96 py-16 flex flex-col items-center justify-center text-center">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Get answers to all your questions.
        </h1>
        <p className="text-gray-500 mb-6">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics:
        </p>
      </div>

      <div className="flex mb-8">
        <button className="bg-[#23A6F0] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">
          CONTACT OUR COMPANY
        </button>
      </div>

      <div className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <FaTwitter size={30} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <FaFacebook size={30} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <FaInstagram size={30} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <FaLinkedin size={30} />
        </a>
      </div>
    </div>
  );
}
