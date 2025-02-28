import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { handleSuccess } from "../utils/tostify";
import { handleError } from "../utils/tostify";
import { axiosCart } from "../utils/axiosFetch";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalQuantity:0,
  totalPrice: 0,
  subtotal: 0,
  shipping: 0,
  status:"idle",
  error: null,
};

const API_URL = "http://localhost:8080/api/cart"

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data; // Return the cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({userId,productId}, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/api/cart",{
        userId:userId,
        productId:productId
      })   
      return response.data;

    } catch (error) {
      handleError("Failed to add product")
      return rejectWithValue(error.response.data);
    }
  }
)
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async ({userId,productId}, {getState, rejectWithValue }) => {
    const { cartItems } = getState().cart;
    const item = cartItems.find((i) => i.productId._id === productId);
    if (!item) {
      return rejectWithValue("Item not found in cart"); // Prevent unnecessary API call
    }
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart/${userId}/${productId}`)
      return response.data; // Return the ID of the removed product
    } catch (error) {
      handleError("Failed to remove product");
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseQuantityAsync = createAsyncThunk(
  "cart/decreaseQuantityAsync",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/cart/decrease`, {
        userId,
        productId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart/${userId}`);
      console.log(response);
      
      dispatch(clearCart()); // Clear Redux state after successful API call
      return { message: "Cart cleared successfully" };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const item = state.cartItems.find((previousState)=>{
    //     return previousState._id === action.payload._id
    //   })
    //   if (item) {
    //     item.quantity += 1; 
    //   } else {
    //     state.cartItems.push({ ...action.payload, quantity: 1 }); 
        
    //   }
    //   if(state.cartItems.length !==0){
    //     state.shipping = 500
    //   }
    //   state.totalQuantity += 1;
    //   state.totalPrice += action.payload.price;
    //   handleSuccess("Product added successfuly")

    // },
    // removeFromCart: (state, action) => {  
    //   const item = state.cartItems.find((i) => i._id === action.payload._id);
    //   console.log(item);
    //   if (item) {
    //     state.totalQuantity -= item.quantity;
    //     state.totalPrice -= item.price * item.quantity;
    //     state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id);
    //   }
    //   handleError("item removed")
    //   console.log(!state.cartItems);
      
    //   if(state.cartItems.length === 0){
    //     state.shipping = 0
    //   }
    // },
    // decreaseQuantity: (state, action) => {

    //   const item = state.cartItems.find((i) =>{
    //     return i._id === action.payload._id
    //   } );
      
      
    //   if (item) {
    //     if (item.quantity > 1) {
    //       item.quantity -= 1;
    //       state.totalQuantity -= 1;
    //       state.totalPrice -= item.price;
    //     } else {
    //       state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id);
    //       state.totalQuantity -= 1;
    //       state.totalPrice -= item.price;
    //     }
    //   }
    //   handleError("Product removed")
    //   if(state.cartItems.length === 0){
    //     state.shipping = 0
    //   }
    // },
    clearCart: (state) => { // New action to empty the cart
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0,
      state.subtotal = 0,
      state.shipping = 0,
      state.status ="success"
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchCart.fulfilled, (state, action) => {  
      state.cartItems = action.payload.cartItems;
      
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.subtotal = action.payload.subtotal;
      state.shipping = action.payload.shipping;
      state.status = "succeeded";
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(addToCartAsync.pending,(state)=>{
      state.status = "loading";
    })
    .addCase(addToCartAsync.fulfilled,(state,action)=>{
      
      state.totalQuantity = action.payload.totalQuantity;

      state.cartItems = action.payload.cartItems;
      state.totalPrice = action.payload.totalPrice;
      state.subtotal = action.payload.subtotal;
      state.shipping = action.payload.shipping;
      state.status = "succeeded"
      handleSuccess("Product added successfully");
    })

    .addCase(addToCartAsync.rejected,(state,action)=>{
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(decreaseQuantityAsync.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
      state.cartItems = action.payload.cartItems; // Update cart from backend response
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.subtotal = action.payload.subtotal;
      state.shipping = action.payload.shipping;
      handleError("Product quantity decreased");
    })
    .addCase(decreaseQuantityAsync.rejected, (state, action) => {
      state.error = action.payload;
      handleError("Failed to decrease quantity");
    })
    .addCase(removeFromCartAsync.pending, (state) => {
      state.status = "loading"; // Set loading state
    })
    .addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.totalQuantity = action.payload.totalQuantity;

      
      state.cartItems = action.payload.cartItems;
      state.totalPrice = action.payload.totalPrice;
      state.subtotal = action.payload.subtotal;
      state.shipping = action.payload.shipping;
      handleError("product removed")
      state.status = "succeeded";
    })
    .addCase(removeFromCartAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
    
});
export const {addToCart,removeFromCart,decreaseQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
