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
      //de esta forma se consulta por el nombre del objeto en product/5.json
      //query: (id) => `products/${id}.json?`,
      query: (id) => `products.json?orderBy="id"&equalTo=${id}`,
      transformResponse: (response) => {
        const data = Object.values(response);
        //cuando la respuesta debe devolver un solo item convertimos en array y retornamos el primer valor
        return data[0];
      },
    }),
    getCategories: builder.query({
      query: () => "categories.json",
    }),
    postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: "orders.json",
        method: "POST",
        body: order,
      }),
    }),
    getOrders: builder.query({
      query: () => "orders.json",
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
    getOrdersByUser: builder.query({
      query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  usePostOrderMutation,
  useGetOrdersQuery,
  useGetOrdersByUserQuery,
} = shopApi;
