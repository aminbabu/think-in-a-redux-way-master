import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedPosts } from "./relatedPostsAPI";

// initial state
const initialState = {
  isLoading: false,
  relatedPosts: [],
  isError: false,
  error: "",
};

// async thunk
export const relatedPostsAsync = createAsyncThunk(
  "relatedPosts/fetchPosts",
  async ({ tags, currentId }) => {
    const posts = await getRelatedPosts({ tags, currentId });

    return posts;
  }
);

export const relatedPostsSlice = createSlice({
  name: "relatedPosts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(relatedPostsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(relatedPostsAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.relatedPosts = payload;
      })
      .addCase(relatedPostsAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.relatedPosts = [];
        state.isError = true;
        state.error = error?.message;
      });
  },
});

export default relatedPostsSlice.reducer;
