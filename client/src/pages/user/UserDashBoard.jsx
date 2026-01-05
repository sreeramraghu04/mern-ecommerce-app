import React, { useContext } from "react";
import AuthContext from "../../context/Authcontext";
import UserMenu from "../../components/UserMenu";

const UserDashBoard = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-6 mt-10">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-[#1E293B] p-6 rounded-2xl shadow-md mb-6 border">
          <h2 className="text-2xl font-bold text-[#8B5CF6]">
            Welcome, {auth?.user?.name || "Guest"} 👋
          </h2>
          <p className="mt-2 text-gray-300">
            Panel:{" "}
            <span className="font-semibold text-[#22D3EE]">
              {auth?.user?.role}
            </span>
          </p>
        </div>
        <div className="border">
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
