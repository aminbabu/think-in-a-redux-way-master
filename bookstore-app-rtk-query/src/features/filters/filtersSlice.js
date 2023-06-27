import { createSlice } from "@reduxjs/toolkit";

// initial state
export const initialState = {
  searchedQuery: "",
  filteredQurey: "all",
};

// filters slice
export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchedBook: (state, { payload }) => {
      state.searchedQuery = payload;
    },
    filteredBook: (state, { payload }) => {
      state.filteredQurey = payload;
    },
  },
});

export const { searchedBook, filteredBook } = filtersSlice.actions;
export default filtersSlice.reducer;
