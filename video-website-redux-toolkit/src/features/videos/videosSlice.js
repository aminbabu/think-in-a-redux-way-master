import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosAPI";

// initial state
export const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  videos: [],
};

// async thunks
export const videosAsync = createAsyncThunk(
  "videos/fetchVideos",
  async ({ tags, searchStr }) => {
    const videos = await getVideos(tags, searchStr);

    return videos;
  }
);

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(videosAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(videosAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.videos = payload;
      })
      .addCase(videosAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
        state.videos = [];
      });
  },
});

export default videosSlice.reducer;
