import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTags } from "./tagsAPI";

// initial state
export const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  tags: [],
};

// async thunk
export const tagsAsync = createAsyncThunk("tags/fetchTags", async () => {
  const tags = await getTags();

  return tags;
});

// slice
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(tagsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(tagsAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.tags = payload;
      })
      .addCase(tagsAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
        state.tags = [];
      });
  },
});

// reducer
export default tagsSlice.reducer;
