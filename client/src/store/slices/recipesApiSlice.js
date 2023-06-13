import { apiSlice } from "./apiSlice";

const RECIPES_URL = "/api/recipes";

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getRecipes: builder.query({
      query: `${RECIPES_URL}`,
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetRecipesQuery,
  useLazyGetRecipesQuery,
} = recipesApiSlice;
