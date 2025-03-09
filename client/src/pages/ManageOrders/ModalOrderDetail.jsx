import React, { forwardRef } from "react";

const ModalOrderDetail = forwardRef(({ order }, ref) => {
  if (!order || Object.keys(order).length === 0) return null;

  console.log("afaskfas", order);

  return (
    <dialog
      ref={ref}
      id="orderDetailsModal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Order Details</h3>

        {/* Products Table */}
        <h4 className="font-semibold mb-2 mt-4">Products</h4>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Unit Price</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.products?.length > 0 ? (
                order.products.map((item, index) => {
                  const product = item.productId || {};
                  return (
                    <tr key={index} className="border">
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2 text-center">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name || "Unknown Product"}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="p-2">{product.name || "No Name"}</td>
                      <td className="p-2 text-center">
                        ฿
                        {product.price
                          ? product.price.toLocaleString()
                          : "0.00"}
                      </td>
                      <td className="p-2 text-center">
                        {item.quantity || "0"}
                      </td>
                      <td className="p-2 text-center">
                        ฿
                        {(
                          (product.price || 0) * (item.quantity || 0)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h4 className="font-semibold mt-4">
          Total: ฿{order.total ? order.total.toFixed(2) : "0.00"}
        </h4>

        {/* Shipping Details */}
        <h4 className="font-semibold mt-4">Shipping Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Name:</strong> {order.shipping?.name || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {order.shipping?.phone || "+66"}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {order.shipping?.address?.line1 ?? "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>City:</strong> {order.shipping?.address?.city ?? "N/A"}
            </p>
            <p>
              <strong>Country:</strong>{" "}
              {order.shipping?.address?.country ?? "N/A"}
            </p>
            <p>
              <strong>Postal Code:</strong>{" "}
              {order.shipping?.address?.postal_code ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="modal-action text-center">
          <button
            className="btn bg-rose-700 hover:bg-red text-white"
            onClick={() => ref.current?.close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ModalOrderDetail;
