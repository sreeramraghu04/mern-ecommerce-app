// Replace your entire NavBar.jsx with this modern version:
import React, { useContext, useState } from "react";
import AuthContext from "../context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Cartcontext from "../context/Cartcontext.jsx";
import { toast } from "sonner";

const NavBar = () => {
  const [extendedNavBar, setExtendedNavBar] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { cart } = useContext(Cartcontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("ecommerce");
    toast.success("Successfully logged out", { duration: 500 });
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-black bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-200 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            MernMart
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <NavLink
              to="/"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50"
            >
              Home
            </NavLink>

            {/* Authenticated User - Cart */}
            {auth.user ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/cart"
                  className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <FaShoppingCart size={24} />
                  {cart?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              </div>
            ) : (
              /* Guest User Links */
              <div>
                <NavLink
                  to="/dashboard"
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-all hover:bg-blue-50"
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {auth.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-2 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                    {auth.user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-medium hidden lg:block">
                    {auth.user.name}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <NavLink
                      to={`/${auth.user.role === "ADMIN" ? "admin" : "user"}/dashboard`}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 font-medium transition-all duration-200"
                    >
                      📊 Dashboard
                    </NavLink>
                    <NavLink
                      to="/user/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 font-medium transition-all duration-200"
                    >
                      👤 Profile
                    </NavLink>
                    <NavLink
                      to="/cart"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 font-medium transition-all duration-200"
                    >
                      🛒 Cart ({cart?.length || 0})
                    </NavLink>
                    <div
                      onClick={handleLogout}
                      className="flex items-center px-6 py-3 text-rose-600 hover:bg-rose-50 font-medium cursor-pointer transition-all duration-200 border-t border-gray-100 mt-1"
                    >
                      🚪 Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/signup"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </NavLink>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all"
              onClick={() => setExtendedNavBar(!extendedNavBar)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {extendedNavBar && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-2xl rounded-b-2xl p-6 space-y-4 animate-in slide-in-from-top-4">
            <NavLink
              to="/"
              onClick={() => setExtendedNavBar(false)}
              className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-blue-50 rounded-xl transition-all"
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setExtendedNavBar(false)}
              className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-emerald-50 rounded-xl transition-all"
            >
              Login
            </NavLink>
            {!auth.user && (
              <NavLink
                to="/signup"
                onClick={() => setExtendedNavBar(false)}
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 font-semibold rounded-xl text-center hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Sign Up
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
