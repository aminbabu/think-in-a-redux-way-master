import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPost, toggleSaved, updateLikes } from "./postAPI";

// initial state
const initialState = {
  isLoading: false,
  post: {},
  isError: false,
  error: "",
};

// async thunk
export const postAsync = createAsyncThunk("post/fetchPost", async (id) => {
  const post = await getPost(id);

  return post;
});

export const updateLikesAsync = createAsyncThunk(
  "post/updateLikes",
  async ({ id, likes }) => {
    const post = await updateLikes({ id, likes });

    return post;
  }
);

export const toggleSavedAsync = createAsyncThunk(
  "post/toggleSaved",
  async ({ id, isSaved }) => {
    const post = await toggleSaved({ id, isSaved });

    return post;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(postAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post = payload;
      })
      .addCase(postAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.post = {};
        state.isError = true;
        state.error = error?.message;
      })
      .addCase(updateLikesAsync.pending, (state) => {
        state.isError = false;
        state.error = "";
      })
      .addCase(updateLikesAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post.likes = payload.likes;
      })
      .addCase(updateLikesAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
      })
      .addCase(toggleSavedAsync.pending, (state) => {
        state.isError = false;
        state.error = "";
      })
      .addCase(toggleSavedAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.post.isSaved = payload.isSaved;
      })
      .addCase(toggleSavedAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
      });
  },
});

export default postSlice.reducer;
