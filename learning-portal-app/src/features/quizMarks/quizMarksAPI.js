import { apiSlice } from "features/api/apiSlice";

// videso api
export const quizMarksAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getQuizMarks: build.query({
      query: (queryStr = "") => `/quizMark${queryStr}`,
      providesTags: ["QuizMarks"],
    }),
    getQuizMark: build.query({
      query: (id) => `/quizMark/${id}`,
    }),
    addQuizMark: build.mutation({
      query: (data) => ({
        url: `/quizMark/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizMarks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQuizMarksQuery,
  useGetQuizMarkQuery,
  useAddQuizMarkMutation,
} = quizMarksAPI;
