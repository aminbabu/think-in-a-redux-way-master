import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./postsAPI";

// initial state
const initialState = {
  isLoading: false,
  posts: [],
  isError: false,
  error: "",
};

// async thunk
export const postsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (queryStr) => {
    const posts = await getPosts(queryStr);

    return posts;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(postsAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(postsAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.posts = [];
        state.isError = true;
        state.error = error?.message;
      });
  },
});

export default postsSlice.reducer;
