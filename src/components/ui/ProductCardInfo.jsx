import React from "react";
import productCardInfo from "../../assets/productCardInfo.png";

export default function ProductCardInfo() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start space-x-4 mb-4">
        <button className="text-gray-700 font-semibold ">Description</button>
        <button className="text-gray-600">Additional Information</button>
        <button className="text-gray-600">
          Reviews <span>(0)</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-1 flex-shrink-0">
          <img
            src={productCardInfo}
            alt="Product"
            className="object-cover w-full"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold mb-4">the quick fox jumps over</h3>
          <p className="text-gray-600 text-sm mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <p className="text-gray-600  text-sm mb-4">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
        </div>

        <div className="flex-1 flex flex-col mb-6">
          <h3 className="text-xl font-semibold mb-4">
            the quick fox jumps over
          </h3>
          <ul className="flex flex-col space-y-2">
            {[...Array(4)].map((_, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>&#8250;</span>
                <span>the quick fox jumps over the lazy dog</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col mt-6">
            <h3 className="text-xl font-semibold mb-4">
              the quick fox jumps over
            </h3>
            <ul className="flex flex-col space-y-2">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>&#8250;</span>
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
