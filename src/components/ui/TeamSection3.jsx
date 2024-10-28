import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Username",
    profession: "Profession",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Username",
    profession: "Profession",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Username",
    profession: "Profession",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Username",
    profession: "Profession",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Username",
    profession: "Profession",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Username",
    profession: "Profession",
    image: "https://via.placeholder.com/150",
  },
];

export default function TeamSection3() {
  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-48 h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-gray-500">{member.profession}</p>

            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-blue-600">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className="text-pink-500">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className="text-blue-400">
                <FaTwitter />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
