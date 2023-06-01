// store a place to hold all of our state and then we can dispatch actions to change that state , we can also subscribe to that store to get the current state!
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // able to use the Redux Dev tools
  devTools: true,
});

export default store;
