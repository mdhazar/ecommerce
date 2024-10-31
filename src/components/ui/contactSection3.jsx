import React from "react";
import contactImage from "../../assets/contactSection3a.png";
import roomImageDesktop from "../../assets/contactSection3b.png";

export default function ContactSection3() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat hidden lg:block"
        style={{ backgroundImage: `url(${roomImageDesktop})` }}
      ></div>

      <div
        className="absolute inset-0 bg-center bg-no-repeat block lg:hidden"
        style={{
          backgroundImage: `url(${contactImage})`,
          backgroundSize: "100% 100%",
        }}
      ></div>

      <div className="relative z-10 text-center max-w-3xl p-8  bg-opacity-80 ">
        <h1 className="text-xl lg:text-4xl font-bold text-gray-800 mb-4">
          CONTACT US
        </h1>
        <p className="text-gray-600 mb-8">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics.
        </p>
        <button className="bg-[#23A6F0] text-white px-6 py-3 rounded-sm shadow-md hover:bg-blue-600 mb-8">
          CONTACT US
        </button>

        <div className="text-gray-800">
          <div className="mb-8">
            <h2 className="font-bold text-lg">Paris</h2>
            <p>1901 Thorn ridge Cir.</p>
            <p>75000 Paris</p>
            <p>Phone: +451 215 215</p>
            <p>Fax: +451 215 215</p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold text-lg">Berlin</h2>
            <p>4140 Parker Rd.</p>
            <p>75000 Paris</p>
            <p>Phone: +451 215 215</p>
            <p>Fax: +451 215 215</p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold text-lg">New York</h2>
            <p>2715 Ash Dr. San Jose,</p>
            <p>75000 Paris</p>
            <p>Phone: +451 215 215</p>
            <p>Fax: +451 215 215</p>
          </div>

          <div>
            <h2 className="font-bold text-lg">London</h2>
            <p>3517 W. Gray St. Utica,</p>
            <p>75000 Paris</p>
            <p>Phone: +451 215 215</p>
            <p>Fax: +451 215 215</p>
          </div>
        </div>
      </div>
    </div>
  );
}
