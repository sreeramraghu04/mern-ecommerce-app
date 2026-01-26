import React, { useContext, useState } from "react";
import AuthContext from "../../context/Authcontext";
import UserMenu from "../../components/UserMenu";
import { toast } from "sonner";

const ProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = auth?.user;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Update logic here
    setTimeout(() => {
      setLoading(false);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 sticky top-24 hidden lg:block">
          <UserMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className=" w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-4">
                <span className="text-4xl font-black text-white">
                  {user?.name?.slice(0, 2).toUpperCase() || "UN"}
                </span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">
                {user?.name || "User Name"}
              </h1>
              <span className="inline-block px-6 py-2 rounded-3xl font-bold bg-emerald-500/30 text-white">
                {user?.role === "ADMIN" ? "Admin" : "Premium Customer"}
              </span>
            </div>

            {/* Profile Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {["Full Name", "Email", "Phone"].map((label, idx) => (
                  <div key={idx}>
                    <label className="block text-lg font-semibold">
                      {label}
                    </label>
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/30">
                      {editMode ? (
                        <input
                          type={label === "Email" ? "email" : "text"}
                          defaultValue={
                            label === "Full Name"
                              ? user?.name
                              : label === "Email"
                                ? user?.email
                                : user?.phone
                          }
                          className="w-full bg-transparent text-white focus:outline-none font-medium"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {label === "Full Name"
                            ? user?.name
                            : label === "Email"
                              ? user?.email
                              : user?.phone || "Not Set"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <label className="block text-lg font-semibold">Address</label>
                <div className="p-6 rounded-2xl bg-white/10 border border-white/30 min-h-[120px]">
                  {editMode ? (
                    <textarea
                      defaultValue={user?.address}
                      rows={4}
                      className="w-full bg-transparent text-white focus:outline-none resize-vertical"
                    />
                  ) : (
                    <span className="text-white">
                      {user?.address || "Not Set"}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 pt-4">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="w-full py-4 rounded-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl hover:scale-105 transition-all"
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                  {editMode && (
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="w-full py-4 rounded-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
