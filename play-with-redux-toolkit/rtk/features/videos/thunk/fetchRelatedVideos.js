const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");
const fetchVideo = require("./fetchVideo");

const sortByViews = (a, b) => {
  if (a?.views < b?.views) return -1;
  if (a?.views > b?.views) return 1;
  return 0;
};

const fetchRelatedVideos = createAsyncThunk(
  "videos/fetchRelatedVideos",
  async (tags, thunkAPI) => {
    // dispatch depedency thunk
    // const { payload: video } = await thunkAPI.dispatch(fetchVideo());

    // construct query string
    const queryStr = tags.map((tag) => `tags_like=${tag}`).join("&");
    // const queryStr = video?.tags?.map((tag) => `tags_like=${tag}`).join("&");

    const response = await fetch(`http://localhost:9000/videos?${queryStr}`);

    const videos = await response.json();

    // sorting videos according to descending order
    videos.sort(sortByViews).reverse();

    return videos;
  }
);

module.exports = fetchRelatedVideos;
