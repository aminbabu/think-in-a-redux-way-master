const { default: fetch } = require("node-fetch");
const {
  fetchPostsSucceded,
  fetchPostsRequrested,
  fetchPostsFailed,
} = require("../creators");

const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequrested());

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );

      const posts = await response.json();

      dispatch(fetchPostsSucceded(posts));
    } catch (error) {
      dispatch(fetchPostsFailed(error));
    }
  };
};

module.exports = fetchPosts;
