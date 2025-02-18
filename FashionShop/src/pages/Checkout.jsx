import React from "react";
import { useSelector } from "react-redux";
import CommonHeading from "../components/CommonHeading";

const Checkout = () => {
  const { cartItems, totalQuantity, totalPrice, shipping } = useSelector(
    (state) => state.cart
  );
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
