import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        { name, email, password, phone, address }
      );
      if (data && data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while signing up");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-3xl text-white font-bold">👤</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Join MernMart
          </h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Create your account to start shopping premium products
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-sm transition-all duration-200 text-lg placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 shadow-sm transition-all duration-200 text-lg placeholder-gray-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Phone Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="XXXXXXXXXX"
                className="w-full pl-16 pr-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm transition-all duration-200 text-lg placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 shadow-sm transition-all duration-200 text-lg placeholder-gray-400"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Enter your complete address"
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 shadow-sm transition-all duration-200 resize-vertical text-lg placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-6 px-8 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            🚀 Create Account
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
