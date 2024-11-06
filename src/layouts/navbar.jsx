import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/thunks/categoryThunks";
import { setUser } from "../redux/actions/clientActions";
import api from "../api/api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(setUser({}));
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
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

          {/* Shop Link with Dropdown Arrow */}
          <div className="relative flex">
            <Link
              to="/shop"
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Shop
            </Link>
            <button
              onClick={toggleDropdown}
              className="text-gray-600 hover:text-gray-800 ml-2"
            >
              {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 top-full">
                <div className="grid grid-cols-2 p-4 gap-4">
                  {/* Left Column for "Kadın" */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Kadın</h3>
                    {categories
                      .filter((category) => category.gender === "k")
                      .map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop/k/${category.code.split(":")[1]}`}
                          className="block px-2 mb-4 text-sm font-semibold text-[#737373] hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                  </div>
                  {/* Right Column for "Erkek" */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Erkek</h3>
                    {categories
                      .filter((category) => category.gender === "e")
                      .map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop/e/${category.code.split(":")[1]}`}
                          className="block px-2 mb-4 text-sm font-semibold text-[#737373] hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {category.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

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
    </div>
  );
};

export default Navbar;
