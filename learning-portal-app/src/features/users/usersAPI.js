import { apiSlice } from "features/api/apiSlice";

// users api
export const usersAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (queryStr = "") => `/users${queryStr}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = usersAPI;
