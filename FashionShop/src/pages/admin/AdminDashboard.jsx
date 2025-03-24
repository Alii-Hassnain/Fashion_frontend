import React, { useState, useEffect } from "react";
import { Button } from "@/components/UI/button";
import { OverView, Users } from "../../components/Admin/DashboardCards";
import { Graph } from "../../components/Admin/DashboardCards";
import { axiosAdminUrl } from "../../utils/axiosFetch";
import { getAllOrders } from "../../components/Admin/Services/OrderServices";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [completedOrders, setcompletedOrders] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axiosAdminUrl.get("/get-users", {
        withCredentials: true,
      });
      // const data = response.data.data;
      // const count=response.data.count;
      setUserCount(response.data.count);
      setUsers(response.data.data);
      console.log("response is : ", response.data.data);
      console.log("response is : ", response.data.count);

      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
      filterOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  // const filterOrder = () => {
  //   if (orders) {
  //     for (let i = 0; i < orders.length; i++) {
  //       if (orders[i].status === "Completed") {
  //         setcompletedOrders(completedOrders + 1);
  //       } else if (orders[i].status === "Processing") {
  //         setActiveOrders(activeOrders + 1);
  //       } else if (orders[i].status === "Cancelled") {
  //         setCancelledOrders(cancelledOrders + 1);
  //       }
  //     }
  //   }
  // };
  const filterOrders = (ordersData) => {
    let completed = 0, active = 0, cancelled = 0;
    ordersData.forEach(order => {
      if (order.status === "Completed") {
        completed++;
      } else if (order.status === "Processing") {
        active++;
      } else if (order.status === "Cancelled") {
        cancelled++;
      }
    });
    setcompletedOrders(completed);
    setActiveOrders(active);
    setCancelledOrders(cancelled);
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);
  console.log("orders in admin dashboard : ", orders);
  console.log("active order : ", activeOrders);
  console.log("completed order : ", completedOrders);
  console.log("cancelled order : ", cancelledOrders);
  return (
    <div className="align-elements">
      <h1>This is Admin Dashboard</h1>
      <div className="flex flex-row gap-5">
        <OverView title={"Total Users"} number={userCount} />
        <OverView title={"Total Orders Completed"} number={completedOrders} />
        <OverView title={"Active Orders"} number={activeOrders} />
        <OverView title={"Cancelled Order"} number={cancelledOrders} />
      </div>
      <div className="flex flex-row gap-5 mt-5">
        <Graph />
        <Users />
      </div>
    </div>
  );
};

export default AdminDashboard;
