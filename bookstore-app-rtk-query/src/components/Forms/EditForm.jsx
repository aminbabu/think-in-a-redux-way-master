import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditBookMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";

const EditForm = ({ book = {} }) => {
  const [editBook, { isSuccess, isLoading, isError }] = useEditBookMutation();

  // create navigator from react router
  const navigate = useNavigate();

  // local state
  const [newBook, setNewBook] = useState(book);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.name === "price" || target.name === "rating"
        ? Number(target.value)
        : target.value;

    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const { id, name, author, thumbnail, price, rating, featured } = newBook;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) editBook({ id, data: newBook });
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit} className="book-form">
      {!isLoading && isError && (
        <Error>There was an error adding a new book!</Error>
      )}

      <div className="space-y-2">
        <label htmlFor="lws-bookName">Book Name</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-author">Author</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-thumbnail">Image Url</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={thumbnail}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label htmlFor="lws-price">Price</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-rating">Rating</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
          checked={featured}
          onChange={handleChange}
        />
        <label htmlFor="lws-featured" className="ml-2 text-sm">
          {" "}
          This is a featured book{" "}
        </label>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="submit"
        id="lws-submit"
      >
        Edit Book
      </button>
    </form>
  );
};

export default EditForm;
