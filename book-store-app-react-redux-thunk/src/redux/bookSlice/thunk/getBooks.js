import { getExistingBooks } from "../creators";

const getBooks = async (dispatch) => {
  try {
    const response = await fetch("http://localhost:9000/books");

    const books = await response.json();

    dispatch(getExistingBooks(books));
  } catch (err) {
    console.log(err.message);
  }
};

export default getBooks;
