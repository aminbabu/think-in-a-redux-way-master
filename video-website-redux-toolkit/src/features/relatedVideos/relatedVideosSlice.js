import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideo } from "./relatedVideosAPI";

// initial state
export const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  relatedVideos: [],
};

// async thunk
export const relatedVideosAsync = createAsyncThunk(
  "relatedVideos/fetchVideo",
  async ({ id, tags }) => {
    const video = await getVideo(id, tags);

    return video;
  }
);

// slice
export const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(relatedVideosAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(relatedVideosAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.relatedVideos = payload;
      })
      .addCase(relatedVideosAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = error?.message;
        state.relatedVideos = [];
      });
  },
});

// reducer
export default relatedVideosSlice.reducer;
