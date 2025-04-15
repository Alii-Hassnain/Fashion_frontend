import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleSuccess, handleError } from "../utils/tostify";
import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_URI;

const API_URL = `${baseURL}/api/cart`;

const initialState = {
  cartItems: [], // Stores product variants
  totalQuantity: 0,
  totalPrice: 0,
  subtotal: 0,
  shipping: 0,
  status: "idle",
  error: null,
};

// Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

// Add Product Variant to Cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ userId, productId, size,quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { userId, productId, size, quantity });      
        handleSuccess("Product added successfully");
      return response.data;
    } catch (error) {
      handleError(error.response?.data?.message || "Failed to add product");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Remove Product Variant from Cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async ({ userId, productId, size }, { getState, rejectWithValue }) => {
    const { cartItems } = getState().cart;
    if (!cartItems.some((i) => i.productId._id === productId && i.size === size)) {
      return rejectWithValue("Item not found in cart");
    }
    try {
      const response = await axios.delete(`${API_URL}/${userId}/${productId}/${size}`);
      handleError("Product removed");
      return response.data;
    } catch (error) {
      handleError("Failed to remove product");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Decrease Quantity of Variant
export const decreaseQuantityAsync = createAsyncThunk(
  "cart/decreaseQuantityAsync",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/decrease`, { userId, productId, size });
      handleError("Product quantity decreased");
      return response.data;
    } catch (error) {
      handleError("Failed to decrease quantity");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Clear Cart
export const clearCartAsync = createAsyncThunk("cart/clearCartAsync", async (userId, { dispatch, rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    dispatch(clearCart());
    return { message: "Cart cleared successfully" };
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to clear cart");
  }
});

// Cart Slice with Variants
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.subtotal = 0;
      state.shipping = 0;
      state.status = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(fetchCart.fulfilled, (state, action) => {
      //   state.cartItems = action.payload.cartItems;
      //   state.totalQuantity = action.payload.totalQuantity;
      //   state.totalPrice = action.payload.totalPrice;
      //   state.subtotal = action.payload.subtotal;
      //   state.shipping = action.payload.shipping;
      //   state.status = "succeeded";
      // })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (!action.payload) {
          console.error("fetchCart returned undefined payload!");
          return;
        }
        state.cartItems = action.payload.cartItems || [];  // Ensure it's an array
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.totalPrice = action.payload.totalPrice || 0;
        state.subtotal = action.payload.subtotal || 0;
        state.shipping = action.payload.shipping || 0;
        state.status = "succeeded";
      })
      
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.subtotal = action.payload.subtotal;
        state.shipping = action.payload.shipping;
        state.status = "succeeded";
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(decreaseQuantityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.subtotal = action.payload.subtotal;
        state.shipping = action.payload.shipping;
        state.status = "succeeded";
      })
      .addCase(decreaseQuantityAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.subtotal = action.payload.subtotal;
        state.shipping = action.payload.shipping;
        state.status = "succeeded";
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart, addToCart,removeFromCart,decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;









// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { act } from "react";
// import { handleSuccess } from "../utils/tostify";
// import { handleError } from "../utils/tostify";
// import { axiosCart } from "../utils/axiosFetch";
// import axios from "axios";

// const initialState = {
//   cartItems: [],
//   totalQuantity:0,
//   totalPrice: 0,
//   subtotal: 0,
//   shipping: 0,
//   status:"idle",
//   error: null,
// };

// const API_URL = "${baseURL}/api/cart"
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/${userId}`);
//       return response.data; // Return the cart data
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const addToCartAsync = createAsyncThunk(
//   "cart/addToCartAsync",
//   async ({userId,productId}, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("${baseURL}/api/cart",{
//         userId:userId,
//         productId:productId
//       })   

//       console.log(response.data);
      
//       return response.data;

//     } catch (error) {
//       console.log(error.response.data.message);
      
//       handleError(error.response.data.message)
//       return rejectWithValue(error.response.data);
//     }
//   }
// )
// export const removeFromCartAsync = createAsyncThunk(
//   "cart/removeFromCartAsync",
//   async ({userId,productId}, {getState, rejectWithValue }) => {
//     const { cartItems } = getState().cart;
//     const item = cartItems.find((i) => i.productId._id === productId);
//     if (!item) {
//       return rejectWithValue("Item not found in cart"); // Prevent unnecessary API call
//     }
//     try {
//       const response = await axios.delete(`${baseURL}/api/cart/${userId}/${productId}`)
//       return response.data; // Return the ID of the removed product
//     } catch (error) {
//       handleError("Failed to remove product");
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const decreaseQuantityAsync = createAsyncThunk(
//   "cart/decreaseQuantityAsync",
//   async ({ userId, productId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${baseURL}/api/cart/decrease`, {
//         userId,
//         productId,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const clearCartAsync = createAsyncThunk(
//   "cart/clearCartAsync",
//   async (userId, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`${baseURL}/api/cart/${userId}`);
//       console.log(response);
//       dispatch(clearCart()); // Clear Redux state after successful API call
//       return { message: "Cart cleared successfully" };
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to clear cart");
//     }
//   }
// );
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // addToCart: (state, action) => {
//     //   const item = state.cartItems.find((previousState)=>{
//     //     return previousState._id === action.payload._id
//     //   })
//     //   if (item) {
//     //     item.quantity += 1; 
//     //   } else {
//     //     state.cartItems.push({ ...action.payload, quantity: 1 }); 
        
//     //   }
//     //   if(state.cartItems.length !==0){
//     //     state.shipping = 500
//     //   }
//     //   state.totalQuantity += 1;
//     //   state.totalPrice += action.payload.price;
//     //   handleSuccess("Product added successfuly")

//     // },
//     // removeFromCart: (state, action) => {  
//     //   const item = state.cartItems.find((i) => i._id === action.payload._id);
//     //   console.log(item);
//     //   if (item) {
//     //     state.totalQuantity -= item.quantity;
//     //     state.totalPrice -= item.price * item.quantity;
//     //     state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id);
//     //   }
//     //   handleError("item removed")
//     //   console.log(!state.cartItems);
      
//     //   if(state.cartItems.length === 0){
//     //     state.shipping = 0
//     //   }
//     // },
//     // decreaseQuantity: (state, action) => {

//     //   const item = state.cartItems.find((i) =>{
//     //     return i._id === action.payload._id
//     //   } );
      
      
//     //   if (item) {
//     //     if (item.quantity > 1) {
//     //       item.quantity -= 1;
//     //       state.totalQuantity -= 1;
//     //       state.totalPrice -= item.price;
//     //     } else {
//     //       state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id);
//     //       state.totalQuantity -= 1;
//     //       state.totalPrice -= item.price;
//     //     }
//     //   }
//     //   handleError("Product removed")
//     //   if(state.cartItems.length === 0){
//     //     state.shipping = 0
//     //   }
//     // },
//     clearCart: (state) => { // New action to empty the cart
//       state.cartItems = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0,
//       state.subtotal = 0,
//       state.shipping = 0,
//       state.status ="success"
//     },
    
//   },
//   extraReducers: (builder) => {
//     builder
//     .addCase(fetchCart.pending, (state) => {
//       state.status = "loading";
//     })
//     .addCase(fetchCart.fulfilled, (state, action) => {  
//       state.cartItems = action.payload.cartItems;
      
//       state.totalQuantity = action.payload.totalQuantity;
//       state.totalPrice = action.payload.totalPrice;
//       state.subtotal = action.payload.subtotal;
//       state.shipping = action.payload.shipping;
//       state.status = "succeeded";
//     })
//     .addCase(fetchCart.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.payload;
//     })
//     .addCase(addToCartAsync.pending,(state)=>{
//       state.status = "loading";
//     })
//     .addCase(addToCartAsync.fulfilled,(state,action)=>{
      
//       state.totalQuantity = action.payload.totalQuantity;

//       state.cartItems = action.payload.cartItems;
//       state.totalPrice = action.payload.totalPrice;
//       state.subtotal = action.payload.subtotal;
//       state.shipping = action.payload.shipping;
//       state.status = "succeeded"
//       handleSuccess("Product added successfully");
//     })

//     .addCase(addToCartAsync.rejected,(state,action)=>{
//       state.status = "failed";
//       state.error = action.payload;
//     })
//     .addCase(decreaseQuantityAsync.pending, (state, action) => {
//       state.status = "loading";
//     })
//     .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
//       state.cartItems = action.payload.cartItems; // Update cart from backend response
//       state.totalQuantity = action.payload.totalQuantity;
//       state.totalPrice = action.payload.totalPrice;
//       state.subtotal = action.payload.subtotal;
//       state.shipping = action.payload.shipping;
//       handleError("Product quantity decreased");
//     })
//     .addCase(decreaseQuantityAsync.rejected, (state, action) => {
//       state.error = action.payload;
//       handleError("Failed to decrease quantity");
//     })
//     .addCase(removeFromCartAsync.pending, (state) => {
//       state.status = "loading"; // Set loading state
//     })
//     .addCase(removeFromCartAsync.fulfilled, (state, action) => {
//       state.totalQuantity = action.payload.totalQuantity;

      
//       state.cartItems = action.payload.cartItems;
//       state.totalPrice = action.payload.totalPrice;
//       state.subtotal = action.payload.subtotal;
//       state.shipping = action.payload.shipping;
//       handleError("product removed")
//       state.status = "succeeded";
//     })
//     .addCase(removeFromCartAsync.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.payload;
//     });
//   }
    
// });
// export const {addToCart,removeFromCart,decreaseQuantity,clearCart} = cartSlice.actions;
// export default cartSlice.reducer;
