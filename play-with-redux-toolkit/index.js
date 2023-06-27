const { dispatch } = require("./rtk/app/store");
const fetchRelatedVideos = require("./rtk/features/videos/thunk/fetchRelatedVideos");
const fetchVideo = require("./rtk/features/videos/thunk/fetchVideo");

// dispatch actions
const fetchData = async () => {
  const { payload: video } = await dispatch(fetchVideo());

  if (video?.tags) {
    await dispatch(fetchRelatedVideos(video.tags));
  }
};

fetchData();
