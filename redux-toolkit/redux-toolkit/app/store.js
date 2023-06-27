const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const counterReducer = require("../features/counter/counterSlice");
const postsReducer = require("../features/posts/postsSlice");

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

module.exports = store;
