import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/tostify";
import { useDispatch } from "react-redux";
import { clearCartAsync } from "../../features/cartSlice";
import { sendOrderEmail } from "../Admin/Services/EmailServices";


const PaymentForm = ({ customerInfo }) => {
  const userData = useSelector((state) => state.user.userData);
  const userId = userData?._id;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { cartItems, subtotal, shipping, totalPrice, totalQuantity } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log("cart items in payment form: ", cartItems);
  console.log("user data in payment form: ", userData);
  console.log("user id in payment form: ", userId);
  console.log("customer info in payment form: ", customerInfo);

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+92\s\d{4}\s\d{7}$/;
    return phoneRegex.test(number);
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/place-Order",
        orderData
      );
      if (response.data.success) {
        console.log("Order Response:", response.data);
        console.log("user data is : ", userData);
        handleSuccess("Order Placed Successfuly");
        dispatch(clearCartAsync(userId));
        return response.data;
      } else {
        handleError(response.data.message || "Order failed");
        return false;
      }
    } catch (error) {
      handleError(error.response.data.message);
      return {
        success: false,
        message: error.response?.data?.message || "Order failed",
      };
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError("Payment system not ready");
      return;
    }
    if (
      !customerInfo.fullName ||
      !customerInfo.mobileNumber ||
      !customerInfo.address
    ) {
      console.log("all fields are required");
      handleError("all fields are required");
      return;
    }
    if (!validatePhoneNumber(customerInfo.mobileNumber)) {
      handleError("Invalid phone number format. Use: +92 XXXX XXXXXXX");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });
      
      if (error) throw error;
      if (paymentIntent && paymentIntent.status === "succeeded") {
        const orderData = {
          userId,
          cartItems: cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            size: item.size,
          })),
          subtotal,
          shipping,
          totalPrice,
          totalQuantity,
          paymentInfo: {
            transactionId: paymentIntent.id,
            status: "Paid",
            paidAt: new Date(),
          },
          shippingAddress: {
            fullName: customerInfo.fullName,
            mobileNumber: customerInfo.mobileNumber,
            address: customerInfo.address,
          },
          status: "Pending",
        };
      
      const orderResponse = await placeOrder(orderData);
      console.log("Order Response in payment form:", orderResponse);

      if (orderResponse.success) {
        const emailResponse = await sendOrderEmail(
          userData.email,
          customerInfo.fullName,
          orderResponse.order._id,
          totalPrice,
          "Pending", 
          "Paid",
   "http://localhost:5173/profile",        
    // `https://tracking.example.com/${orderResponse.order._id}`,
          customerInfo.mobileNumber
        );
        

        console.log("Email Response: ", emailResponse);
        if (emailResponse.success) {
          handleSuccess("Email sent successfully!");
        } else {
          handleError("Email sending failed!");
        }
      } else {
        handleError("Order failed. Cannot send email.");
      }
      setSuccess(true);
    }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!stripe || !elements) {
  //     setError("Payment system not ready");
  //     return;
  //   }
  //   if (
  //     !customerInfo.fullName ||
  //     !customerInfo.mobileNumber ||
  //     !customerInfo.address
  //   ) {
  //     console.log("all fields are required");
  //     handleError("all fields are required");
  //     return;
  //   }
  //   if (!validatePhoneNumber(customerInfo.mobileNumber)) {
  //     handleError("Invalid phone number format. Use: +92 XXXX XXXXXXX");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   const orderData = {
  //     userId,
  //     cartItems: cartItems.map((item) => ({
  //       productId: item.productId._id,
  //       quantity: item.quantity,
  //     })),
  //     subtotal,
  //     shipping,
  //     totalPrice,
  //     totalQuantity,
  //     shippingAddress: {
  //       fullName: customerInfo.fullName,
  //       mobileNumber: customerInfo.mobileNumber,
  //       address: customerInfo.address,
  //     },
  //     status: "Pending",
  //   };

  //   try {
  //     const { error, paymentIntent } = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //         return_url: window.location.href,
  //       },
  //       redirect: "if_required",
  //     });
      
  //     if (error) throw error;
  //     if (paymentIntent && paymentIntent.status === "succeeded") {
  //       const orderData = {
  //         userId,
  //         cartItems: cartItems.map((item) => ({
  //           productId: item.productId._id,
  //           quantity: item.quantity,
  //           size: item.size,
  //         })),
  //         subtotal,
  //         shipping,
  //         totalPrice,
  //         totalQuantity,
  //         paymentInfo: {
  //           transactionId: paymentIntent.id,
  //           status: "Paid",
  //           paidAt: new Date(),
  //         },
  //         shippingAddress: {
  //           fullName: customerInfo.fullName,
  //           mobileNumber: customerInfo.mobileNumber,
  //           address: customerInfo.address,
  //         },
  //         status: "Pending",
  //       };
      
  //     const orderResponse = await placeOrder(orderData);
  //     console.log("Order Response in payment form:", orderResponse);

  //     if (orderResponse.success) {
  //       const emailResponse = await sendOrderEmail(
  //         userData.email,
  //         customerInfo.fullName,
  //         orderResponse.order._id,
  //         totalPrice,
  //         "Pending", 
  //         "Paid",
  //  "http://localhost:5173/profile",        
  //   // `https://tracking.example.com/${orderResponse.order._id}`,
  //         customerInfo.mobileNumber
  //       );
        

  //       console.log("Email Response: ", emailResponse);
  //       if (emailResponse.success) {
  //         handleSuccess("Email sent successfully!");
  //       } else {
  //         handleError("Email sending failed!");
  //       }
  //     } else {
  //       handleError("Order failed. Cannot send email.");
  //     }
  //     setSuccess(true);
  //   }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-100 border border-green-500 rounded-md">
        <h2 className="text-lg font-semibold text-green-700">
          Payment Successful!
        </h2>
        <p className="text-green-600">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <PaymentElement className="mb-6" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {error && <div className="text-red-500 mt-3">{error}</div>}
    </form>
  );
};

export default PaymentForm;

// import React, { useState } from "react";
// import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { handleError, handleSuccess } from "../../utils/tostify";
// import { clearCartAsync } from "../../features/cartSlice";
// import { sendOrderEmail } from "../Admin/Services/EmailServices"; // Importing email function

// const PaymentForm = ({ customerInfo }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.user.userData);
//   const { cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const placeOrder = async (orderData) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/order", orderData);
//       console.log("Order Response in payment form:", response.data);
//       if (response.data) {
//         handleSuccess("Order Placed Successfully!");
//         dispatch(clearCartAsync(userData._id));
//         return response.data;
//       }
//     } catch (error) {
//       handleError(error.response?.data?.message || "Order failed");
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       setError("Payment system not ready");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: { return_url: window.location.href },
//         redirect: "if_required",
//       });

//       if (error) throw error;

//       if (paymentIntent.status === "succeeded") {
//         const orderData = {
//           userId: userData._id,
//           cartItems: cartItems.map((item) => ({
//             productId: item.productId._id,
//             quantity: item.quantity,
//           })),
//           totalPrice,
//           totalQuantity,
//           paymentInfo: {
//             transactionId: paymentIntent.id,
//             status: "Paid",
//             paidAt: new Date(),
//           },
//           shippingAddress: {
//             fullName: customerInfo.fullName,
//             mobileNumber: customerInfo.mobileNumber,
//             address: customerInfo.address,
//             email: customerInfo.email,
//           },
//           status: "Processing",
//         };

//         const orderResponse = await placeOrder(orderData);

//         console.log("Order Response in payment form:", orderResponse);
//         console.log("")
//         if (orderResponse) {
//           // Sending order confirmation email
//           await sendOrderEmail(
//             customerInfo.email,
//             customerInfo.fullName,
//             orderResponse.orderId,
//             totalPrice,
//             "Processing", // Status
//             "Paid",
//             `https://tracking.example.com/${orderResponse.orderId}`,
//             customerInfo.mobileNumber
//           );

//           setSuccess(true);
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="text-center p-6 bg-green-100 border border-green-500 rounded-md">
//         <h2 className="text-lg font-semibold text-green-700">Payment Successful!</h2>
//         <p className="text-green-600">Your order has been placed successfully.</p>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mt-6">
//       <PaymentElement className="mb-6" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="btn btn-primary w-full"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//       {error && <div className="text-red-500 mt-3">{error}</div>}
//     </form>
//   );
// };

// export default PaymentForm;
