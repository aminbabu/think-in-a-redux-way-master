import React from "react";
import { useSelector } from "react-redux";
import { useGetBooksQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import BookLoader from "../ui/loader/BookLoader";
import Book from "./Book";

const BookList = () => {
  const { isLoading, isError, data: books } = useGetBooksQuery();
  const { searchedQuery, filteredQurey } = useSelector(
    (state) => state.filters
  );

  const filteredBySearchedQuery = (book) =>
    book?.name?.toLowerCase()?.includes(searchedQuery?.toLowerCase());

  const filteredByType = (book) =>
    filteredQurey === "all" ? true : book?.featured;

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <BookLoader />
        <BookLoader />
        <BookLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error>There was an error occured!</Error>;
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = <Error>There is no book found!</Error>;
  }

  if (!isLoading && !isError && books?.length) {
    content = books
      .filter(filteredBySearchedQuery)
      .filter(filteredByType)
      .map((book) => <Book key={book.id} book={book} />);
  }

  return (
    <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
      {content}
    </div>
  );
};

export default BookList;
