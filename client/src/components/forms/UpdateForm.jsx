import React from "react";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

function UpdateForm({
  updateProduct,
  collections,
  setCollection,
  name,
  id,
  description,
  photo,
  price,
  quantity,
  stock,
  sold,
  setShipping,
  // Add these missing setter functions
  setName,
  /* setId, */
  setDescription,
  setPhoto,
  setPrice,
  setQuantity,
  setStock,
  setSold,
}) {
  return (
    <div className="w-full max-w-3xl">
      <fieldset className="space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 text-gray-500">
        <form onSubmit={updateProduct} className="space-y-6">
          {/* Upload Image */}
          <div>
            <label className="block w-full px-6 py-4 border border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white/50 text-gray-600 font-medium">
              {photo ? photo.name : "Update product image"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>

            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : `http://localhost:5000/api/v1/product/get-product-image/${id}`
              }
              alt="product"
              className="mt-4 h-48 rounded-2xl object-cover shadow"
            />
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200"
          />

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="px-5 py-4 rounded-2xl border border-gray-200"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="px-5 py-4 rounded-2xl border border-gray-200"
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="px-5 py-4 rounded-2xl border border-gray-200"
            />
            <input
              type="number"
              value={sold}
              onChange={(e) => setSold(e.target.value)}
              placeholder="Sold"
              className="px-5 py-4 rounded-2xl border border-gray-200"
            />
          </div>

          <Select
            placeholder="Shipping available?"
            size="large"
            onChange={(value) => setShipping(value)}
            className="w-full"
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>

          <button
            type="submit"
            className="w-full py-4 bg-blue-500 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-600 hover:shadow-xl transition mt-5"
          >
            Update Product
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default UpdateForm;
