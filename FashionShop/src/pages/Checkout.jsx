import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderSummary from "../components/checkout/OrderSummary";
import CustomerInfo from "../components/checkout/CustomerInfo";
import { CommonHeading } from "../components";

const stripePromise = loadStripe(
  "pk_test_51Qt5f1IAryIsUHT2nPjN4107b3zi0mUPd9b2LyVN6zj1QaTARwUxzxn3ng06heGxkRd0mYb6iZIS2So7YZyypXoG00ijl0rH8e"
);

const CheckoutPage = () => {
  const { totalPrice } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});

  // Fetch payment intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(
          "https://fashionbackendfork.up.railway.app/create-payment-intent",
          { amount: Math.round(totalPrice * 100) }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Payment intent error:", err);
      }
    };

    if (totalPrice > 0) createPaymentIntent();
  }, [totalPrice]);

  return (
    <div className="align-elements">
      <CommonHeading title="Complete Your Payment" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <CustomerInfo onCustomerInfoChange={setCustomerInfo} />

          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: "stripe" },
              }}
            >
              <PaymentForm customerInfo={customerInfo} />
            </Elements>
          )}
        </div>
        <div className="lg:w-96">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
