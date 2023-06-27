const { createSlice } = require("@reduxjs/toolkit");
const initialState = require("./initialState");
const fetchRelatedVideos = require("./thunk/fetchRelatedVideos");
const fetchVideo = require("./thunk/fetchVideo");

const videosSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state) => {
      state.video.loading = true;
      state.video.item = {};
      state.video.error = "";
    });

    builder.addCase(fetchVideo.fulfilled, (state, { payload }) => {
      state.video.loading = false;
      state.video.item = payload;
      state.video.error = "";
    });

    builder.addCase(fetchVideo.rejected, (state, { error }) => {
      state.video.loading = false;
      state.video.item = {};
      state.video.error = error.message;
    });

    builder.addCase(fetchRelatedVideos.pending, (state) => {
      state.relatedVideos.loading = true;
      state.relatedVideos.videos = [];
      state.relatedVideos.error = "";
    });

    builder.addCase(fetchRelatedVideos.fulfilled, (state, { payload }) => {
      state.relatedVideos.loading = false;
      state.relatedVideos.videos = payload;
      state.relatedVideos.error = "";
    });

    builder.addCase(fetchRelatedVideos.rejected, (state, { error }) => {
      state.relatedVideos.loading = false;
      state.relatedVideos.videos = [];
      state.relatedVideos.error = error.message;
    });
  },
});

module.exports = videosSlice.reducer;
