import { BOOKS_SEARCHED, FILTER_FLAG_CHANGED } from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_FLAG_CHANGED:
      return { ...state, status: payload.status };

    case BOOKS_SEARCHED:
      return { ...state, searchedQuery: payload.query };

    default:
      return state;
  }
};

export default reducer;
