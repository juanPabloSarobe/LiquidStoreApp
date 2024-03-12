import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "https://liquidstore-667c3-default-rtdb.firebaseio.com/";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Orders", "Categories", "Products"],
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
      providesTags: ["Categories"],
    }),
    getProducts: builder.query({
      query: () => `products.json`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
      providesTags: ["Products"],
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
      providesTags: ["Products"],
    }),
    getCategories: builder.query({
      query: () => "categories.json",
      providesTags: ["Categories"],
    }),

    postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: "orders.json",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: () => "orders.json",
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
      providesTags: ["Orders"],
    }),
    getOrdersByUser: builder.query({
      query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (response) => {
        console.log(response);
        const data = Object.values(response);
        return data;
      },
      providesTags: ["Orders"],
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
