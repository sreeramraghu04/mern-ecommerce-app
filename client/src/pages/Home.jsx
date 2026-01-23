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

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12 sm:py-16">
      {/* Functional Overview Section */}
      <main className="w-full max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 text-[#8B5CF6]">
          Welcome to MERNMart{" "}
        </h2>

        <p className="mb-10 max-w-3xl mx-auto text-center text-[#9CA3AF] leading-relaxed px-2 text-base sm:text-lg">
          The most immersive shopping experience powered by AR, AI, and smart
          tech.
        </p>

        <div className="mt-12 flex items-center justify-center">
          <button className="bg-[#EC4899] hover:bg-[#8B5CF6] text-white px-6 py-3 rounded-xl shadow-md transition-all">
            Start Exploring
          </button>
        </div>
        {/* Total Products */}
        <div className="flex gap-5">
          <div className="p-5 w-12 h-15 bg-red-500"> {total}</div>
          <div className="m-2 p-3">
            {/* {products && products.length < total && (
              <button
                className="bg-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            )} */}
            {products.length < total && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
        {/* Collections Filtering */}
        <div className="text-red-500">
          <h1 className="mb-2 underline underline-offset-2 text-xl font-bold">
            List of available collections
          </h1>
          <div className="text-green-500">
            {/* {collection?.map((item) => {
              return (
                <div className="text-blue-500 bg-gray-500">
                  <Checkbox
                    onChange={(e) => handleFilter(e.target.checked, item._id)}
                    className="text-white"
                  >
                    {item.name}
                  </Checkbox>
                </div>
              );
            })} */}
            {collection?.map((item) => (
              <div key={item._id} className="text-blue-500 bg-gray-500">
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, item._id)}
                  className="text-white"
                >
                  {item.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <div>{JSON.stringify(checked, null, 2)}</div>
        </div>

        {/* Price Filtering */}
        <div className="text-red-500">
          <h1 className="mb-2 underline underline-offset-2 text-xl font-bold">
            Filter by prices
          </h1>
          <div className="text-green-500">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((item) => (
                <div key={item._id}>
                  <Radio value={item.arr}>{item.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>{JSON.stringify(radio, null, 2)}</div>
        </div>

        {/* Search Form */}
        <div>
          <SearchForm />
        </div>

        {/* Products */}
        <div className="grid grid-cols-3 gap-5 mt-10">
          {products.map((item) => {
            return (
              <div key={item._id}>
                <div className="bg-white hover:bg-gray-100 w-75">
                  <div className="flex flex-col justify-between items-center p-5">
                    <NavLink to={`/product/${item.slug}`}>
                      <img
                        src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                        alt="photo"
                        className="h-50 w-auto object-cover object-center bg-gray-500 border border-red-500"
                      />
                      <div className="space-y-2 mt-2">
                        <h2 className="text-3xl font-semibold tracking-wide text-red-500">
                          {item.name}
                        </h2>
                        <p className="text-gray-800">{item.description}</p>
                        <div className="flex justify-between gap-3">
                          <h1 className="text-gray-800">
                            Price : {item.price}/-
                          </h1>
                          <h1 className="text-gray-800">
                            Quantity : {item.quantity}
                          </h1>
                        </div>
                        <div className="flex justify-between">
                          <h1 className="text-gray-800">
                            stock : {item.stock}
                          </h1>
                          <h1 className="text-gray-800">sold : {item.sold}</h1>
                        </div>
                        <h2 className="text-2xl font-semibold tracking-wide">
                          {item.shipping}
                        </h2>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
