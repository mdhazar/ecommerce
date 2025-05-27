import React, { useState, useEffect, useRef } from "react";
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
import CartDropdown from "../components/ui/cart/CartDropdown";
import { ChevronDown } from "lucide-react";
import { RootState } from "../redux/store";

interface Category {
  id: number;
  gender: string;
  code: string;
  title: string;
}

interface User {
  email: string;
  name?: string;
  gravatarUrl: string;
}

interface CartItem {
  count: number;
}

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.client.user);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const cart = useSelector((state: RootState) => state.shoppingCart.cart);
  const dispatch = useDispatch();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const cartItemsCount = cart.reduce(
    (total: number, item: CartItem) => total + item.count,
    0
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
      if (!(event.target as Element).closest(".cart-container")) {
        setCartOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = (): void => {
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>

          {/* Shop Link with Dropdown */}
          <div className="relative flex dropdown-container">
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
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Kadın</h3>
                    {categories
                      .filter((category: Category) => category.gender === "k")
                      .map((category: Category) => (
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
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Erkek</h3>
                    {categories
                      .filter((category: Category) => category.gender === "e")
                      .map((category: Category) => (
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

        {/* Desktop Icons and User Section */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="text-gray-600 hover:text-gray-800">
            <FaSearch size={20} />
          </Link>

          {/* Cart Icon and Dropdown */}
          <div className="relative cart-container">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="text-gray-600 hover:text-gray-800 relative p-2"
            >
              <FaShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <CartDropdown
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
            />
          </div>

          <Link to="/wishlist" className="text-gray-600 hover:text-gray-800">
            <FaHeart size={20} />
          </Link>

          {/* User Section */}
          {user && user.email ? (
            <div className="relative" ref={userMenuRef}>
              <div className="flex items-center space-x-2">
                <img
                  src={user.gravatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1"
                >
                  <span className="text-gray-700">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <div className="relative mr-4 cart-container">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="text-gray-600 hover:text-gray-800 relative p-2"
            >
              <FaShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <CartDropdown
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
            />
          </div>
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
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
              {user && user.email ? (
                <>
                  <Link
                    to="/orders"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={toggleMenu}
                  >
                    Order History
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-left text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
