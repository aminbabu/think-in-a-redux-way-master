const { combineReducers } = require("redux");
const counterReducer = require("../features/counter/reducer");
const postsReducer = require("../features/posts/reducer");

const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});

module.exports = rootReducer;
