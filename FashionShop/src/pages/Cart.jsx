import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAsync } from "../features/cartSlice";
import { removeFromCartAsync } from "../features/cartSlice";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../features/cartSlice";
import CommonHeading from "../components/CommonHeading";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchCart } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  // const [Shipping, setShipping] = useState(300);
  const { cartItems, totalQuantity, totalPrice , shipping } = useSelector(
    (state) => state.cart
  );
  console.log("Cart side = ",cartItems);
  

  const userId = "67a44f834ed50d8f0ad68ae9";

  useEffect(() => {
    dispatch(fetchCart(userId)); 
  }, [dispatch]);

  return (
    <div className="align-elements">
      <CommonHeading title="Shopping Cart" />
      {cartItems.length === 0 ? (
        <p className="text-center text-lg font-semibold mt-5">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="flex flex-row justify-between gap-10 ">
          <div className="space-y-6 w-full">
            {cartItems.map((item) => {
              console.log("cart side data = ",item);
              
              const { _id, title, price, product_image} = item.productId;
              const { quantity } = item;
              return (
                <div
                  className="grid border-b p-4 grid-cols-3 items-center gap-5"
                  key={_id}
                >
                  <img
                    className="w-24 h-24 object-contain"
                    src={product_image}
                    alt={title}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-gray-600">Price: PKR {price}</p>
                    <p className="text-gray-600 block">Quantity: {quantity}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item))}
                      className="btn btn-sm btn-outline"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => dispatch(addToCartAsync(userId,_id))}
                      className="btn btn-sm btn-outline"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCartAsync(item))}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col h-fit p-10 w-80 gap-4 border rounded-lg bg-slate-200 mt-4 border-l">
              <h3 className="text-sm">
                Subtotal : PKR {totalPrice.toFixed(2)}
              </h3>
              <h3 className="text-sm">Shipping : PKR {shipping.toFixed(2)}</h3>
              <h3 className="text-md ">
                Subtotal : PKR {(totalPrice + shipping).toFixed(2)}
              </h3>
            </div>
            <Link to = "/checkout">
            <button className="btn btn-success w-full">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
