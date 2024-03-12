import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "https://liquidstore-667c3-default-rtdb.firebaseio.com/";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    putProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `/profile/${localId}.json`,
        method: "PUT",
        body: { image },
      }),
    }),
    getProfileImage: builder.query({
      query: (localId) => ({
        url: `profile/${localId}.json`,
      }),
    }),
  }),
});

export const { usePutProfileImageMutation, useGetProfileImageQuery } =
  profileApi;
