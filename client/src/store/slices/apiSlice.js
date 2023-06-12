// the part of state that makes asynchronous requests to our backend : apiSlice is going to implement the thunk middleware

// under the hood it uses rtk query which is a library interacting with the backend API and the thunk middleware is built in!
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // for us baseUrl to be an empty string because of we use a proxy
  baseUrl: "",
});

export const apiSlice = createApi({
  baseQuery,
  // sometimes you have like blog post and stuff where you don't  want to make a fetch every single time , you want to cache them and use that data >>> user , products, blog post
  tagTypes: ["User", "Recipes"],

  // a built-in Builder to make our request when we make our request it won't be from this file you can think of this is like a parent to any other api slices
  endpoints: (builder) => ({}),
});
