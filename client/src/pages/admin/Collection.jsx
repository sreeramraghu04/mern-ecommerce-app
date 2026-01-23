import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  const getAllCollection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/collection/get-all-collection",
      );

      if (data?.success) {
        setCollections(data.collection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCollection();
  }, []);

  return (
    <div className="flex">
      <AdminMenu />
      <div className="bg-red-500 p-5">
        <h1 className="text-2xl font-bold">Collections</h1>
        <div className="border p-5 w-290 bg-white">
          {collections.map((item) => (
            <div
              key={item._id}
              className="cursor-pointer p-5 border hover:bg-gray-100 mb-2"
              onClick={() => navigate(`/collection/${item.slug}`)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
