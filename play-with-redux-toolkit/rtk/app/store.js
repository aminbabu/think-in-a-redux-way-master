const { configureStore } = require("@reduxjs/toolkit");
const videosReducer = require("../features/videos/videosSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger({
  collapsed: true,
  duration: true,
});

const store = configureStore({
  reducer: {
    vidoes: videosReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

module.exports = store;
