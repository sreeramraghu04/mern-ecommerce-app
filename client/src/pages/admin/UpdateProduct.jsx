import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import UpdateForm from "../../components/forms/UpdateForm";
import { Select } from "antd";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = useParams();
  const [collection, setCollection] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collections, setCollections] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [stock, setStock] = useState("");
  const [sold, setSold] = useState("");
  const [id, setId] = useState("");

  //! Update product
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("stock", stock);
      productData.append("sold", sold);
      productData.append("collection", collection);

      if (photo) productData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
        productData,
      );

      if (data.success) {
        toast.success("Product updated successfully");
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  //! get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-single-product/${slug}`,
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setSold(data.product.sold);
      setStock(data.product.stock);
      setCollection(data.product.collection._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting single product");
    }
  };

  //! Fetching all collections
  const getAllCollections = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/collection/get-collection",
    );
    if (data.success) {
      setCollections(data.collection);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCollections();
  }, [params, slug]);

  return (
    <div className="min-h-screen py-12 lg:py-24">
      <div className="flex px-25 mt-5">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10">
          <AdminMenu />
        </div>

        {/* Content */}
        <div className="flex-1 p-10 overflow-auto text-white">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Update Product
            </h1>
            <p className="text-gray-400 mt-2">
              Modify existing product details
            </p>
          </div>

          {/* Collection Card */}
          <div>
            <label className="block text-lg font-bold mb-4 text-gray-600">
              Manage Product Collection
            </label>

            <Select
              placeholder="Select a collection"
              size="large"
              showSearch
              style={{ width: 320 }}
              onChange={(value) => setCollection(value)}
              value={collection}
              required
            >
              {collections?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>

            {collection && (
              <p className="mt-4 text-emerald-300 font-medium">
                Selected: {collections.find((c) => c._id === collection)?.name}
              </p>
            )}
          </div>

          {/* Update Form Card */}
          <div className="bg-white/10 border border-white/20 rounded-3xl mt-12">
            <UpdateForm
              updateProduct={updateProduct}
              id={id}
              collections={collections}
              name={name}
              description={description}
              photo={photo}
              price={price}
              quantity={quantity}
              stock={stock}
              sold={sold}
              setCollection={setCollection}
              setShipping={setShipping}
              setName={setName}
              setDescription={setDescription}
              setPhoto={setPhoto}
              setPrice={setPrice}
              setQuantity={setQuantity}
              setStock={setStock}
              setSold={setSold}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
