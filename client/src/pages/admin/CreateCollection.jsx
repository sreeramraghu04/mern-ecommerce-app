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
        { name }
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
        "http://localhost:5000/api/v1/collection/get-all-collection"
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
        `http://localhost:5000/api/v1/collection/delete-collection/${id}`
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
        { name: updatedname }
      );
      if (data?.success) {
        toast.success(
          `new collection ${updatedname} have been updated successfully`
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
    <div className="flex">
      <AdminMenu />
      <div className="w-full">
        <div>
          <CollectionForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="container p-2 mx-auto sm:p-4">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-gray-400 underline">
            Collections
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-sm text-left whitespace-nowrap border rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-gray-700">Name</th>
                  <th className="p-3 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {collection.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-900 transition"
                  >
                    <td className="px-3 py-2 font-medium text-gray-400">
                      {item.name}
                    </td>
                    <td className="px-3 py-2 flex gap-3">
                      <button
                        onClick={() => {
                          showModal();
                          setUpdatedname(item.name);
                          setSelected(item);
                        }}
                        className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            title="want to edit?"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <CollectionForm
              handleSubmit={handleUpdate}
              value={updatedname}
              setValue={setUpdatedname}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
