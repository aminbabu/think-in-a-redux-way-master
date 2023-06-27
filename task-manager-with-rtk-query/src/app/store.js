import { configureStore } from "@reduxjs/toolkit";
import { taskManagerAPI } from "../features/api/TaskManagerAPI";
import { filtersSlice } from "../features/filters/filtersSlice";

const store = configureStore({
  reducer: {
    [taskManagerAPI.reducerPath]: taskManagerAPI.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    taskManagerAPI.middleware,
  ],
  devTools: import.meta.env.DEV,
});

export default store;
