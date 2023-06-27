import { bookUpdated } from "../creators";

const updateBook = (bookItem) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/books/${bookItem.id}`, {
      method: "PATCH",
      body: JSON.stringify(bookItem),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const book = await response.json();

    dispatch(bookUpdated(book));
  };
};

export default updateBook;
