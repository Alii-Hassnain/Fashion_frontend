
import React from "react";
import { useSelector } from "react-redux";
import CommonHeading from "../components/CommonHeading";
import {loadStripe} from '@stripe/stripe-js';

const Checkout = () => {
  const { cartItems, totalQuantity, totalPrice, shipping } = useSelector(
    (state) => state.cart
  );
  const makePayment = async() => {
    const stripe = await loadStripe("pk_test_51Qs5cnPJgXG0H41NH0lLbT88IqZxiy6VwobIA0Dry8y3S7dLJ9V3nu14LvW07B9hkS3pqlaQmX23TISFDFf6bY3m00XCqG2SD5")
    const body={
      cart:cartItems,
      total:totalPrice,
      quantity:totalQuantity
    }
    const headers={
      "Content-Type":"application/json"
    }

    const response = await fetch("http://localhost:8080/create-checkout-session",{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    })
    const session = await response.json()
    console.log(session)
    const result = await stripe.redirectToCheckout({
      sessionId:session.id
    })
    if(result.error){
      console.log(result.error.message)
      alert(result.error.message)
    }else{
      console.log("payment success")
      alert("payment success")
    }
  };
  return (
    <div className="align-elements">
      <CommonHeading title="Place your order" />
      <div className="flex flex-row justify-between">
        <div>

        <div className="flex flex-row gap-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Enter your name</span>
            </div>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Mobile Number</span>
            </div>
            <input
              type="text"
              placeholder="number"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="address"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col h-fit p-10 w-80 gap-4 border rounded-lg bg-slate-200 mt-4 border-l">
            <h1>Order summary</h1>
            <h3 className="text-sm">Subtotal : PKR {totalPrice.toFixed(2)}</h3>
            <h3 className="text-sm">Shipping : PKR {shipping.toFixed(2)}</h3>
            <h3 className="text-md ">
              Total : PKR {(totalPrice + shipping).toFixed(2)}
            </h3>
            <button className="btn btn-success w-full" onClick={makePayment}>Pay ${(totalPrice + shipping).toFixed(2)} </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import PaymentForm from '../components/checkout/PaymentForm';
// import OrderSummary from '../components/checkout/OrderSummary';
// import CustomerInfo from '../components/checkout/CustomerInfo';
// import { CommonHeading } from '../components';

// const stripePromise = loadStripe("pk_test_51Qt5f1IAryIsUHT2nPjN4107b3zi0mUPd9b2LyVN6zj1QaTARwUxzxn3ng06heGxkRd0mYb6iZIS2So7YZyypXoG00ijl0rH8e");

// const CheckoutPage = () => {
//   const { totalPrice } = useSelector((state) => state.cart);
//   const [clientSecret, setClientSecret] = useState('');
//   const [customerInfo,setCustomerInfo] = useState({});

//   // Fetch payment intent
//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const { data } = await axios.post(
//           'http://localhost:8080/create-payment-intent',
//           { amount: Math.round(totalPrice * 100) }
//         );
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         console.error('Payment intent error:', err);
//       }
//     };

//     if (totalPrice > 0) createPaymentIntent();
//   }, [totalPrice]);

//   return (
//     <div>Checkout</div>
//   )
// }

// export default CheckoutPage