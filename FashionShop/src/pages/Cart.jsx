import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAsync, removeFromCartAsync, fetchCart } from "../features/cartSlice";
import CommonHeading from "../components/CommonHeading";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, shipping } = useSelector((state) => state.cart);
  console.log("cartItems is : ",cartItems)

  const userId = Cookies.get("id"); 
console.log("userid is : ",userId)

  useEffect(() => {
    console.log("userId : ", userId);
    console.log("cart items in use effect in cart component  : ", cartItems);
    console.log("cartItems productId is : ", cartItems._id);
    if (userId) {
      dispatch(fetchCart(userId));
    } else {
      console.log("No user ID found in cookies");
    }
    dispatch(fetchCart(userId));
  }, [dispatch, userId,
    // cartItems
  ]);

  return (
    <div className="align-elements">
      <CommonHeading title="Shopping Cart" />
      {cartItems.length === 0 ? (
        <p className="text-center text-lg font-semibold mt-5">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="flex flex-row justify-between gap-10">
          <div className="space-y-6 w-full">
            {cartItems.map((item) => {
              const { _id,  quantity,productId } =item ; 
             // console.log("productId in component is : ", productId._id);
              const {title, price, product_image,}=productId

              return (
                <div key={_id} className="grid border-b p-4 grid-cols-3 items-center gap-5">
                  <img className="w-24 h-24 object-contain" src={product_image || ""} alt={title || "Product"} />
                  <div>
                    <h2 className="text-lg font-semibold">{title || "Unknown Product"}</h2>
                    <p className="text-gray-600">Price: PKR {price || "N/A"}</p>
                    <p className="text-gray-600">Quantity: {quantity || 1}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <button onClick={() => dispatch(addToCartAsync(userId, _id))} className="btn btn-sm btn-outline">
                      +
                    </button>
                    <span>{quantity || 1}</span>
                    <button onClick={() => {dispatch(removeFromCartAsync({productId:productId._id}))
                      console.log("productId in component in cart in dispatch is : ", productId._id);
                    }} className="btn btn-sm btn-error">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col h-fit p-10 w-80 gap-4 border rounded-lg bg-slate-200 mt-4 border-l">
              <h3 className="text-sm">Subtotal: PKR {totalPrice?.toFixed(2) || "0.00"}</h3>
              <h3 className="text-sm">Shipping: PKR {shipping?.toFixed(2) || "0.00"}</h3>
              <h3 className="text-md">Total: PKR {(totalPrice + shipping).toFixed(2)}</h3>
            </div>
            <Link to="/checkout">
              <button className="btn btn-success w-full">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;




// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCartAsync } from "../features/cartSlice";

// import { removeFromCartAsync } from "../features/cartSlice";
// import {
//   // addToCart,
//   removeFromCart,
//    decreaseQuantity,
// } from "../features/cartSlice";
// import CommonHeading from "../components/CommonHeading";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { fetchCart } from "../features/cartSlice";
// import Cookies from "js-cookie";

// const Cart = () => {
//   const dispatch = useDispatch();
//   // const [Shipping, setShipping] = useState(300);
//   const { cartItems, totalQuantity, totalPrice , shipping } = useSelector(
//     (state) => state.cart
//   );
//   console.log("Cart side = ",cartItems);
//   const userId = Cookies.get("id");
//   console.log("userid is : ",userId)

//   // const userId = "67af49a85cba87d9d5ad4e28"
//   // 67a44f834ed50d8f0ad68ae9
  

//   useEffect(() => {
//     console.log("userid is : ",userId)
//    // console.log("cart Items in useEffect : ",cartItems)
//     if (userId) {
//     dispatch(fetchCart(userId)); }
//     else{
//       console.log("no userid found in cookies")
//     }
//   }, [dispatch, userId]);
//   const title="shirts"
//   return (
//     <div className="align-elements">
//       <CommonHeading title="Shopping Cart" />
//       {
//       cartItems.length === 0 ? (
//         <p className="text-center text-lg font-semibold mt-5">
//           Your cart is empty 🛒
//         </p>
//       ) : (
//         <div className="flex flex-row justify-between gap-10 ">
//           <div className="space-y-6 w-full">
//             {cartItems.map((item) => {
//               console.log(item);
              
//               // const {  title, price, product_image} = item.productId;
//               //const {}=item.productId
//              // const { quantity } = item;
//               return (
//                 <div
//                   className="grid border-b p-4 grid-cols-3 items-center gap-5"
//                  // key={_id}
//                 >
//                   <img
//                     className="w-24 h-24 object-contain"
//                     src=''
//                     alt='shirt'
//                   //  src={product_image}
//                     //alt={title}
//                   />
//                   <div>
//                     <h2 className="text-lg font-semibold">
//                       {title}
//                       shirts
//                       </h2>
//                     <p className="text-gray-600">Price: PKR 
//                       {price}
//                       99
//                       </p>
//                     <p className="text-gray-600 block">Quantity: 
//                       {/* {quantity} */}
//                       89
//                       </p>
//                   </div>
//                   <div className="flex items-center gap-5">
//                     {/* <button
//                       onClick={() => dispatch(decreaseQuantity(item))}
//                       className="btn btn-sm btn-outline"
//                     >
//                       -
//                     </button> */}
//                     <span>
//                       {quantity}
//                       89
//                       </span>
//                     <button
//                       onClick={() => dispatch(addToCartAsync(userId,item.productId._id))}
//                       className="btn btn-sm btn-outline"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => dispatch(removeFromCartAsync(item))}
//                       className="btn btn-sm btn-error"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="flex flex-col gap-5 ">
//             <div className="flex flex-col h-fit p-10 w-80 gap-4 border rounded-lg bg-slate-200 mt-4 border-l">
//               <h3 className="text-sm">
//                 Subtotal : PKR {totalPrice.toFixed(2)}
//               </h3>
//               <h3 className="text-sm">Shipping : PKR {shipping.toFixed(2)}</h3>
//               <h3 className="text-md ">
//                 Subtotal : PKR {(totalPrice + shipping).toFixed(2)}
//               </h3>
//             </div>
//             <Link to = "/checkout">
//             <button className="btn btn-success w-full">Proceed to Checkout</button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
