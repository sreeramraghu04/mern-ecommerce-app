import React, { useContext } from "react";
import Searchcontext from "../context/Searchcontext";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [search] = useContext(Searchcontext);

  return (
    <div className="min-h-screen lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text mb-6">
            Search Results
          </h1>
          <p className={search?.results?.length < 1 
            ? "text-2xl text-gray-500" 
            : "text-2xl text-emerald-600 font-semibold"
          }>
            {search?.results?.length < 1
              ? "No products found for your search"
              : `Found ${search?.results.length} perfect matches`}
          </p>
        </div>

        {search?.results?.length === 0 ? (
          <div className="text-center py-10 max-w-2xl mx-auto">
            <div className="w-32 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl text-gray-400">🔍</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nothing found</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Try searching for something else or browse our popular collections
            </p>
            <div className="space-x-4">
              <Link 
                to="/" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {search?.results?.map((item) => (
              <Link key={item._id} to={`/product/${item.slug}`} className="group">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
                  <div className="h-72 overflow-hidden relative bg-gradient-to-br from-orange-50 to-rose-50">
                    <img
                      src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{item.description?.substring(0, 80)}...</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-black text-emerald-600">₹{item.price}</span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full">
                        View Details
                      </span>
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

export default SearchPage;
