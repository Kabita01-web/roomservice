import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="bg-gray-800 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Stack vertically on mobile, row on medium+ */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Company Info */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex flex-col">
              {/* Logo with image */}
              <div className="flex items-center gap-3">
                <img 
                  src="/logo1.jpeg" // Replace with your actual logo path
                  alt="GharBhada Logo"
                  className="w-16 h-16 object-contain"
                />
                <h1 className="text-white text-xl sm:text-2xl font-bold">
                  GharBhada
                </h1>
              </div>
              
              {/* Alternative: Logo above text */}
              {/* 
              <img 
                src="/logo1.png" 
                alt="GharBhada Logo"
                className="w-16 h-16 object-contain"
              />
              <h1 className="text-white mt-3 text-xl sm:text-2xl font-bold">
                GharBhada
              </h1>
              */}
              
              <p className="text-gray-300 mt-4">
                If you have a property to rent or are looking for one, remember
                Room Sewa.
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-white text-lg font-semibold mb-3">
              Contact us:
            </h2>
            <p className="text-gray-300 mb-2">
              Email:{" "}
              <a
                href="mailto:roomrental321@gmail.com"
                className="hover:underline"
              >
                roomrental321@gmail.com
              </a>
            </p>
            <p className="text-gray-300">Phone: +97826182932 / 98374929294</p>
          </div>

          {/* Support Links */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-white text-lg font-semibold mb-3">Support</h2>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className="text-gray-300 hover:underline">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-300 hover:underline">
                  Help and Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Optional: copyright or extra info at bottom */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} GharBhada Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;