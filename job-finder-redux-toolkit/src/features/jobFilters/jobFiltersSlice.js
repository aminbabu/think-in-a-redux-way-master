import { createSlice } from "@reduxjs/toolkit";

// initial state
export const initialState = {
  jobType: "",
  searchedQuery: "",
  sortBySalary: "",
};

export const jobFiltersSlice = createSlice({
  name: "jobFilters",
  initialState,
  reducers: {
    filterJobs: (state, { payload }) => {
      state.jobType = payload;
    },
    searchJobs: (state, { payload }) => {
      state.searchedQuery = payload;
    },
    sortJobs: (state, { payload }) => {
      state.sortBySalary = payload;
    },
  },
});

export const { filterJobs, searchJobs, sortJobs } = jobFiltersSlice.actions;
export default jobFiltersSlice.reducer;
