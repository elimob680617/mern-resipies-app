// slices is where you can keep certain pieces of state as well as reducers that take in actions

// authSlice is going to take the user data that we get back from our API and put it in localstorage and also put it in out auth state: ID ,Email, Name , not the token remember THE TOKEN is stored in httpOnly cookie , it'll also have the logout where it will destroy it from localstorage

// there is two different kinds of slices: 1. there's one like this which is just local stuff, and 2. there's an API slice where it implements the Redux thunk middleware so that you can make asynchronous request

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // initial state is going to check localstorage
  useInfo: localStorage.getItem("userInfo")
    ? // if userInfo is there then we want to use that and we also want to parse it and we will turn it into an actual JavaScript object
      JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// create authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 2 function reducers : 1.setCredencials which is going to set userInfo to localStorage 2.logOut which is going to take out info out of localStorage

    // arrow functions that takes in state and action

    // the action that we pass in is going to be the user data
    setCredentials: (state, action) => {
      // we are going to set user data (action : name , email, ID) to our userInfo state
      state.useInfo = action.payload;
      // then we want to save that also to localStorage and strigify it before we put it in!
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    // this is the front end logout to kill the localStorage
    logout: (state, action) => {
      // clearing it from our both state and localStorage
      state.useInfo = null;
      // remove userInfo
      localStorage.removeItem("userInfo");
    },
  },
});

// when you call this that's an action when it changes your state that's reducer!!
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
