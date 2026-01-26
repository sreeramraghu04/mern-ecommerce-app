import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Authcontext";

const AdminMenu = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="h-full w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-2xl p-6 space-y-4 rounded-2xl">
      {/* Profile Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
          {auth?.user?.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-900">
            {auth?.user?.name}
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {auth?.user?.role}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        <Link
          to="/admin/create-collection"
          className="flex items-center p-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
            ➕
          </div>
          <span>Create Collection</span>
        </Link>
        <Link
          to="/admin/collections"
          className="flex items-center p-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
            📂
          </div>
          <span>Collections</span>
        </Link>
        <Link
          to="/admin/create-product"
          className="flex items-center p-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
            🛍️
          </div>
          <span>Create Product</span>
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center p-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
            📦
          </div>
          <span>Products</span>
        </Link>
        <Link
          to="/admin/users-list"
          className="flex items-center p-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-rose-200 transition-colors">
            👥
          </div>
          <span>Users List</span>
        </Link>
      </div>
      {/* //! want to code settings/logout */}
      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:text-gray-900">
          ⚙️ Settings
        </button>
        <button className="w-full flex items-center p-4 text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-all duration-200 mt-2">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
