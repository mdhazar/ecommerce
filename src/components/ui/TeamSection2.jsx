import React from "react";

const mockImage1 = "https://placehold.co/600x800";
const mockImage2 = "https://placehold.co/300x400";
const mockImage3 = "https://placehold.co/300x400";
const mockImage4 = "https://placehold.co/300x400";
const mockImage5 = "https://placehold.co/300x400";

export default function TeamSection2() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-8">
      <div className="flex-1">
        <img
          src={mockImage1}
          alt="Main Hero"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        <img
          src={mockImage2}
          alt="Team member 1"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src={mockImage3}
          alt="Team member 2"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src={mockImage4}
          alt="Team member 3"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src={mockImage5}
          alt="Team member 4"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
