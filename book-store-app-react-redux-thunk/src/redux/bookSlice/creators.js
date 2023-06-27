import {
  BOOKS_FETCHED,
  BOOK_DELETED,
  BOOK_UPDATED,
  NEW_BOOK_ADDED,
} from "./identifiers";

export const addNewBook = (book) => {
  return {
    type: NEW_BOOK_ADDED,
    payload: { book },
  };
};

export const getExistingBooks = (books) => {
  return {
    type: BOOKS_FETCHED,
    payload: { books },
  };
};

export const bookDeleted = (id) => {
  return {
    type: BOOK_DELETED,
    payload: { id },
  };
};

export const bookUpdated = (book) => {
  return {
    type: BOOK_UPDATED,
    payload: { book },
  };
};
