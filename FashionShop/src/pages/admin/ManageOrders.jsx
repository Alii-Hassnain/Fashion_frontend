import React, { useState } from "react";
import { OrderTable } from "@/components/Admin";
import { CommonHeading } from "@/components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ManageOrders = () => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="align-elements">
      <CommonHeading title={"Manage Orders"} />
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed Orders</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
        </TabsList>
        <TabsContent value={filter}>
          <OrderTable filter={filter} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageOrders;