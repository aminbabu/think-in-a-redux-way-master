import { apiSlice } from "features/api/apiSlice";

// videso api
export const assignmentMarksAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAssignmentMarks: build.query({
      query: (queryStr = "") => `/assignmentMark${queryStr}`,
      providesTags: ["AssignmentMarks"],
      transformResponse: async (response, meta, arg) => {
        const totalCount = meta.response.headers.get("X-Total-Count");

        return { data: response, totalCount };
      },
    }),
    getAssignmentMark: build.query({
      query: (id) => `/assignmentMark/${id}`,
    }),
    addAssignmentMark: build.mutation({
      query: (data) => ({
        url: "/assignmentMark/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssignmentMarks"],
    }),
    editAssignmentMark: build.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AssignmentMarks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssignmentMarksQuery,
  useGetAssignmentMarkQuery,
  useLazyGetAssignmentMarkQuery,
  useAddAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
} = assignmentMarksAPI;
