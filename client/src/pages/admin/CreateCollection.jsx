import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import CollectionForm from "../../components/forms/CollectionForm";
import { Button, Modal } from "antd";

const CreateCollection = () => {
  const [collection, setCollection] = useState([]);

  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updatedname, setUpdatedname] = useState("");

  const [selected, setSelected] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/collection/create-collection",
        { name },
      );
      if (data?.success) {
        toast.success(`new collection ${name} have been created successfully`);
        getAllCollection();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while adding collection");
    }
  };

  //! Fetching all collections
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/collection/get-all-collection",
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
    getAllCollection();
  }, []);

  //! Delete a collection
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/collection/delete-collection/${id}`,
      );

      if (data?.success) {
        toast.success("collection has been deleted successfully");
        getAllCollection();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the collections");
    }
  };

  //! Edit and Update a collection
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/collection/update-collection/${selected._id}`,
        { name: updatedname },
      );
      if (data?.success) {
        toast.success(
          `new collection ${updatedname} have been updated successfully`,
        );
        setSelected(null);
        setUpdatedname("");
        handleCancel();
        getAllCollection();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the collections");
    }
  };

  return (
    <div className="min-h-screen py-12 lg:py-24">
      <div className="flex px-25 mt-5">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10">
          <AdminMenu />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-10 overflow-auto">
          <div>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Manage Collections
              </h1>
              <p className="text-gray-300 mt-2">
                Create, edit and delete collections
              </p>
            </div>

            {/* Create Card */}
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">
                ➕ Create New Collection
              </h3>
              <CollectionForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                label="Enter collection name"
              />
            </div>

            {/* Table Card */}
            <div className="bg-white/10 border border-white/20 rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-white/20">
                <h3 className="text-2xl font-bold">
                  All Collections ({collection.length})
                </h3>
              </div>

              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-8 py-6 text-left">#</th>
                    <th className="px-8 py-6 text-left">Name</th>
                    <th className="px-8 py-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collection.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-t border-white/10 hover:bg-white/10"
                    >
                      <td className="px-8 py-6 text-gray-400">{index + 1}</td>
                      <td className="px-8 py-6 font-bold">{item.name}</td>
                      <td className="px-8 py-6 flex gap-3">
                        <button className="px-5 py-2 bg-blue-500/80 rounded-xl font-bold">
                          ✏️ Edit
                        </button>
                        <button className="px-5 py-2 bg-red-500/80 rounded-xl font-bold">
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
