import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CollectionProducts = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);

  const getProductsByCollection = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/products-by-collection/${slug}`,
      );

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsByCollection();
  }, [slug]);

  return (
    <div className="bg-green-300">
      <h2>Products</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.map((item) => (
        <div key={item._id} className="border p-2 mb-2">
          <Link to={`/product/${item.slug}`}>
            <h4 className="cursor-pointer text-blue-700">{item.name}</h4>
          </Link>

          <p>₹ {item.price}</p>

          <Link to={`/product/${item.slug}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollectionProducts;
