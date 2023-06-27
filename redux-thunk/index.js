const { legacy_createStore, applyMiddleware } = require("redux");
const { fetchThunk } = require("./src/middlewares/fetchThunk");
const { fetchData } = require("./src/thunkFunctions/fetchData");

// initial state
const initialState = [];

// reducer function
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "blog/added":
      return [...state, { ...payload }];

    case "blog/loaded":
      return [...state, ...payload];

    default:
      return state;
  }
};

// create store
const store = legacy_createStore(reducer, applyMiddleware(fetchThunk));

// subscribe to the store
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch actions
// store.dispatch({
//   type: "blog/added",
//   payload: {
//     userId: 1,
//     id: 6,
//     title: "Learn Redux JS",
//     body: "A JavaScript Library to build interactive ui.",
//   },
// });

store.dispatch(fetchData);
