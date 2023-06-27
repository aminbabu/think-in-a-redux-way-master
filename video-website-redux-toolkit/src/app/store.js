import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";
import videoReducer from "../features/video/videoSlice";
import tagsReducer from "../features/tags/tagsSlice";
import relatedVideosReducer from "../features/relatedVideos/relatedVideosSlice";
import videoFiltersReducer from "../features/videoFilters/videoFiltersSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    video: videoReducer,
    tags: tagsReducer,
    relatedVideos: relatedVideosReducer,
    videoFilters: videoFiltersReducer,
  },
});
