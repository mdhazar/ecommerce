import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
export default function TeamSection4() {
  return (
    <div className="flex flex-col items-center text-center py-24  max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-[#252B42] mb-2">
        Start your 14 days free trial
      </h2>

      <p className="text-[#737373] mb-6">
        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
        RELIT official consequent.
      </p>

      <button className="bg-[#23A6F0] text-white font-semibold px-6 py-3 rounded-sm hover:bg-blue-600 transition duration-300 mb-8">
        Try it free now
      </button>

      <div className="flex space-x-6 ">
        <a
          href="#"
          aria-label="Twitter"
          className="hover:text-blue-500 text-[#55ACEE]"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="hover:text-blue-600 text-[#395185]"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="hover:text-pink-500 text-black"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="hover:text-blue-500 text-[#0A66C2]"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
}
