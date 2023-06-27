import React from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/Forms/EditForm";
import Error from "../components/ui/Error";
import Loading from "../components/ui/loader/Loading";
import { useGetBookQuery } from "../features/api/apiSlice";

const EditBook = () => {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <Loading>Loading...</Loading>;
  }

  if (!isLoading && isError) {
    content = <Error>There was an error occured!</Error>;
  }

  if (!isLoading && !isError && !book?.id) {
    content = <Error>This book cannot be edited!</Error>;
  }

  if (!isLoading && !isError && book?.id) {
    content = <EditForm book={book} />;
  }

  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          {content}
        </div>
      </div>
    </main>
  );
};

export default EditBook;
