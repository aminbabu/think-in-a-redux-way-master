import { createSlice } from "@reduxjs/toolkit";

// videos slice initial state
export const initialState = {
  video: {},
};

// videos slice
export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    selectedVideo: (state, { payload }) => {
      state.video = payload;
    },
  },
});

export const { selectedVideo } = videosSlice.actions;
