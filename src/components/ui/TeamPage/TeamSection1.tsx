import React from "react";

const TeamSection1: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-gray-500 uppercase text-sm mb-4 tracking-wide">
        What we do
      </h2>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
        Innovation tailored for you
      </h1>

      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <a href="#" className="hover:text-gray-800 font-medium">
          Home
        </a>
        <span>&gt;</span>
        <a href="#" className="hover:text-gray-800 font-medium">
          Team
        </a>
      </div>
    </div>
  );
};

export default TeamSection1;
