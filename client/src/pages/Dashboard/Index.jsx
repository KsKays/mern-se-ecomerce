import React from "react";
import { Link } from "react-router";
import {
  FaBox,
  FaClipboardList,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";

const Index = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 my-5 w-full px-4 text-black">
      {/* Add Product Card */}
      <div className="group relative bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <div className="absolute top-4 right-4 text-gray-500 group-hover:text-blue-500 transition">
          <FaBox size={24} />
        </div>
        <div className="card-body">
          <h2 className="text-xl font-bold">Add a new Product</h2>
          <p className="text-gray-600">
            Add a new product to be displayed on the shop.
          </p>
          <div className="mt-4">
            <Link
              to="/dashboard/Add-Product"
              className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>

      {/* Manage Items Card */}
      <div className="group relative bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <div className="absolute top-4 right-4 text-gray-500 group-hover:text-yellow-500 transition">
          <FaClipboardList size={24} />
        </div>
        <div className="card-body">
          <h2 className="text-xl font-bold">Manage Items</h2>
          <p className="text-gray-600">
            View, edit, and delete products in the store.
          </p>
          <div className="mt-4">
            <Link
              to="/dashboard/Manage-items"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-full"
            >
              Manage Items
            </Link>
          </div>
        </div>
      </div>

      {/* Manage Users Card */}
      <div className="group relative bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <div className="absolute top-4 right-4 text-gray-500 group-hover:text-red-500 transition">
          <FaUsers size={24} />
        </div>
        <div className="card-body">
          <h2 className="text-xl font-bold">Manage Users</h2>
          <p className="text-gray-600">
            View and manage users signed up to the store.
          </p>
          <div className="mt-4">
            <Link
              to="/dashboard/User-manage"
              className="btn bg-red-500 hover:bg-red-600 text-white w-full"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </div>

      {/* Manage Orders Card */}
      <div className="group relative bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <div className="absolute top-4 right-4 text-gray-500 group-hover:text-green-500 transition">
          <FaShoppingCart size={24} />
        </div>
        <div className="card-body">
          <h2 className="text-xl font-bold">Manage Orders</h2>
          <p className="text-gray-600">
            View and manage orders placed by customers.
          </p>
          <div className="mt-4">
            <Link
              to="/dashboard/Manage-orders"
              className="btn bg-green-500 hover:bg-green-600 text-white w-full"
            >
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
