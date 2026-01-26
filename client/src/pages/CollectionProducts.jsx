import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CollectionProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductsByCollection = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/products-by-collection/${slug}`
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsByCollection();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-600">Loading collection...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text mb-6">
            Collection Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium products from this exclusive collection
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <span className="text-3xl text-gray-400">📦</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No products found</h2>
            <p className="text-lg text-gray-600 mb-8">This collection is currently empty</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-3xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              ← Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item) => (
              <Link key={item._id} to={`/product/${item.slug}`} className="group">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-3">
                  <div className="h-72 overflow-hidden relative group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50">
                    <img
                      src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t">
                      <span className="text-3xl font-black text-emerald-600">₹{item.price}</span>
                      <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionProducts;
