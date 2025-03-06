import { useState, useEffect } from "react";
import OrderService from "../../services/order.service";
import Swal from "sweetalert2";
import ModalOrderDetail from "../../components/ModalOrderDetail";

import { RiDeleteBin7Fill } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";

const Index = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    OrderService.getAllOrder()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleDelete = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate deletion (API call to delete order can be added here)
        setOrders(orders.filter((order) => order.id !== orderId));
        Swal.fire("Deleted!", "Order has been removed.", "success");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Manage Orders
      </h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Payment Status</th>
              <th className="border p-3">Delivery Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 justify-center items-center text-center"
              >
                <td className="border p-3">{order._id}</td>
                <td className="border p-3">{order.email}</td>
                <td className="border p-3">${order.total}</td>
                <td className="border p-3 badge badge-warning">
                  {order.payment_status}
                </td>
                <td className="border p-3">{order.delivery_status}</td>
                <td className="border p-3 text-center">
                  <div className="flex justify-center space-x-2">
                    {/* <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => alert(`Viewing Order: ${order.id}`)}
                    >
                      <LuLayoutList />
                    </button> */}
                    <ModalOrderDetail />
                    <button
                      className="bg-emerald-800 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(order.id)}
                    >
                      <RiDeleteBin7Fill />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
