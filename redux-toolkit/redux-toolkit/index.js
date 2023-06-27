const store = require("./app/store");
const { counterActions } = require("./features/counter/counterSlice");
const fetchPosts = require("./features/posts/aysncWorks/fetchPosts");

// subscribe to store
store.subscribe(() => {
  // console.log(store.getState());
});

// dispatch actions
// store.dispatch(counterActions.increment(1));
// store.dispatch(counterActions.increment(2));
// store.dispatch(counterActions.decrement(1));

store.dispatch(fetchPosts());
