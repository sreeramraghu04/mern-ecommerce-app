import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Authcontext";

const AdminMenu = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex items-center p-2 space-x-4">
        <div>
          <h2 className="text-lg font-semibold">{auth?.user?.name}</h2>
          <span className="flex items-center space-x-1">
            <div className="text-xs hover:underline dark:text-gray-600">
              {auth?.user?.role}
            </div>
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <li className="dark:bg-gray-100 dark:text-gray-900">
            <Link
              to="/admin/create-collection"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>create collection</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/collections"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>collections</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/create-product"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>create product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users-list"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>users list</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md"
            >
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
