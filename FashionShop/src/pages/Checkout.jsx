import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import CustomerInfo from '../components/checkout/CustomerInfo';
import { CommonHeading } from '../components';

const stripePromise = loadStripe("pk_test_51Qt5f1IAryIsUHT2nPjN4107b3zi0mUPd9b2LyVN6zj1QaTARwUxzxn3ng06heGxkRd0mYb6iZIS2So7YZyypXoG00ijl0rH8e");

const CheckoutPage = () => {
  const { totalPrice } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState('');
  const [customerInfo,setCustomerInfo] = useState({});

  // Fetch payment intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:8080/create-payment-intent',
          { amount: Math.round(totalPrice * 100) }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Payment intent error:', err);
      }
    };

    if (totalPrice > 0) createPaymentIntent();
  }, [totalPrice]);

  return (
    <div>Checkout</div>
  )
}

export default Checkout