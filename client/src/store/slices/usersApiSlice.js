// this is where we'll have all of our endpoints to work with the backend

// like a parent slice to this slice
import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

// it allows us to do is create our own endpoints in this file and it'll inject them into the endpoints in apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // here we can put all of our queries and mutations
    login: builder.mutation({
      // we're going to have data passed in because it's login so remember we're going to be sending email and password

      // we're going to set that to an object so parantheses around out curly braces
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
