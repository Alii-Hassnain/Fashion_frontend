import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders, updateOrder } from "./Services/OrderServices";

const OrderTable = ({ filter = "all" }) => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedCart, setUpdatedCart] = useState([]);
  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // console.log("Original Orders:", orders);
  // console.log("Current Filter:", filter);

  const filteredOrders = filter
    ? orders.filter((order) => {
        if (filter === "all") return true;
        // if (filter === "active") return order.status === "Processing";
        if (filter === "completed") return order.status === "Completed";
        if (filter === "active")
          return ["Pending", "Processing", "Shipped", "Delivered"].includes(order.status);
        if (filter === "cancelled") return order.status === "Cancelled";
        return true;
      })
    : orders;

  //console.log("Filtered Orders:", filteredOrders);

  const openModal = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setUpdatedCart(order.cartItems.map((item) => ({ ...item })));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    // fetchOrders()
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };
  const handleQuantityChange = (index, quantity) => {
    setUpdatedCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const saveChanges = async () => {
    if (!selectedOrder) return;

    try {
      const updatedOrder = await updateOrder(selectedOrder._id, {
        status: updatedStatus,
        // cartItems: updatedCart,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? {
                ...order,
                status: updatedOrder.status,
                // cartItems: updatedOrder.cartItems,
              }
            : order
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { status: "Cancelled" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  // const saveChanges = () => {
  //   const updatedOrders = orders.map((order) =>
  //     order._id === selectedOrder._id ? { ...order, status: updatedStatus } : order
  //   );
  //   setOrders(updatedOrders);
  //   closeModal();
  // };
  // const handleDeleteOrder = (orderId) => {
  //   const updatedOrders = orders.map((order) =>
  //     order._id === orderId ? { ...order, status: "Cancelled" } : order
  //   );
  //   setOrders(updatedOrders);
  // };
  //  console.log("selected order is :",selectedOrder)
  return (
    <div>
      <Table>
        <TableCaption>A list of recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] ">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {order._id
                    ? `${order._id.slice(5, 8)}...${order._id.slice(-3)}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {order.shippingAddress?.fullName || "N/A"}
                </TableCell>
                <TableCell>
                  <ul className="list-inside">
                    {order.cartItems.map((item, index) => (
                      <li key={index}>
                        {item.productId.title}{"  "}
                        <span className="text-gray-500">
                          (x{item.quantity})
                        </span>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.paymentInfo.status === "Paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.paymentInfo.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  PKR {order.totalPrice}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => openModal(order)}
                  >
                    Update
                  </button>
                  {order.status !== "Cancelled" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      disabled={order.status === "Cancelled"}
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Order</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedOrder.shippingAddress?.fullName || "N/A"}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className="list-disc ml-5">
              {selectedOrder.cartItems.map((item, index) => (
                <li key={index}>
                  {item.productId.title} (x
                  {item.quantity}
                  {/* <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-12 text-center border rounded ml-1"
                  /> */}
                  )
                </li>
              ))}
            </ul>
            <p>
              <strong>Payment:</strong> {selectedOrder.paymentInfo.status}
            </p>
            <p>
              <strong>Total Price:</strong> PKR {selectedOrder.totalPrice}
            </p>

            <label className="block mt-4">
              <strong>Order Status:</strong>
              <select
                value={updatedStatus}
                onChange={handleStatusChange}
                className="block w-full mt-1 p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
