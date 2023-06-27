const { default: fetch } = require("node-fetch");

const fetchData = (store) => (next) => async (action) => {
  if (action.type === "blog/fetched") {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    const posts = await response.json();

    store.dispatch({
      type: "blog/loaded",
      payload: posts,
    });

    console.log(`Number of blog posts: ${store.getState().length}`);

    return;
  }

  return next(action);
};

module.exports = {
  fetchData,
};
