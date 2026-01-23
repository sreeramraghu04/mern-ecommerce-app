import React, { useContext, useState } from "react";
import AuthContext from "../context/Authcontext";
import { NavLink, Navigate } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { toast } from "sonner";
import { FaShoppingCart } from "react-icons/fa";
import Cartcontext from "../context/Cartcontext.jsx";
import { Avatar, Badge, Space } from "antd";

const NavBar = () => {
  const [extendedNavBar, setExtendedNavBar] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  const { cart } = useContext(Cartcontext);

  <Badge count={0} showZero>
    <Avatar shape="square" size="large"/>
  </Badge>;

  const handleLinkClick = () => {
    setExtendedNavBar(false);
  };

  const handleLinkClickUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("ecommerce");
    toast.success("successfully loggedout", { duration: 500 });
    Navigate("/");
  };

  return (
    <div>
      <header className="px-4 py-5 bg-[#0B0F1A] text-white relative border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between gap-6 md:gap-0 p-2">
          {/* Nmae & Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl md:text-4xl font-bold text-[#8B5CF6]">
              VirtuShop
            </h1>
          </div>

          {/* Navigation Links */}
          <ul
            className={`md:static md:flex-row flex flex-col md:flex items-center justify-center space-y-4 md:space-y-0 md:space-x-6 text-lg transition-all duration-300 bg-indigo-900 md:bg-transparent p-4 md:p-0 z-50 w-full md:w-2/3 ${
              extendedNavBar
                ? "absolute top-20 left-0 translate-y-0"
                : "absolute -top-[400px] left-0"
            }`}
          >
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-[#8B5CF6] border-b border-[#8B5CF6]"
                  : "flex items-center hover:text-[#22D3EE]"
              }
            >
              Home
            </NavLink>
            {!auth.user ? (
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                <NavLink
                  /* to={`/dashboard/${
                    auth.user.role==="ADMIN" ? "admin" : "user"
                  }`} */
                  to="/dashboard"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center text-[#8B5CF6] border-b border-[#8B5CF6]"
                      : "flex items-center hover:text-[#22D3EE]"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center text-[#8B5CF6] border-b border-[#8B5CF6]"
                      : "flex items-center hover:text-[#22D3EE]"
                  }
                >
                  Login
                </NavLink>

                {/* Sign-up button (shown in mobile nav) */}
                <div className="md:hidden">
                  <NavLink
                    to="/signup"
                    onClick={handleLinkClick}
                    className="inline-block text-white bg-[#8B5CF6] hover:bg-[#EC4899] px-6 py-2 font-semibold rounded-xl hover:rounded-full"
                  >
                    Sign-up
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto relative">
                {/* ✅ Username Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center hover:text-[#22D3EE] focus:outline-none"
                  >
                    {auth.user.name} ⏷
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                      <NavLink
                        to={`/${
                          auth.user.role === "ADMIN" ? "admin" : "user"
                        }/dashboard`}
                        onClick={handleLinkClickUserMenu}
                        className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/userdetails"
                        onClick={handleLinkClickUserMenu}
                        className="block px-4 py-2 hover:bg-gray-100 rounded-lg mb-2"
                      >
                        Profile
                      </NavLink>
                      {/* <NavLink to="/cart">
                        <FaShoppingCart size={28} />
                        {cart?.length}
                      </NavLink> */}
                      <Badge count={cart?.length} showZero>
                        <NavLink
                          to="/cart"
                          onClick={handleLinkClickUserMenu}
                          className="block ml-4 hover:bg-gray-100 rounded-lg"
                        >
                          <FaShoppingCart size={30} />
                        </NavLink>
                      </Badge>
                    </div>
                  )}
                </div>

                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className="hover:text-red-500 text-[#8B5CF6]"
                >
                  Logout?
                  {/* <span className="font-semibold underline underline-offset-2">
                    {auth.user.name}?
                  </span> */}
                </NavLink>
              </div>
            )}
          </ul>

          {/* Right: Sign-up button (desktop only) */}
          <div className="hidden md:block">
            {!auth.user && (
              <NavLink
                to="/signup"
                className="text-white bg-[#8B5CF6] hover:bg-[#EC4899] px-6 py-2 font-semibold rounded-xl hover:rounded-full"
              >
                Sign-up
              </NavLink>
            )}
          </div>

          {/* Hamburger icon (mobile only) */}
          <div
            className="md:hidden p-2 bg-gray-200 text-gray-600 shadow-md hover:bg-gray-100 rounded z-50"
            onClick={() => setExtendedNavBar(!extendedNavBar)}
          >
            {extendedNavBar ? <DisabledByDefaultIcon /> : <ListIcon />}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
