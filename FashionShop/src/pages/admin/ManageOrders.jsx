import React from "react";
import { OrderTable } from "@/components/Admin";
import { CommonHeading } from "@/components";

const ManageOrders = () => {
  return (
    <div className="align-elements">
      <CommonHeading title={"Manage Orders"} />
      <OrderTable/>
    </div>
  );
};

export default ManageOrders;
