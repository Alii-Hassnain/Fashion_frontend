import { CommonHeading } from "../components";
import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrder,
} from "../components/Admin/Services/OrderServices";

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  console.log("order is  :", orders);
  const handleCancelOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { status: "Cancelled" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStepClass = (orderStatus, step) => {
    const statusSteps = ["Processing", "Completed", "Cancelled"];
    const currentIndex = statusSteps.indexOf(orderStatus);
    const stepIndex = statusSteps.indexOf(step);
    if (orderStatus === "Cancelled") {
      return " step step-error "; 
    }
    return stepIndex <= currentIndex ? "step step-primary" : "step";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CommonHeading title={"My Orders"} />

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-6 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-600">
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </p>
              <p className="text-gray-600">Total: PKR {order.total}</p>

              <ul className="steps my-4 flex gap-x-3">
                <li className={getStepClass(order.status, "Processing")}>
                  Processing
                </li>
                <li className={getStepClass(order.status, "Completed")}>
                  Completed
                </li>
                <li className={getStepClass(order.status, "Cancelled")}>
                  Cancelled
                </li>
              </ul>

              {order.status === "Processing" && (
                <button
                  className="btn btn-error text-white mt-3"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}

           
              <ul className="mt-2 text-gray-600">
                {order.cartItems.map((item) => (
                  <li key={item.id}>
                    {item.productId.title} ({item.quantity})
                  </li>
                ))}
              </ul>

              {order.status === "Cancelled" && (
                <p className="text-red-500 font-semibold mt-2">
                  Order Cancelled
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
