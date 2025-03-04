import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cartSlice"

//  const loggerMiddleware = (store) => (next) => (action) => {
//   console.log("Dispatching action:", action);
//   let result = next(action);
//   console.log("Updated state:", store.getState());
//   return result;
// };

export default configureStore({
  reducer: {
    cart:cartReducer
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
});
