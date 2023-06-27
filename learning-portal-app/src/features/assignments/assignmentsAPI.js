import { apiSlice } from "features/api/apiSlice";

// videso api
export const assignmentsAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAssignments: build.query({
      query: (queryStr = "") => `/assignments?${queryStr}`,
      providesTags: ["Assignments"],
      transformResponse: async (response, meta, arg) => {
        const totalCount = meta.response.headers.get("X-Total-Count");

        return { data: response, totalCount };
      },
    }),
    getAssignment: build.query({
      query: (id) => `/assignments/${id}`,
    }),
    deleteAssignment: build.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
    editAssignemnt: build.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),
    addAssignment: build.mutation({
      query: (data) => ({
        url: `/assignments/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useLazyGetAssignmentQuery,
  useDeleteAssignmentMutation,
  useEditAssignemntMutation,
  useAddAssignmentMutation,
} = assignmentsAPI;
