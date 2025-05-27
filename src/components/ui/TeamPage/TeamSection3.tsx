import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const mockImage1 = "https://placehold.co/300x300";
const mockImage2 = "https://placehold.co/300x300";
const mockImage3 = "https://placehold.co/300x300";
const mockImage4 = "https://placehold.co/300x300";
const mockImage5 = "https://placehold.co/300x300";
const mockImage6 = "https://placehold.co/300x300";

const TeamSection3: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          mockImage1,
          mockImage2,
          mockImage3,
          mockImage4,
          mockImage5,
          mockImage6,
        ].map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={image}
              alt={`Team member ${index + 1}`}
              className="max-w-full max-h-full object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800">Username</h3>
            <p className="text-gray-500">Profession</p>

            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-600 text-[#395185]"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500 text-black"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-500 text-[#55ACEE]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection3;
