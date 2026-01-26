import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cartcontext from "../context/Cartcontext.jsx";
import { toast } from "sonner";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const { cart, setCart } = useContext(Cartcontext);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-single-product/${slug}`,
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  if (!product)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-600">
            Loading product details...
          </h2>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="group">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img
                src={`http://localhost:5000/api/v1/product/get-product-image/${product._id}`}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.shipping === "1" && (
                <div className="absolute top-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-2xl font-bold shadow-2xl">
                  Free Shipping
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-5xl font-black text-emerald-600">
                  ₹{product.price}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl font-semibold">
                  In Stock: {product.stock}
                </span>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Collection:{" "}
                <span className="font-semibold text-blue-600">
                  {product?.collection?.name}
                </span>
              </p>
            </div>

            <button
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-5 px-8 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product]),
                );
                toast.success("Product added to cart");
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
