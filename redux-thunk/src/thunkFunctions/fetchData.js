const { default: fetch } = require("node-fetch");

const fetchData = async (dispatch, getState) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );

  const posts = await response.json();

  dispatch({
    type: "blog/loaded",
    payload: posts,
  });

  console.log(`Number of blog posts: ${getState().length}`);
};

module.exports = {
  fetchData,
};
