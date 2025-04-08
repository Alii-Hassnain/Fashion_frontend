import React, { useState } from "react";

import {
  ReviewsAsApproval,
  ReviewsAsUsers,
  ReviewsAsProducts,
} from "../../components/Admin";

const AdminReviews = () => {
  const [activeTab, setActiveTab] = useState("approval");
  console.log(activeTab);

  const renderTab = () => {
    switch (activeTab) {
      case "approval":
        console.log("this is called");
        return <ReviewsAsApproval />;
      case "users":
        return <ReviewsAsUsers />;
      case "products":
        return <ReviewsAsProducts />;
      default:
        return null;
    }
  };

  return (
    <div className="align-elements">
      <h1 className="text-center text-xl m-4 bg-slate-600 p-4 text-white">
        Reviews Management
      </h1>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("approval")}
          className={`px-4 py-2 rounded ${
            activeTab === "approval" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          🔎 Approvals
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          👤 By User
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded ${
            activeTab === "products" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          📦 By Product
        </button>
      </div>
      {renderTab()}
    </div>
  );
};

export default AdminReviews;
