import { apiSlice } from "features/api/apiSlice";

// videso api
export const quizzesAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getQuizzes: build.query({
      query: (queryStr = "") => `/quizzes${queryStr}`,
      providesTags: ["Quizzes"],
      transformResponse: async (response, meta, arg) => {
        const totalCount = meta.response.headers.get("X-Total-Count");

        return { data: response, totalCount };
      },
    }),
    getQuiz: build.query({
      query: (id) => `/quizzes/${id}`,
    }),
    deleteQuiz: build.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
    editQuiz: build.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    addQuiz: build.mutation({
      query: (data) => ({
        url: `/quizzes/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useLazyGetQuizQuery,
  useDeleteQuizMutation,
  useEditQuizMutation,
  useAddQuizMutation,
} = quizzesAPI;
