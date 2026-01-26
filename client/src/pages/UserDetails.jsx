import React, { useContext } from "react";
import AuthContext from "../context/Authcontext";
import { NavLink } from "react-router-dom";

const UserDetails = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text mb-6">
            My Profile
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your account details and shopping preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Profile Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-gray-200">
            <div className="text-center mb-10">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-4xl text-white font-black">
                  {auth?.user?.name?.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {auth?.user?.name}
              </h2>
              <span className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 text-lg font-semibold rounded-2xl">
                {auth?.user?.role === "ADMIN" ? "Admin" : "Premium Customer"}
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <span className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4 text-xl">
                  📧
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">{auth?.user?.email}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <span className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mr-4 text-xl">
                  📱
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">
                    {auth?.user?.phone || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <span className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mr-4 text-xl">
                  📍
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">
                    {auth?.user?.address || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <NavLink
                  to="/user/dashboard"
                  className="group flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100"
                >
                  <span className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl mr-4 group-hover:scale-110 transition-transform">
                    📊
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      Dashboard
                    </h4>
                    <p className="text-gray-600">View orders & analytics</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/user/orders"
                  className="group flex items-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl hover:shadow-xl hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 border border-emerald-100"
                >
                  <span className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl mr-4 group-hover:scale-110 transition-transform">
                    📦
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Orders</h4>
                    <p className="text-gray-600">Track your purchases</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/cart"
                  className="group flex items-center p-6 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl hover:shadow-xl hover:from-orange-100 hover:to-rose-100 transition-all duration-300 border border-orange-100"
                >
                  <span className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl mr-4 group-hover:scale-110 transition-transform">
                    🛒
                  </span>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      Shopping Cart
                    </h4>
                    <p className="text-gray-600">Review your cart</p>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
