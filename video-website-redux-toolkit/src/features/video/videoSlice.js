import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideo } from "./videoAPI";

// initial state
export const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  video: {},
};

// async thunk
export const videoAsync = createAsyncThunk("video/fetchVideo", async (id) => {
  const video = await getVideo(id);

  return video;
});

// slice
export const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(videoAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(videoAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.video = payload;
      })
      .addCase(videoAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = error?.message;
        state.video = {};
      });
  },
});

// reducer
export default videoSlice.reducer;
