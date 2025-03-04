import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleSuccess, handleError } from "../utils/tostify";
import axios from "axios";

const API_URL = "http://localhost:8080/product";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  shipping: 0,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/getCart`,{
      withCredentials:true
    }
    );
   // const cartItems = response.cartItems;
    //console.log("cart item",cartItems);
    console.log("response from backend in asyncthunk in cart fetching  : ",response.data)
    if(response.data.success){
      handleSuccess(response.data.message);
      console.log("response from backend : ",response.data.cart)
      return response.data.cart;
      }
      else{
        handleError(response.data.message)
        console.error("error response from backend : ",response)
        return rejectWithValue(response.data.message);
      }

  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async ({ productId , quantity }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/addToCart`, { productId , quantity},
      {
        withCredentials:true,
      }
    );
    console.log("response from backend in async thunk add to cart : ",response)
    if(response.data.success){
      handleSuccess("Product added successfully");
      console.log("response from backend : ",response.data.cart.items)
      
       return response.data.cart;
      // return productId;
    }
    else if(!response.data.success){
      handleError(response.data.message)
      console.error("error response from backend async thunk add to cart: ",response)
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.log("error in add to cart in catch block : ",error.response?.data.message)
    handleError(error.response?.data.message || "Failed to add product");
    return rejectWithValue(error.response?.data.message || "Failed to add product");
  }
});

export const removeFromCartAsync = createAsyncThunk("cart/removeFromCartAsync", async ({ productId }, { rejectWithValue }) => {
  try {
   const response = await axios.delete(`${API_URL}/deleteItemFromCart?productId=${productId}`, {     withCredentials:true});
   console.log("API call with productId:", productId);
   if(response.data.success){
    console.log("response from backend async thunk remove from cart:",response)
    handleSuccess("Product removed successfully");
    return response.data.cart;
  }else{
    handleError(response.data.message)
    console.error("error response from backend async thunk remove from cart: ",response)
    return rejectWithValue(response.data.message);
  }
  } catch (error) {
    handleError("Failed to remove product");
    return rejectWithValue(error.response?.data || "Failed to remove product");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { 
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
        console.log("pending");
      })
      // .addCase(fetchCart.fulfilled, (state, action) => {
      //   state.cartItems = action.payload.cart.items ;
      //   state.totalQuantity = action.payload.totalQuantity ;
      //   // state.totalPrice = action.payload.totalPrice ;
      //   state.shipping =  500 ;
      //   state.status = "succeeded";
      //   console.log("the  cart is fetched ",state.cartItems);
      // })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("Cart fetched successfully:", action.payload);
    
        // ✅ Use action.payload directly since it contains the cart object
        state.cartItems = action.payload.items;  // Array of cart items
    
       
        state.totalQuantity = action.payload.totalItems; 
        state.totalPrice = action.payload.totalPrice;
    
        // ✅ Set shipping cost
        state.shipping = 500;
        state.status = "succeeded";
    })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("error from backend in cart fetching : ",action.payload);
        console.log("error from backend in cart fetching : ",action);
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(addToCartAsync.fulfilled, (state, action) => {
      //   //alert("Action received in Redux!");
      //   console.log("action payload in reducer of add to cart ",action.payload)
      //   const item = state.cartItems.find((i) => i._id === action.payload._id);
      //   if (item) {
      //     item.quantity += 1;
      //   } else {
      //     state.cartItems.push({ ...action.payload, quantity: 1 });
      //   }
      //   state.totalQuantity += 1;
      //   state.totalPrice += action.payload.price;
      //   state.shipping = 500;
      //   state.status = "succeeded";
      // })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        console.log("Action payload in reducer of add to cart:", action.payload);
      
        // ✅ Replace state.cartItems with the updated cart items from backend
        state.cartItems = action.payload.items; // Array of updated cart items
      
        // ✅ Update total quantity and total price from payload
        state.totalQuantity = action.payload.totalItems; 
        state.totalPrice = action.payload.totalPrice;  
      
        // ✅ Set shipping cost
        state.shipping = 500;
        state.status = "succeeded";
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(removeFromCartAsync.fulfilled, (state, action) => {
      //   state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      //   state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      //   state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      //   state.shipping = state.cartItems.length > 0 ? 500 : 0;
      //   state.status = "succeeded";
      // })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        
        state.cartItems = action.payload.items; 
        console.log("action payload in fullfiled state : " ,action.payload);
        state.totalQuantity = action.payload.totalItems; 
        state.totalPrice = action.payload.totalPrice; 
        state.shipping = state.cartItems.length > 0 ? 500 : 0;
        state.status = "succeeded";
      })      
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const {addToCart,removeFromCart,decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;



