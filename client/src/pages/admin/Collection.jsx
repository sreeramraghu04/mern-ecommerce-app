import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "sonner";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  const getAllCollection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/collection/get-all-collection",
      );
      if (data?.success) {
        setCollections(data.collection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCollection();
  }, []);

  return (
    <div className="min-h-screen py-12 lg:py-24">
      <div className="flex px-25 mt-5">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10">
          <AdminMenu />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-10 overflow-auto">
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Collections
                </h1>
                <p className="text-gray-300 mt-2">
                  Manage your product categories
                </p>
              </div>

              <Link
                to="/admin/create-collection"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl font-bold"
              >
                ➕ New Collection
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/10 border border-white/20 rounded-3xl p-8 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    📂
                  </div>
                  <h3 className="text-xl font-bold text-center">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
