import {
  BOOKS_FETCHED,
  BOOK_DELETED,
  BOOK_UPDATED,
  NEW_BOOK_ADDED,
} from "./identifiers";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_BOOK_ADDED:
      return [...state, { ...payload.book }];

    case BOOKS_FETCHED:
      return [...state, ...payload.books];

    case BOOK_DELETED:
      return state.filter((book) => book.id !== payload.id);

    case BOOK_UPDATED:
      return state.map((book) =>
        book.id !== payload.book.id ? { ...book } : { ...payload.book }
      );

    default:
      return state;
  }
};

export default reducer;
