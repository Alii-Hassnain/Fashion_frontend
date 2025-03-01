import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cartSlice"
import userReducer from "./features/userSlice"
import orderReducer from "./features/orderSlice"


import { persistStore,persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root", 
  storage, // ✅ Saves Redux state in localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});



export const persistor = persistStore(store); 
export default store;

// export default configureStore({
//   reducer: {
//     cart:cartReducer,
//     user: userReducer,
//     order: orderReducer,
//   },
// });