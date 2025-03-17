// import  { CommonHeading } from "../components"
// // // import React from 'react'

// // // const Profile = () => {
// // //   return (
// // //     <div className='align-elements'>
// // //         <CommonHeading title={"Profile"}  />

        
        
// // //     </div>
// // //   )
// // // }

// // // export default Profile

// // import React, { useState } from "react";

// // const Profile = () => {
// //   // Dummy Orders Data
// //   const dummyOrders = [
// //     {
// //       id: "ORD12345",
// //       date: "2025-03-15",
// //       total: "3500",
// //       status: "Pending",
// //       items: [
// //         { id: "1", name: "T-Shirt", quantity: 2 },
// //         { id: "2", name: "Jeans", quantity: 1 },
// //       ],
// //     },
// //     {
// //       id: "ORD67890",
// //       date: "2025-03-12",
// //       total: "5000",
// //       status: "Shipped",
// //       items: [{ id: "3", name: "Jacket", quantity: 1 }],
// //     },
// //     {
// //       id: "ORD54321",
// //       date: "2025-03-10",
// //       total: "2200",
// //       status: "Delivered",
// //       items: [
// //         { id: "4", name: "Sneakers", quantity: 1 },
// //         { id: "5", name: "Cap", quantity: 1 },
// //       ],
// //     },
// //   ];

// //   const [orders] = useState(dummyOrders);

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>

// //       {orders.length === 0 ? (
// //         <p className="text-gray-600">No orders found.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {orders.map((order) => (
// //             <div
// //               key={order.id}
// //               className="border p-4 rounded-lg shadow-sm bg-white"
// //             >
// //               <h3 className="text-lg font-semibold text-gray-700">
// //                 Order ID: {order.id}
// //               </h3>
// //               <p className="text-gray-600">Date: {order.date}</p>
// //               <p className="text-gray-600">Total: PKR {order.total}</p>

// //               {/* Order Status */}
// //               <span
// //                 className={`px-3 py-1 text-sm rounded-lg ${
// //                   order.status === "Pending"
// //                     ? "bg-yellow-100 text-yellow-700"
// //                     : order.status === "Shipped"
// //                     ? "bg-blue-100 text-blue-700"
// //                     : "bg-green-100 text-green-700"
// //                 }`}
// //               >
// //                 {order.status}
// //               </span>

// //               {/* Order Items */}
// //               <ul className="mt-2 text-gray-600">
// //                 {order.items.map((item) => (
// //                   <li key={item.id}>
// //                     {item.name} ({item.quantity})
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;


// import React, { useState } from "react";

// const Profile = () => {
//   // Dummy Orders Data
//   const dummyOrders = [
//     {
//       id: "ORD12345",
//       date: "2025-03-15",
//       total: "3500",
//       status: "Pending",
//       items: [
//         { id: "1", name: "T-Shirt", quantity: 2 },
//         { id: "2", name: "Jeans", quantity: 1 },
//       ],
//     },
//     {
//       id: "ORD67890",
//       date: "2025-03-12",
//       total: "5000",
//       status: "Shipped",
//       items: [{ id: "3", name: "Jacket", quantity: 1 }],
//     },
//     {
//       id: "ORD54321",
//       date: "2025-03-10",
//       total: "2200",
//       status: "Delivered",
//       items: [
//         { id: "4", name: "Sneakers", quantity: 1 },
//         { id: "5", name: "Cap", quantity: 1 },
//       ],
//     },
//   ];

//   const [orders] = useState(dummyOrders);

//   // Function to determine step classes based on order status
//   const getStepClass = (orderStatus, step) => {
//     const statusSteps = ["Processing", "Pending", "Shipped", "Delivered"];
//     const currentIndex = statusSteps.indexOf(orderStatus);
//     const stepIndex = statusSteps.indexOf(step);
//     return stepIndex <= currentIndex ? "step step-primary" : "step";
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600">No orders found.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="border p-6 rounded-lg shadow-sm bg-white"
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 Order ID: {order.id}
//               </h3>
//               <p className="text-gray-600">Date: {order.date}</p>
//               <p className="text-gray-600">Total: PKR {order.total}</p>

//               {/* Order Progress Steps */}
//               <ul className="steps my-4">
//                 <li className={getStepClass(order.status, "Processing")}>
//                   Processing
//                 </li>
//                 <li className={getStepClass(order.status, "Pending")}>
//                   Pending
//                 </li>
//                 <li className={getStepClass(order.status, "Shipped")}>
//                   Shipped
//                 </li>
//                 <li className={getStepClass(order.status, "Delivered")}>
//                   Delivered
//                 </li>
//               </ul>

//               {/* Order Items */}
//               <ul className="mt-2 text-gray-600">
//                 {order.items.map((item) => (
//                   <li key={item.id}>
//                     {item.name} ({item.quantity})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import { CommonHeading } from "../components";
import React, { useState } from "react";

const Profile = () => {
  // Dummy Orders Data
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      date: "2025-03-15",
      total: "3500",
      status: "Pending",
      items: [
        { id: "1", name: "T-Shirt", quantity: 2 },
        { id: "2", name: "Jeans", quantity: 1 },
      ],
    },
    {
      id: "ORD67890",
      date: "2025-03-12",
      total: "5000",
      status: "Shipped",
      items: [{ id: "3", name: "Jacket", quantity: 1 }],
    },
    {
      id: "ORD54321",
      date: "2025-03-10",
      total: "2200",
      status: "Delivered",
      items: [
        { id: "4", name: "Sneakers", quantity: 1 },
        { id: "5", name: "Cap", quantity: 1 },
      ],
    },
  ]);

  // Function to handle order cancellation
  const handleCancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  // Function to determine step classes based on order status
  const getStepClass = (orderStatus, step) => {
    const statusSteps = ["Processing", "Pending", "Shipped", "Delivered"];
    const currentIndex = statusSteps.indexOf(orderStatus);
    const stepIndex = statusSteps.indexOf(step);
    return stepIndex <= currentIndex ? "step step-primary" : "step";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CommonHeading title={"My Orders"}/>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-6 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: {order.id}
              </h3>
              <p className="text-gray-600">Date: {order.date}</p>
              <p className="text-gray-600">Total: PKR {order.total}</p>

              {/* Order Progress Steps */}
              <ul className="steps my-4">
                <li className={getStepClass(order.status, "Processing")}>
                  Processing
                </li>
                <li className={getStepClass(order.status, "Pending")}>
                  Pending
                </li>
                <li className={getStepClass(order.status, "Shipped")}>
                  Shipped
                </li>
                <li className={getStepClass(order.status, "Delivered")}>
                  Delivered
                </li>
              </ul>

              {/* Cancel Order Button (Only for Pending Orders) */}
              {order.status === "Pending" && (
                <button
                  className="btn btn-error text-white mt-3"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Cancel Order
                </button>
              )}

              {/* Order Items */}
              <ul className="mt-2 text-gray-600">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} ({item.quantity})
                  </li>
                ))}
              </ul>

              {/* Show if Order is Cancelled */}
              {order.status === "Cancelled" && (
                <p className="text-red-500 font-semibold mt-2">Order Cancelled</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;


