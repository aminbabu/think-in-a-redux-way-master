import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogedOut } from "features/auth/authSlice";

// prepare base query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// base query re-auth
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    // clean up local storage
    api.dispatch(userLogedOut());
    localStorage.removeItem("auth");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Videos",
    "Assignments",
    "AssignmentMarks",
    "Quizzes",
    "QuizMarks",
  ],
  endpoints: (build) => ({}),
});
