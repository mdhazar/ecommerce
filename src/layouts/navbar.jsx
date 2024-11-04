import React, { useState } from "react";
import {
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions/clientActions";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(setUser({}));

    localStorage.removeItem("token");

    setMenuOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="text-2xl font-bold text-[#252B42]">
          <Link to="/">BrandName</Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link to="/shop" className="text-gray-600 hover:text-gray-800">
            Shop <span className="ml-1">&#x25BE;</span>
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-800">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
          <Link to="/team" className="text-gray-600 hover:text-gray-800">
            Pages
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="text-gray-600 hover:text-gray-800">
            <FaSearch size={20} />
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800">
            <FaShoppingCart size={20} />
          </Link>
          <Link to="/wishlist" className="text-gray-600 hover:text-gray-800">
            <FaHeart size={20} />
          </Link>

          {user && user.email ? (
            <div className="flex items-center space-x-2">
              <img
                src={user.gravatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <FaUser />
                <span className="ml-1">Login</span>
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-gray-800">
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-100 p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              to="/team"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              Pages
            </Link>

            <div className="flex flex-col space-y-4 mt-4">
              <Link
                to="/search"
                className="text-gray-600 hover:text-gray-800 flex items-center"
                onClick={toggleMenu}
              >
                <FaSearch size={20} />
                <span className="ml-2">Search</span>
              </Link>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-gray-800 flex items-center"
                onClick={toggleMenu}
              >
                <FaShoppingCart size={20} />
                <span className="ml-2">Cart</span>
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-600 hover:text-gray-800 flex items-center"
                onClick={toggleMenu}
              >
                <FaHeart size={20} />
                <span className="ml-2">Wishlist</span>
              </Link>

              {user && user.email ? (
                <div className="flex items-center space-x-2 mt-4">
                  <img
                    src={user.gravatarUrl}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    to="/login"
                    className="flex items-center text-gray-600 hover:text-gray-800"
                    onClick={toggleMenu}
                  >
                    <FaUser />
                    <span className="ml-2">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
