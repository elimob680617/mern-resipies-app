// store a place to hold all of our state and then we can dispatch actions to change that state , we can also subscribe to that store to get the current state!
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // able to use the Redux Dev tools
  devTools: true,
});

export default store;
