import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getBooks from "../redux/bookSlice/thunk/getBooks";
import { changeFilterStatus } from "../redux/filterSlice/creators";
import BookItem from "./BookItem";

export default function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const filters = useSelector((state) => state.filters);

  // fetch existing books from the server end
  useEffect(() => {
    dispatch(getBooks);
  }, [dispatch]);

  const handleFilterClick = (e, status) => {
    e.preventDefault();

    dispatch(changeFilterStatus(status));
  };

  // filter books by status
  const filteredByStatus = (book) => {
    return filters.status !== "featured" ? true : book?.featured;
  };

  // filter books by status
  const filteredBySearchedQuery = (book) => {
    return book?.name
      ?.toLowerCase()
      ?.includes(filters?.searchedQuery?.toLowerCase());
  };

  return (
    <div className="order-2 xl:-order-1">
      <div className="flex items-center justify-between mb-12">
        <h4 className="mt-2 text-xl font-bold">Book List</h4>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            className={`filter-btn ${
              filters.status === "*" ? "active-filter" : ""
            }`}
            id="lws-filterAll"
            onClick={(e) => handleFilterClick(e, "*")}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn ${
              filters.status === "featured" ? "active-filter" : ""
            }`}
            id="lws-filterFeatured"
            onClick={(e) => handleFilterClick(e, "featured")}
          >
            Featured
          </button>
        </div>
      </div>
      <div className="lws-bookContainer">
        {books.length
          ? books
              .filter(filteredBySearchedQuery)
              .filter(filteredByStatus)
              .map((book) => (
                <BookItem key={`book${book.id}`} bookItem={book} />
              ))
          : "No Book Found!"}
      </div>
    </div>
  );
}
