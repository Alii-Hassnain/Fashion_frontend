import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const { subtotal, totalPrice, shipping } = useSelector((state) => state.cart);

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>PKR {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>PKR {shipping.toFixed(2)}</span>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>PKR {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;