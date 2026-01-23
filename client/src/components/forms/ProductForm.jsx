import React from "react";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

function ProductForm({
  handleCreateProduct,
  collections,
  name,
  description,
  photo,
  price,
  quantity,
  stock,
  sold,
  // Add these missing setter functions
  setName,
  setDescription,
  setCollection,
  setPhoto,
  setPrice,
  setQuantity,
  setShipping,
  setStock,
  setSold,
}) {
  return (
    <div>
      <fieldset className="w-full space-y-1 dark:text-gray-400 text-2xl">
        <label className="block font-medium underline">
          {/* create a new product */}
        </label>
        <form onSubmit={handleCreateProduct}>
          <div className="bg-red-300">
            {/* Remove this Select.Option since we moved it to CreateProduct.jsx */}
            {/* <Select.Option
              placeholder="select a collection"
              size="large"
              showSearch
              onChange={(value) => {
                setCollection(value);
              }}
            >
              {collections?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select.Option> */}
            {/* <Select
              placeholder="select a collection"
              size="large"
              showSearch
              onChange={(value) => setCollection(value)}
            >
              {collections?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select> */}

            <div className="flex flex-col">
              <div className="flex flex-col">
                <label className="border px-2 py-2 bg-gray-500 cursor-pointer">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div>
                {photo && (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="productimage"
                      className="h-[200px]"
                    />
                  </div>
                )}
              </div>
              {/* <div>
                <label>
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div>
                {photo ? (
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="productimage"
                      className="h-[200px]"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={`http://localhost:5000/api/v1/product/get-product-image/${id}`}
                      alt="productimage"
                    />
                  </div>
                )}
              </div> */}

              <label className="border px-2 py-2 bg-gray-500">
                enter the name here:
                <input
                  name="name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="border px-2 py-2 bg-gray-500">
                enter the decription here:
                <textarea
                  name="description"
                  value={description}
                  rows={4}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
              <label className="border px-2 py-2 bg-gray-500">
                enter the price:
                <input
                  type="number"
                  value={price}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label className="border px-2 py-2 bg-gray-500">
                enter the quantity:
                <input
                  type="number"
                  value={quantity}
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
              <label className="border px-2 py-2 bg-gray-500">
                enter the stock:
                <input
                  name="stock"
                  value={stock}
                  type="number"
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
              <label className="border px-2 py-2 bg-gray-500">
                enter the sold:
                <input
                  name="sold"
                  value={sold}
                  type="number"
                  onChange={(e) => setSold(e.target.value)}
                />
              </label>
              <div>
                <label className="border px-2 py-2 bg-gray-500">
                  enter the shipping:
                  <Select
                    placeholder="select shipping"
                    size="large"
                    showSearch
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                    {/* <Option value={0}>No</Option>
                    <Option value={1}>Yes</Option> */}
                  </Select>
                </label>
              </div>
            </div>
            <button className="px-3 py-3 bg-green-500 text-black" type="submit">
              Add Products
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
}

export default ProductForm;
