const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

const fetchVideo = createAsyncThunk("videos/fetchVideo", async () => {
  const response = await fetch("http://localhost:9000/videos");

  const video = await response.json();

  return video;
});

module.exports = fetchVideo;
