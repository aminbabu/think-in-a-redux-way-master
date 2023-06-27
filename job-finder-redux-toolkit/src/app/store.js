import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../features/jobs/jobsSlice";
import jobFiltersReducer from "../features/jobFilters/jobFiltersSlice";
import jobReducer from "../features/job/jobSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    jobFilters: jobFiltersReducer,
    job: jobReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
