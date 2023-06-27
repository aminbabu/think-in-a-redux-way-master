import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

// quizzes slice initial state
export const initialState = {
  currentQuizzes: [],
};

// quizzes slice
export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    quizzesModified: (state, { payload }) => {
      const quizzesDeepCopy = cloneDeep(payload);

      quizzesDeepCopy?.forEach((quiz) => {
        const { options } = quiz || {};

        options?.forEach((option) => (option.checked = false));
      });

      state.currentQuizzes = quizzesDeepCopy;
    },
    quizzesUpdated: (state, { payload }) => {
      const { checked, quizId, index } = payload || {};

      state.currentQuizzes.forEach((quiz) =>
        quiz?.id === quizId ? (quiz.options[index].checked = checked) : quiz
      );
    },
  },
});

export const { quizzesModified, quizzesUpdated } = quizzesSlice.actions;
