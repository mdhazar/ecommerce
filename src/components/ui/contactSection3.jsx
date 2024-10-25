import React from "react";
import contactImage from "../../assets/contactSection3a.png";

export default function ContactSection3() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactImage})` }}
    >
      <div className="bg-white  p-8 rounded-lg  text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CONTACT US</h1>
        <p className="text-gray-600 mb-8">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 mb-8">
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
