import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCollections: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, collectionsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/v1/product/product-count"),
        axios.get("http://localhost:5000/api/v1/collection/get-all-collection"),
      ]);
      setStats({
        totalProducts: productsRes.data?.total || 0,
        totalCollections: collectionsRes.data?.collection?.length || 0,
        totalUsers: 25, // Mock for now
        totalOrders: 156, // Mock for now
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen py-12 lg:py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 mt-2">
                Welcome back, {auth?.user?.name}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">
                Role: {auth?.user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex px-25 mt-5">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/admin/products" className="group">
              <div className="bg-gradient-to-br from-blue-500/50 to-blue-600/20 border border-blue-500/30 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group-hover:bg-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Products
                    </p>
                    <p className="text-4xl font-black text-blue-800 mt-2">
                      {stats.totalProducts}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/40 transition-all">
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/admin/collections" className="group">
              <div className="bg-gradient-to-br from-emerald-500/80 to-emerald-600/20 border border-emerald-500/30 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group-hover:bg-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">
                      Collections
                    </p>
                    <p className="text-4xl font-black text-emerald-800 mt-2">
                      {stats.totalCollections}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/40 transition-all">
                    <span className="text-2xl">📂</span>
                  </div>
                </div>
              </div>
            </Link>
            {/* //! work code for total users */}
            <div className="group">
              <div className="bg-gradient-to-br from-purple-500/80 to-purple-600/20 border border-purple-500/30 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group-hover:bg-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Total Users
                    </p>
                    <p className="text-4xl font-black text-purple-800 mt-2">
                      {stats.totalUsers}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/40 transition-all">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
            </div>
            {/* //! work code for total orders */}
            <div className="group">
              <div className="bg-gradient-to-br from-orange-500/80 to-orange-600/20 border border-orange-500/30 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group-hover:bg-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">
                      Total Orders
                    </p>
                    <p className="text-4xl font-black text-orange-800 mt-2">
                      {stats.totalOrders}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center group-hover:bg-orange-500/40 transition-all">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/admin/create-product" className="group">
              <div className="bg-gray-500 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] hover:bg-gray-400 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ➕ Create Product
                </h3>
                <p className="text-gray-300">Add new product to your store</p>
              </div>
            </Link>
            <Link to="/admin/create-collection" className="group">
              <div className="bg-gray-500 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] hover:bg-gray-400 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  📁 New Collection
                </h3>
                <p className="text-gray-300">Create product category</p>
              </div>
            </Link>
            <Link to="/admin/users" className="group">
              <div className="bg-gray-500 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:shadow-2xl hover:scale-[1.02] hover:bg-gray-400 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  👨‍💼 Manage Users
                </h3>
                <p className="text-gray-300">View & manage customers</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
