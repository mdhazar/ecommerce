import React from 'react';
import { FaUser, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa'; 

const Navbar = () => {
  return (
    <div className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="text-2xl font-bold text-[#252B42]">
          BrandName
        </div>

       
        <div className="flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-gray-800">Home</a>
          <a href="#" className="hover:text-gray-800">Shop <span className="ml-1">&#x25BE;</span></a> 
          <a href="#" className="hover:text-gray-800">About</a>
          <a href="#" className="hover:text-gray-800">Blog</a>
          <a href="#" className="hover:text-gray-800">Contact</a>
          <a href="#" className="hover:text-gray-800">Pages</a>
        </div>

       
        <div className="flex items-center space-x-6 text-[#1da1f2]">
          <a href="#" className="flex items-center space-x-1 hover:text-blue-600">
            <FaUser /> 
            <span>Login / Register</span>
          </a>
          <a href="#" className="hover:text-blue-600">
            <FaSearch /> 
          </a>
          <a href="#" className="hover:text-blue-600 flex items-center">
            <FaShoppingCart /> 
            <span className="ml-1">1</span> 
          </a>
          <a href="#" className="hover:text-blue-600 flex items-center">
            <FaHeart />
            <span className="ml-1">1</span> 
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;