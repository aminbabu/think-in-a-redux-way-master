import { addNewBook } from "../creators";

const addBook = (bookItem) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:9000/books`, {
        method: "POST",
        body: JSON.stringify({ ...bookItem }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const book = await response.json();

      dispatch(addNewBook(book));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export default addBook;
