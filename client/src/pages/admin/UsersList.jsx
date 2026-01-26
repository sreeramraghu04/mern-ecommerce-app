import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "sonner";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock API call - replace with your actual users endpoint
      const mockUsers = [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "USER",
          phone: "+919876543210",
          created: "2026-01-15",
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "USER",
          phone: "+919812345678",
          created: "2026-01-20",
        },
        {
          _id: "3",
          name: "Admin User",
          email: "admin@mern.com",
          role: "ADMIN",
          phone: "+919800000000",
          created: "2025-12-01",
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 lg:py-24">
      <div className="flex px-25 mt-5">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10">
          <AdminMenu />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-10 overflow-auto">
          {/* //! want to code users details */}
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Users ({users.length})
                </h1>
                <p className="text-gray-300">Manage your platform customers</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-8 py-6 text-left text-gray-200 font-bold">
                        Name
                      </th>
                      <th className="px-8 py-6 text-left text-gray-200 font-bold">
                        Email
                      </th>
                      <th className="px-8 py-6 text-left text-gray-200 font-bold">
                        Role
                      </th>
                      <th className="px-8 py-6 text-left text-gray-200 font-bold">
                        Phone
                      </th>
                      <th className="px-8 py-6 text-left text-gray-200 font-bold">
                        Joined
                      </th>
                      <th className="px-8 py-6 text-left text-gray-200 font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-t border-white/10 hover:bg-white/10 transition-all"
                      >
                        <td className="px-8 py-6 font-bold text-white flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                            {user.name.slice(0, 2).toUpperCase()}
                          </div>
                          {user.name}
                        </td>
                        <td className="px-8 py-6 text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`px-4 py-2 rounded-2xl font-bold ${
                              user.role === "ADMIN"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-gray-400">
                          {user.phone}
                        </td>
                        <td className="px-8 py-6 text-gray-400">
                          {user.created}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                              View
                            </button>
                            <button className="px-4 py-2 bg-yellow-500/80 hover:bg-yellow-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
