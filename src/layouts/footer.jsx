import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-5">
      <div className="container">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Bandage</h1>
            <div className="flex space-x-4">
              <a href="#" className="text-[#23A6F0]">
                <FaFacebookF />
              </a>
              <a href="#" className="text-[#23A6F0]">
                <FaInstagram />
              </a>
              <a href="#" className="text-[#23A6F0]">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h2 className="text-lg mb-4">Company Info</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[] ">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Carrier
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    We are hiring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[] ">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Carrier
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    We are hiring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4">Features</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[] ">
                    Business Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    User Analytic
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Unlimited Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[] ">
                    iOS & Android
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Watch a Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    Customers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[] ">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg mb-4">Get In Touch</h2>
          <form className="flex space-x-2">
            <input
              type="email"
              className="flex-grow p-2 border border-gray-300 rounded-md"
              placeholder="Your Email"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-2">Lorem imp sum dolor Amit</p>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
