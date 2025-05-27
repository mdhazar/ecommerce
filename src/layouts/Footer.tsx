import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div>
        <div className="container bg-[#FAFAFA] flex flex-col md:flex-row justify-between items-center py-6 mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Bandage</h1>
          <div className="flex gap-4">
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

        <div className="container flex flex-wrap justify-between gap-8 mb-8">
          <div>
            <h2 className="text-lg mb-4">Company Info</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#737373]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Carrier
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  We are hiring
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg mb-4">Legal</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#737373]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  We are hiring
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg mb-4">Features</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#737373]">
                  Business Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  User Analytic
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Unlimited Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg mb-4">Resources</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#737373]">
                  iOS & Android
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Watch a Demo
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373]">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-white mb-8">
            <h2 className="text-lg mb-4">Get In Touch</h2>
            <form className="flex space-x-2">
              <input
                type="email"
                className="grow p-2 border border-[#737373] rounded-md"
                placeholder="Your Email"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-[#737373] mt-2">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>

        <div className="px-16 text-[#737373] text-sm py-6 bg-[#FAFAFA]">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
