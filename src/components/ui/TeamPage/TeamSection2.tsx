import React from "react";

const mockImage1 = "https://placehold.co/600x800";
const mockImage2 = "https://placehold.co/300x400";
const mockImage3 = "https://placehold.co/300x400";
const mockImage4 = "https://placehold.co/300x400";
const mockImage5 = "https://placehold.co/300x400";

const TeamSection2: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 ">
        <img
          src={mockImage1}
          alt="Main Hero"
          className="w-full h-full object-cover rounded-lg"
          style={{ aspectRatio: "3/4" }}
        />
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4  ">
        {[mockImage2, mockImage3, mockImage4, mockImage5].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Team member ${index + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ aspectRatio: "3/4" }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection2;
