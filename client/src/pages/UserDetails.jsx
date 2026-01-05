import React, { useContext } from "react";
import AuthContext from "../context/Authcontext";

const UserDetails = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <div className="min-h-[78vh] bg-[#0B0F1A] text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12 sm:py-16">
      {/* Functional Overview Section */}
      <main className="w-full max-w-7xl">
        <div className="bg-white shadow-xl rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-xl mx-auto mt-10 border border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            👤 Signed User Details
          </h1>
          <pre className="bg-indigo-100 text-sm sm:text-base text-gray-700 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(auth, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
