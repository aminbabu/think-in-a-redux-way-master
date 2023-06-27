import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "features/api/apiSlice";
import { assignmentMarksSlice } from "features/assignmentMarks/assignmentMarksSlice";
import { assignmentsSlice } from "features/assignments/assignmentsSlice";
import { authSlice } from "features/auth/authSlice";
import { quizMarksSlice } from "features/quizMarks/quizMarksSlice";
import { quizzesSlice } from "features/quizzes/quizzesSlice";
import { usersSlice } from "features/users/usersSlice";
import { videosSlice } from "features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [videosSlice.name]: videosSlice.reducer,
    [assignmentsSlice.name]: assignmentsSlice.reducer,
    [quizzesSlice.name]: quizzesSlice.reducer,
    [assignmentMarksSlice.name]: assignmentMarksSlice.reducer,
    [quizMarksSlice.name]: quizMarksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
});
