import { createSlice } from "@reduxjs/toolkit";

// initial state
export const initialState = {
  projects: [],
  searchQuery: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    projectsAdded: (state, { payload }) => {
      state.projects = payload;
    },
    projectSelected: (state, { payload }) => {
      state.projects.push(payload);
    },
    projectFilterChanged: (state, { payload }) => {
      state.projects = state.projects.filter(
        (project) => project.toLowerCase() != payload.toLowerCase()
      );
    },
    searchQueryChanged: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
});

export const {
  projectFilterChanged,
  projectSelected,
  projectsAdded,
  searchQueryChanged,
} = filtersSlice.actions;
export default filtersSlice.reducer;
