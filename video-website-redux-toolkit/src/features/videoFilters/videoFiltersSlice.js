import { createSlice } from "@reduxjs/toolkit";

// initial state
export const initialState = {
  queryStr: "",
  tags: [],
};

// slice
export const videoFiltersSlice = createSlice({
  name: "videoFilters",
  initialState,
  reducers: {
    search: (state, { payload }) => {
      state.queryStr = payload;
    },
    selectTag: (state, { payload }) => {
      state.tags.push(payload);
    },
    removeTag: (state, { payload }) => {
      state.tags = state.tags.filter((tag) => tag !== payload);
    },
  },
});

// actions
export const { search, removeTag, selectTag } = videoFiltersSlice.actions;
// reducer
export default videoFiltersSlice.reducer;
