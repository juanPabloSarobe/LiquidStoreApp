import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "https://liquidstore-667c3-default-rtdb.firebaseio.com/";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    putProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `/profile/${localId}/image.json`,
        method: "PUT",
        body: { image },
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: (localId) => ({
        url: `profile/${localId}.json`,
      }),
      providesTags: ["User"],
    }),
    putUserLocation: builder.mutation({
      query: ({ localId, address }) => ({
        url: `profile/${localId}/address.json`,
        method: "PUT",
        body: { address },
      }),
      invalidatesTags: ["User"],
    }),
    putUserColorTheme: builder.mutation({
      query: ({ localId, dark }) => ({
        url: `profile/${localId}/colorTheme.json`,
        method: "PUT",
        body: { dark },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  usePutProfileImageMutation,
  useGetProfileQuery,
  usePutUserLocationMutation,
  usePutUserColorThemeMutation,
} = profileApi;
