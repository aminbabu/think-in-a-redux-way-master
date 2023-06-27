const {
  incrementCounter,
  decrementCounter,
} = require("./features/counter/creators");
const store = require("./app/store");
const fetchPosts = require("./features/posts/thunk/fetchPosts");

// subscribe to store
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch actions
// store.dispatch(incrementCounter(1));
// store.dispatch(incrementCounter(2));
// store.dispatch(decrementCounter(3));
store.dispatch(fetchPosts());
