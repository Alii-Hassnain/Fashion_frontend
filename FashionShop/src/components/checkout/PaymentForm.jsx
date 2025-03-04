// 
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { handleError, handleSuccess } from '../../utils/tostify';
import { useDispatch } from 'react-redux';
import { clearCartAsync } from '../../features/cartSlice';



const PaymentForm = ({customerInfo}) => {
  const userData = useSelector((state)=>state.user.userData);
  const userId = userData?._id
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { cartItems, subtotal, shipping, totalPrice , totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+92\s\d{4}\s\d{7}$/;
    return phoneRegex.test(number);
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/order', orderData);
      handleSuccess("Order Placed Successfuly")
      if(response){
        dispatch(clearCartAsync(userId))
        return true
      }
    } catch (error) {
      handleError(error.response.data.message);
      return { success: false, message: error.response?.data?.message || 'Order failed' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError('Payment system not ready');
      return;
    }
    
    if(!customerInfo.fullName || !customerInfo.mobileNumber || !customerInfo.address ){
      console.log("all fields are required");
      handleError("all fields are required")
      return;
    }
    if (!validatePhoneNumber(customerInfo.mobileNumber)) {
      handleError("Invalid phone number format. Use: +92 XXXX XXXXXXX");
      return;
    }


    setLoading(true);
    setError('');
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (error) throw error;
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        const orderData = {
          userId,
          cartItems:cartItems.map((item)=>({
            productId:item.productId._id,
            quantity:item.quantity
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
          status: "Processing",
        };
        if(placeOrder(orderData)){
          setSuccess(true);
        };
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-100 border border-green-500 rounded-md">
        <h2 className="text-lg font-semibold text-green-700">Payment Successful!</h2>
        <p className="text-green-600">Thank you for your payment. Your transaction has been completed successfully.</p>
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
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {error && <div className="text-red-500 mt-3">{error}</div>}
    </form>
  );
};

export default PaymentForm;
