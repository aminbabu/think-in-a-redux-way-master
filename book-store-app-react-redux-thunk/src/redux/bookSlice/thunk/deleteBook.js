import { bookDeleted } from "../creators";

const deleteBook = (BookID) => {
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:9000/books/${BookID}`, {
        method: "DELETE",
      });

      dispatch(bookDeleted(BookID));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export default deleteBook;
