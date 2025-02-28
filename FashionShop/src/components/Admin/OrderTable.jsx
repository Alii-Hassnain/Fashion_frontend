import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { getAllOrders } from "./Services/OrderServices";

const OrderTable = () => {
  const [orders, setOrders] = useState();

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

  console.log("this is the order Side  = ", orders);

  return (
    <div>
      <Table>
        <TableCaption>A list of recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => {
            console.log(order);
            const {cartItems,paymentInfo,shippingAddress} = order
            console.log(order.status.toString());
            
            return (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order._id}</TableCell>
                <TableCell>{shippingAddress.fullName}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {cartItems.map((item, index) => {
                        console.log("inside the cartItems",cartItems);
                        
                        return (
                      <li key={index}>
                        {item.name}{" "}
                        <span className="text-gray-500">
                          (x{item.quantity})
                        </span>
                      </li>
                    )
                    })}
                  </ul>
                </TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder={order.status.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      paymentInfo.status === "Paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {paymentInfo.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">PKR {order.totalPrice}</TableCell>
                <TableCell className="text-right space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
