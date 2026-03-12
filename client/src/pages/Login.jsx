import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/Authcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        },
      );
      /* if (data && data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem("ecommerce", JSON.stringify(data));

        navigate(location.state || "/home");

        console.log(data);
      }
    } */
      // inside handleSubmit success block
      if (data && data.success) {
        toast.success(data.message);

        // save auth data
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem("ecommerce", JSON.stringify(data));

        // ✅ Check if user was trying to access dashboard before
        if (location.state?.from === "/dashboard") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true }); // normal login → home
        }
      }
    } catch (error) {
      console.log(`something went wrong while loging in ${error}`);
      toast.error(`something went wrong while loging in`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your MernMart account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-sm transition-all duration-200 text-lg"
              placeholder="yourmail@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-sm transition-all duration-200 text-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-8 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
