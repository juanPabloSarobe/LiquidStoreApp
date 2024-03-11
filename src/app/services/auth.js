import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "https://identitytoolkit.googleapis.com/v1/";
const apiKey = "AIzaSyBYuAu245c0s2i7yAVtuSvB2aEFnWJhE50";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: `accounts:signUp?key=${apiKey}`,
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: `accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;