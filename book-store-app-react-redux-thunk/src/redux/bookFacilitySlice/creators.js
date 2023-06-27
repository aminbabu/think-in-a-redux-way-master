import { EDIT_BOOK } from "./identifiers";

export const editBook = (book, isUpdated) => {
  return {
    type: EDIT_BOOK,
    payload: { book, isUpdated },
  };
};
