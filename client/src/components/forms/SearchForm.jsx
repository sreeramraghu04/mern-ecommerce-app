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
        `http://localhost:5000/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search here..."
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button type="submit">search</button>
      </form>
    </div>
  );
};

export default SearchForm;
