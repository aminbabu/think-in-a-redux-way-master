const initialState = require("./initialState");
const { POST_REQUESTED, POST_FAILED, POST_SUCCEDED } = require("./identifiers");

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_REQUESTED:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case POST_SUCCEDED:
      return {
        ...state,
        loading: false,
        posts: [...payload.posts],
        error: "",
      };

    case POST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error.message,
      };

    default:
      return state;
  }
};

module.exports = reducer;
