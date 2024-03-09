import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "https://liquidstore-667c3-default-rtdb.firebaseio.com/";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
    getProducts: builder.query({
      query: () => `products.json`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
    getProduct: builder.query({
      //query: (id) => `products/${id}.json?`,
      query: (id) => `products.json?orderBy="id"&equalTo=${id}`,
      transformResponse: (response) => {
        const data = Object.values(response);

        return data[0];
      },
    }),
    getCategories: builder.query({
      query: () => "categories.json",
    }),
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = shopApi;
