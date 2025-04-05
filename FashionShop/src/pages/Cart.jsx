import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAsync, decreaseQuantityAsync } from "../features/cartSlice";
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
import { checkAuth } from "../components/Admin/Services/UserServices";

const Cart = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  // const [Shipping, setShipping] = useState(300);
  const { cartItems, totalPrice, subtotal, shipping, status } = useSelector(
    (state) => state.cart
  );
  const userData = useSelector((state) => state.user.userData);

  // const checkAuthCookie = async () => {
  //   try {
  //  const response =await fetch("http://localhost:8080/user/verify-session", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const result = await response.json();
  //     console.log("result from verify session in cart component  is : ",result)
  //     setUserId(result.user._id);
  //     return result.success;

  //   } catch (error) {
  //     console.error("Error checking session:", error);
  //     return false;
  //   }
  // };
  const isAuth = async () => {
    try {
      const response = await checkAuth();
      // console.log("user services response in cart component is : ", response);
      if (response) {
        setUserId(response.user._id);
      } else {
        setUserId(null);
      }
      return response.success;
    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  };
  useEffect(() => {
    isAuth();
  }, []);
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId]);

  console.log("here is the cartSide ID", userId);

  return (
    <div className="align-elements">
      <CommonHeading title="Shopping Cart" />

      {userId === null ? (
        <div className="flex flex-col items-center   h-screen">

        <p className="text-center text-lg font-semibold mt-5">
          Please log in to view your cart 🛒
        </p>
        
            <button onClick={() => window.location.href = "/login"} className="btn btn-primary my-5">Login First</button>
            <button onClick={() => window.location.href = "/"} className="btn btn-secondary">Explore Products</button>
        
        </div>
      ) : !cartItems || cartItems.length === 0 ? (
        <p className="text-center text-lg font-semibold mt-5">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="flex flex-row justify-between gap-10 ">
          <div className="space-y-6 w-full">
            {cartItems.map((item) => {
              // console.log("cart side data = ",item);
              const { _id, title, price, product_image } = item.productId;
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
                    <p className="text-gray-600 block">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantityAsync({
                            userId,
                            productId: _id,
                            size: item.size,
                          })
                        )
                      }
                      className="btn btn-sm btn-outline"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          addToCartAsync({
                            userId,
                            productId: _id,
                            size: item.size,
                            quantity: 1,
                          })
                        )
                      }
                      className="btn btn-sm btn-outline"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCartAsync({
                            userId,
                            productId: _id,
                            size: item.size,
                            quantity: 1,
                          })
                        )
                      }
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
              <h3 className="text-sm">Subtotal : PKR {subtotal.toFixed(2)}</h3>
              <h3 className="text-sm">Shipping : PKR {shipping.toFixed(2)}</h3>
              <h3 className="text-md ">Total : PKR {totalPrice.toFixed(2)}</h3>
            </div>
            <Link to="/checkout">
              <button className="btn btn-success w-full">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
