import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AdminMenu from "../../components/AdminMenu";

const Product = () => {
  const [products, setProducts] = useState([]);

  //! Fetching all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/get-all-products",
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  //! Delete product
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/product/delete-product/${id}`,
      );
      if (data?.success) {
        toast.success("product has been deleted successfully");
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting products");
    }
  };

  useEffect(() => {
    getAllProducts();
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
          <div className="">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  Products ({products.length})
                </h1>
                <p className="text-gray-300">Manage all your store products</p>
              </div>
              <Link
                to="/admin/create-product"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all"
              >
                ➕ Add Product
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-5"
                >
                  {/* Image */}
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-xl text-sm font-semibold">
                      {item.shipping === "1"
                        ? "Free Shipping"
                        : "Standard Shipping"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-2">
                      {item.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 text-sm  py-3 rounded-2xl">
                      <div className="space-y-1 text-gray-500">
                        <div>
                          <span className="font-semibold">Stock:</span>{" "}
                          {item.stock}
                        </div>
                        <div>
                          <span className="font-semibold">Shipping:</span>{" "}
                          {item.shipping === "1" ? "Yes" : "No"}
                        </div>
                      </div>

                      <div className="space-y-1 text-gray-500 text-right">
                        <div>
                          <span className="font-semibold">Qty:</span>{" "}
                          {item.quantity}
                        </div>
                        <div>
                          <span className="font-semibold">Sold:</span>{" "}
                          {item.sold}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <span className="inline-block px-6 py-2 text-2xl font-extrabold text-white rounded-2xl bg-green-400 shadow-lg">
                        ₹{item.price}/-
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2 text-center">
                      <Link
                        to={`/admin/update-product/${item.slug}`}
                        className="flex-1 text-white font-bold py-2 rounded-2xl bg-orange-400 hover:bg-orange-500 shadow-md transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="flex-1 text-white font-bold py-2 rounded-2xl bg-red-500 hover:bg-red-600 shadow-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
