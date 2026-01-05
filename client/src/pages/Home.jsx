import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [collection, setCollection] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //! fetching all collections
  const getAllCollections = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/collection/get-all-collection"
      );
      if (data?.success) {
        setCollection(data?.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching collections");
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);
  /* console.log(collection); */

  //! fethcing all products
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

  //! collection filtering
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  /* useEffect(() => {
    getAllProducts();
  }, []); */

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //! get all filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filter",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
      console.log("data", data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12 sm:py-16">
      {/* Functional Overview Section */}
      <main className="w-full max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 text-[#8B5CF6]">
          Welcome to ShopVerse{" "}
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

        {/* Collections Filtering */}
        <div className="text-red-500">
          <h1 className="mb-2 underline underline-offset-2 text-xl font-bold">
            List of available collections
          </h1>
          <div className="text-green-500">
            {collection?.map((item) => {
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
            })}
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

        {/* Products */}
        <div className="grid grid-cols-3 mt-10">
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
