import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import SearchForm from "../components/forms/SearchForm";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [collection, setCollection] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  //! fetching all collections
  const getAllCollections = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/collection/get-all-collection",
      );
      if (data?.success) {
        setCollection(data?.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching collections");
    }
  };

  /* useEffect(() => {
    getAllCollections();
  }, []); */
  /* console.log(collection); */

  //! fethcing all products
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

  /* //! fethcing all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }; */

  /* useEffect(() => {
    getAllProducts();
  }, []); */

  /* useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]); */

  //! fetching total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/product-count",
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting total products count");
    }
  };

  //! filtering the products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filter",
        {
          checked,
          radio,
        },
      );
      setProducts(data?.products);
      console.log("data", data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCollections();
    /* getAllProducts(); */
    getTotal();
    loadMore(); //* page = 1
  }, []);

  /* useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]); */

  //! load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`,
      );
      setLoading(false);
      /* setProducts([...products, ...data?.products]); */
      setProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //! product filtering
  /* const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  }; */
  const handleFilter = (value, id) => {
    setChecked((prev) =>
      value ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden py-28 lg:py-50">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Soft background glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          {/* Brand */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            MernMart
          </h1>

          {/* Tagline */}
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-200 leading-relaxed mb-14">
            Discover premium products, seamless shopping, and fast delivery —
            all in one modern marketplace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#products"
              className="px-12 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Shop Now
            </a>

            <NavLink
              to="/searchproducts"
              className="px-12 py-5 rounded-2xl font-bold text-lg
        bg-white/10 backdrop-blur-md border border-white/30 text-white
        hover:bg-white hover:text-gray-900 hover:scale-105 transition-all"
            >
              Explore Products
            </NavLink>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-24">
        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
          <div id="products">
            <div className="text-4xl font-black text-blue-600 mb-2">
              {total}
            </div>
            <div className="text-gray-600 font-semibold">Products</div>
          </div>
          <div>
            <div className="text-4xl font-black text-emerald-600 mb-2">24h</div>
            <div className="text-gray-600 font-semibold">Fast Delivery</div>
          </div>
          <div>
            <div className="text-4xl font-black text-purple-600 mb-2">100%</div>
            <div className="text-gray-600 font-semibold">Secure</div>
          </div>
          <div>
            <div className="text-4xl font-black text-orange-600 mb-2">₹0</div>
            <div className="text-gray-600 font-semibold">Free Shipping</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl sticky top-24 h-115">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Filters</h3>

            {/* Collections */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-900 flex items-center">
                📂 Collections
              </h4>
              <div className="space-y-3 max-h-64">
                {collection?.map((item) => (
                  <Checkbox
                    key={item._id}
                    onChange={(e) => handleFilter(e.target.checked, item._id)}
                    className="text-lg transform hover:scale-105 transition-all"
                  >
                    <span className="ml-3 text-gray-700 font-medium">
                      {item.name}
                    </span>
                  </Checkbox>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-900 flex items-center">
                💰 Price Range
              </h4>
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="space-y-2"
              >
                {Prices?.map((item) => (
                  <div key={item._id}>
                    <Radio
                      value={item.arr}
                      className="text-lg transform hover:scale-105 transition-all"
                    >
                      <span className="ml-3">{item.name}</span>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Load More */}
            {products.length < total && (
              <div className="text-center mb-12">
                <button
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg rounded-3xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Loading...
                    </>
                  ) : (
                    "Load More Products"
                  )}
                </button>
              </div>
            )}

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => (
                <NavLink
                  key={item._id}
                  to={`/product/${item.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 p-2">
                    <div className="h-50 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50">
                      <img
                        src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 border-b border-gray-200"
                        onError={(e) =>
                          (e.target.src = "/api/placeholder/400/300")
                        }
                      />
                      {item.shipping === "1" && (
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          Free Shipping
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                        <div>Qty: {item.quantity}</div>
                        <div>Stock: {item.stock}</div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-emerald-600">
                            ₹{item.price}/-
                          </span>
                          <span className="text-xs bg-gray-100 px-1 py-1 rounded-full text-gray-600 font-medium">
                            {item.sold} sold
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
