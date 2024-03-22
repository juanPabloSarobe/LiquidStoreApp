import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "https://liquidstore-667c3-default-rtdb.firebaseio.com/";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    patchProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `/profile/${localId}.json`,
        method: "PATCH",
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
    patchUserLocation: builder.mutation({
      query: ({ localId, address }) => ({
        url: `profile/${localId}.json`,
        method: "PATCH",
        body: { address },
      }),
      invalidatesTags: ["User"],
    }),
    patchUserColorTheme: builder.mutation({
      query: ({ localId, dark }) => ({
        url: `profile/${localId}.json`,
        method: "PATCH",
        body: { dark },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  usePatchProfileImageMutation,
  useGetProfileQuery,
  usePatchUserLocationMutation,
  usePatchUserColorThemeMutation,
} = profileApi;
