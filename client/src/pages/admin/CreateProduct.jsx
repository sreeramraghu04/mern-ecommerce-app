import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "sonner";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import ProductForm from "../../components/forms/ProductForm";

const CreateProduct = () => {
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState("");
  const [sold, setSold] = useState("");
  const [shipping, setShipping] = useState(false);

  //! Create new product
  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate collection is selected
    if (!collection) {
      toast.error("Please select a collection first");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("collection", collection);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("stock", stock);
      productData.append("sold", sold);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("product created successfully");
        // Reset form after successful creation
        resetForm();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while creating product");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setStock("");
    setSold("");
    setPhoto("");
    setShipping(false);
    setCollection("");
  };

  useEffect(() => {
    getAllCollection();
  }, []);

  //! Fetching all collections
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/collection/get-all-collection"
      );

      if (data?.success) {
        setCollections(data?.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching collections");
    }
  };

  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

        {/* Collection Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-3">
            Select Collection: *
          </label>
          <Select
            placeholder="Select a collection"
            size="large"
            showSearch
            style={{ width: 300 }}
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
            <p className="mt-2 text-green-600">
              Selected Collection:{" "}
              <strong>
                {collections.find((c) => c._id === collection)?.name}
              </strong>
            </p>
          )}
        </div>

        {/* Product Form */}
        <ProductForm
          handleCreate={handleCreate}
          collections={collections}
          setCollection={setCollection}
          name={name}
          description={description}
          photo={photo}
          price={price}
          quantity={quantity}
          stock={stock}
          sold={sold}
          setShipping={setShipping}
          // Pass all the setter functions that the ProductForm needs
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
  );
};

export default CreateProduct;
