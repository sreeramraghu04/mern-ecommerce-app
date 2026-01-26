import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-xl mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              MernMart
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Premium shopping experience built with ❤️ in Kerala, India.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="hover:text-blue-600 font-medium transition-colors"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Customer</h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <span className="hover:text-blue-600 font-medium transition-colors cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-blue-600 font-medium transition-colors cursor-pointer">
                  Contact
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Connected</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center text-blue-600 hover:text-blue-700 transition-all duration-200"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-indigo-100 hover:bg-indigo-200 rounded-xl flex items-center justify-center text-indigo-600 hover:text-indigo-700 transition-all duration-200"
              >
                🐦
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          © 2026 MernMart. All rights reserved. |
          <a
            href="https://sreeramraghu.online/"
            className="font-semibold text-blue-600 hover:text-blue-700 ml-1 transition-colors"
          >
            Built by Ram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
