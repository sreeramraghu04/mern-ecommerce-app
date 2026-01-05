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
        "http://localhost:5000/api/v1/product/get-all-products"
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //! Delete a collection
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/product/delete-product/${id}`
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

  return (
    <div className="flex">
      <AdminMenu />
      <div>
        <h1 className="bg-red-500">Products</h1>
        <div className="flex">
          {products.map((item) => {
            return (
              <div key={item._id}>
                <div className="max-w-xs bg-gray-50 text-gray-800">
                  <div className="flex flex-col justify-between p-6 space-y-8">
                    <img
                      src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                      alt="photo"
                      className="h-60 w-auto object-cover object-center bg-gray-500"
                    />
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold tracking-wide">
                        {item.name}
                      </h2>
                      <p className="text-gray-800">{item.description}</p>
                      <div className="flex justify-between">
                        <h1 className="text-gray-800">Price : {item.price}</h1>
                        <h1 className="text-gray-800">
                          Quantity : {item.quantity}
                        </h1>
                      </div>
                      <div className="flex justify-between">
                        <h1 className="text-gray-800">stock : {item.stock}</h1>
                        <h1 className="text-gray-800">sold : {item.sold}</h1>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-wide">
                        {item.shipping}
                      </h2>
                    </div>
                    <div className="flex gap-3 justify-between">
                      <Link
                        to={`/admin/update-product/${item.slug}`}
                        className="flex items-center justify-center w-full tracking-wide bg-yellow-600 text-gray-50"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => {
                          deleteProduct(item._id);
                        }}
                        className="flex items-center justify-center w-full tracking-wide cursor-pointer bg-red-600 text-gray-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
