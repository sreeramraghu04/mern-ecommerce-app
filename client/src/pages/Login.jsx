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
        }
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
    <div className="min-h-[78vh] flex items-center justify-center bg-[#0B0F1A] text-white px-4 sm:px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#161e35] p-6 sm:p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#8B5CF6]">
          Login to Your Account
        </h2>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium text-sm sm:text-base">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="yourmail@example.com"
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-md bg-[#1F1147] border border-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-medium text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-md bg-[#1F1147] border border-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] text-sm sm:text-base"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#8B5CF6] hover:bg-[#EC4899] transition text-white py-2.5 rounded-md font-semibold text-sm sm:text-base mt-3"
        >
          Login
        </button>

        {/* Optional: Forgot Password Link */}
        {/* 
        <p className="text-center text-xs sm:text-sm text-gray-400">
          <a href="/forgot-password" className="hover:text-indigo-400">
            Forgot your password?
          </a>
        </p> 
        */}
      </form>
    </div>
  );
};

export default Login;
