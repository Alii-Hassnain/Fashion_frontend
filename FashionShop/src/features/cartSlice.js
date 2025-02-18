import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { handleSuccess } from "../utils/tostify";
import { handleError } from "../utils/tostify";
import { axiosCart } from "../utils/axiosFetch";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
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
      console.log(response);
      
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
      handleSuccess("product added susscessfully")
      console.log('Response from asyncThunk ',response);
      console.log('Response from asyncThunk ',response.data.cartItems);
         
      return response.data;

    } catch (error) {
      handleError("Failed to add product")
      return rejectWithValue(error.response.data);
    }
  }
)
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (productId, {getState, rejectWithValue }) => {
    const { cartItems } = getState().cart;
    const item = cartItems.find((i) => i._id === productId);

    if (!item) {
      return rejectWithValue("Item not found in cart"); // Prevent unnecessary API call
    }
    try {
      await axios.delete(`http://localhost:8080/api/cart${productId}`);
      handleSuccess("Product removed successfully");
      return productId; // Return the ID of the removed product
    } catch (error) {
      handleError("Failed to remove product");
      return rejectWithValue(error.response.data);
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
    decreaseQuantity: (state, action) => {

      const item = state.cartItems.find((i) => i._id === action.payload._id);
      // previous state is now stored in the item
      console.log(item);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id);
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        }
      }
      handleError("Product removed")
      if(state.cartItems.length === 0){
        state.shipping = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      console.log("this is fetch action" , action);
      

      // const item = state.cartItems.find((previousState)=>{
      //   return previousState._id === action.payload.cartItems
      // })
      // if (item) {
      //   item.quantity += 1; 
      // } else {
      //   state.cartItems.push({ ...action.payload.cartItems, quantity: 1 }); 
        
      // }
      // if(state.cartItems.length !==0){
      //   state.shipping = 500
      // }
      // state.totalQuantity += 1;
      // state.totalPrice += action.payload.price;
      // // handleSuccess("Product added successfuly")
      // state.status = "succeeded"
      
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.status = "succeeded";
      console.log("the  cart is fetched ",state.cartItems);
    
      
      
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(addToCartAsync.pending,(state)=>{
      state.status = "loading";
    })
    .addCase(addToCartAsync.fulfilled,(state,action)=>{
      // console.log("Response Payload:", action.payload);
      const newItem=action.payload
      if (!newItem || !newItem._id) {
        console.error("Invalid payload structure:", newItem);
        return;
      }
      // console.log("add to cart async",action);
      // console.log('state is ',state)
      // console.log("new item is added to the cart",[...state.cartItems,state.cartItems]);
      // console.log("new ...... items",state);
      
      const existingItem = state.cartItems.find((i)=>(
        i._id === action.payload._id
        // const cart=[...state.cartItems]
        // console.log('previous state :',cart)
      ))
      console.log('previous cart item : ',state.cartItems)
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.cartItems = [...state.cartItems, { ...newItem, quantity: 1 }];
      }
      console.log("Updated Cart Items:", state.cartItems);
      // console.log("this item is after the addtocartAsync",item);
      // console.log(state);
      
      // if (item) {
      //   item.quantity += 1; 
      // } else {
      //   state.cartItems.push({ ...action.payload.cartItems, quantity: 1 }); 
        
      // }
      // console.log("after pushing",state.cartItems);
      
      // if(state.cartItems.length !==0){
      //   state.shipping = 500
      // }
      // state.totalQuantity += 1;
      // state.totalPrice += action.payload.price;
      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    
      if (state.cartItems.length !== 0) {
        state.shipping = 500;
      }
    
      handleSuccess("Product added successfuly")

    })

    .addCase(addToCartAsync.rejected,(state,action)=>{
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(removeFromCartAsync.pending, (state) => {
      state.status = "loading"; // Set loading state
    })
    .addCase(removeFromCartAsync.fulfilled, (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload._id);
      console.log(item);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter((i) => i._id !== action.payload._id);
      }
      handleError("item removed")
      console.log(!state.cartItems);
      
      if(state.cartItems.length === 0){
        state.shipping = 0
      }
    })
    .addCase(removeFromCartAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  }
    
});
export const {addToCart,removeFromCart,decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
