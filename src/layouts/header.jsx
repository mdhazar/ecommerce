import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaYoutube, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    
    <div className="header text-white bg-[#252B42] ">
      <div className="container">
        <div className="flex justify-between items-center p-4">
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt /> 
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope /> 
              <span>michelle.rivera@example.com</span>
            </div>
          </div>
          <div className="text-center">
            Follow Us and get a chance to win 80% off
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow Us:</span>
            <FaInstagram /> 
            <FaYoutube /> 
            <FaFacebookF /> 
            <FaTwitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;