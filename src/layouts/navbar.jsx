import React, { useState } from 'react';
import { FaUser, FaSearch, FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white ">
      <div className="container mx-auto flex justify-between ">
        
        
        <div className="text-2xl font-bold text-[#252B42]">
          BrandName
        </div>

        
        <div className="flex items-center md:hidden space-x-4">
          <a href="#" className="">
            <FaSearch size={20} />
          </a>
          <a href="#" className="">
            <FaShoppingCart size={20} />
            
          </a>

          
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        
        <div className="hidden md:flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-gray-800">Home</a>
          <a href="#" className="hover:text-gray-800">Shop <span className="ml-1">&#x25BE;</span></a>
          <a href="#" className="hover:text-gray-800">About</a>
          <a href="#" className="hover:text-gray-800">Blog</a>
          <a href="#" className="hover:text-gray-800">Contact</a>
          <a href="#" className="hover:text-gray-800">Pages</a>
        </div>

        
        <div className="hidden md:flex items-center space-x-6 text-[#1da1f2]">
          <a href="#" className="flex items-center space-x-1 ">
            <FaUser />
            <span>Login / Register</span>
          </a>
          <a href="#" className="">
            <FaSearch />
          </a>
          <a href="#" className=" flex items-center">
            <FaShoppingCart />
            
          </a>
          <a href="#" className=" flex items-center">
            <FaHeart />
            
          </a>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-gray-100 p-4 flex flex-col space-y-4">
          <a href="#" className="hover:text-gray-800 text-gray-600">Home</a>
          <a href="#" className="hover:text-gray-800 text-gray-600">Shop <span className="ml-1">&#x25BE;</span></a>
          <a href="#" className="hover:text-gray-800 text-gray-600">About</a>
          <a href="#" className="hover:text-gray-800 text-gray-600">Blog</a>
          <a href="#" className="hover:text-gray-800 text-gray-600">Contact</a>
          <a href="#" className="hover:text-gray-800 text-gray-600">Pages</a>
          <div className="flex flex-col space-y-4">
            <a href="#" className="flex items-center space-x-1 text-[#1da1f2] ">
              <FaUser />
              <span>Login / Register</span>
            </a>
            <a href="#" className="text-[#1da1f2] ">
              <FaSearch />
            </a>
            <a href="#" className="text-[#1da1f2] flex items-center ">
              <FaShoppingCart />
              
            </a>
            <a href="#" className="text-[#1da1f2] flex items-center ">
              <FaHeart />
              
            </a>
          </div>
        </div>
      )}

        <div className="md:hidden container mx-auto flex justify-center space-x-4 py-4 text-[#737373]"><a href="#" className="">Home</a></div>
        <div className="md:hidden container mx-auto flex justify-center space-x-4 py-4 text-[#737373]"><a href="#" className="">Product</a></div>
        <div className="md:hidden container mx-auto flex justify-center space-x-4 py-4 text-[#737373]"><a href="#" className="">Pricing</a></div>
        <div className="md:hidden container mx-auto flex justify-center space-x-4 py-4 text-[#737373]"><a href="#" className="">Contact</a></div>
    </div>
  );
};

export default Navbar;