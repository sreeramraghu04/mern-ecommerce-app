import React, { useContext } from "react";
import Searchcontext from "../../context/Searchcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [values, setValues] = useContext(Searchcontext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/search/${values.keyword}`,
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto lg:pt-30 lg:pb-20">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-2"
      >
        <input
          type="search"
          placeholder="Search products, brands..."
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          className="flex-1 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 bg-transparent outline-none rounded-2xl focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="px-8 py-4 text-white font-bold rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
