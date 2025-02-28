import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cartSlice"
import userReducer from "./features/userSlice"
import orderReducer from "./features/orderSlice"

export default configureStore({
  reducer: {
    cart:cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});