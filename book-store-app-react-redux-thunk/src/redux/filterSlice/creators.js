import { BOOKS_SEARCHED, FILTER_FLAG_CHANGED } from "./identifiers";

export const changeFilterStatus = (status) => {
  return {
    type: FILTER_FLAG_CHANGED,
    payload: { status },
  };
};

export const searchBooks = (query) => {
  return {
    type: BOOKS_SEARCHED,
    payload: { query },
  };
};
