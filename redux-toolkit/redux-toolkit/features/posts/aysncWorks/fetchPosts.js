const { createAsyncThunk } = require("@reduxjs/toolkit");

const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  const posts = await response.json();

  return posts;
});

module.exports = fetchPosts;
