import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Place Order
export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (orderData, { rejectWithValue }) => {
      try {
        const response = await axios.post("/api/order", orderData);
        console.log("this is the cart side");
        return response?.data; // Return order response
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Order failed");
      }
    }
  );


  const orderSlice = createSlice({
    name: "order",
    initialState: {
      orders: [],
      loading: false,
      error: null,
      success: false,
    },
    reducers: {
      clearOrderState: (state) => {
        state.success = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(placeOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(placeOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.orders.push(action.payload);
        })
        .addCase(placeOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // .addCase(fetchUserOrders.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        // .addCase(fetchUserOrders.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.userOrders = action.payload;
        // })
        // .addCase(fetchUserOrders.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload;
        // })
        // .addCase(fetchAllOrders.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        // .addCase(fetchAllOrders.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.orders = action.payload;
        // })
        // .addCase(fetchAllOrders.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload;
        // });
    },
  });
  
  export const { clearOrderState } = orderSlice.actions;
  export default orderSlice.reducer;