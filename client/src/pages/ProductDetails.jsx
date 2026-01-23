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

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="bg-red-500 p-5">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <div className="border p-5 bg-white">
        <img
          src={`http://localhost:5000/api/v1/product/get-product-image/${product._id}`}
          alt={product.name}
        />

        <h4>Name: {product.name}</h4>
        <p>Description: {product.description}</p>
        <h5>Price: ₹ {product.price}</h5>
        <h6>Collection: {product?.collection?.name}</h6>

        <button
          className="bg-green-500 p-3 mt-3 cursor-pointer hover:bg-green-600"
          onClick={() => {
            setCart([...cart, product]);
            localStorage.setItem("cart", JSON.stringify([...cart, product]));
            toast.success("Product added to cart");
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
