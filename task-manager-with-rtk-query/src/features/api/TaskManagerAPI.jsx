import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskManagerAPI = createApi({
  reducerPath: "taskManagerAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  endpoints: () => ({}),
});
