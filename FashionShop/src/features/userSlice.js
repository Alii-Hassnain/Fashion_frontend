import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userData: null,
  userID: null,
  userName: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      console.log("inside the userSlice" , action.payload)
      state.userData = action.payload;
      state.userID = action.payload._id; 
      state.userName = action.payload.username;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      console.log("this is running userData is null");
      
      state.userData = null;
      state.userID = null;
      state.userName = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
