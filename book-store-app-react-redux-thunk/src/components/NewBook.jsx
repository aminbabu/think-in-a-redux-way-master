import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addBook from "../redux/bookSlice/thunk/addBook";
import updateBook from "../redux/bookSlice/thunk/updateBook";
import { editBook } from "../redux/bookFacilitySlice/creators";

const initialBook = {
  name: "",
  author: "",
  thumbnail: "",
  price: "",
  rating: "",
  featured: false,
};

const getSanitizedValue = (target) => {
  if (target.type === "number") {
    return Number(target.value);
  }

  if (target.type === "checkbox") {
    return target.checked;
  }

  return target.value;
};

export default function NewBook() {
  const dispatch = useDispatch();
  const facilities = useSelector((state) => state.facilities);
  const [book, setBook] = useState(initialBook);

  const handleInputChage = (e) => {
    const target = e.target;
    const value = getSanitizedValue(target);
    const name = target.name;

    setBook((prevBook) => {
      return {
        ...prevBook,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = (e, actionType) => {
    e.preventDefault();

    if (actionType === "update") {
      dispatch(updateBook(book));
    } else {
      dispatch(addBook(book));
    }

    dispatch(editBook(initialBook, false));

    setBook(initialBook);
  };

  useEffect(() => {
    if (!facilities.editableBook) return;

    setBook({ ...facilities.editableBook });
  }, [facilities]);

  return (
    <div>
      <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
        <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
        <form
          onSubmit={(e) =>
            handleFormSubmit(e, !facilities.isUpdated ? "addNew" : "update")
          }
          className="book-form"
        >
          <div className="space-y-2">
            <label htmlFor="input-Bookname">Book Name</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookname"
              name="name"
              value={book.name}
              onChange={handleInputChage}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="input-Bookauthor">Author</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookauthor"
              name="author"
              value={book.author}
              onChange={handleInputChage}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="input-Bookthumbnail">Image Url</label>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookthumbnail"
              name="thumbnail"
              value={book.thumbnail}
              onChange={handleInputChage}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 pb-4">
            <div className="space-y-2">
              <label htmlFor="input-Bookprice">Price</label>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookprice"
                name="price"
                value={book.price}
                onChange={handleInputChage}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-Bookrating">Rating</label>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookrating"
                name="rating"
                min="1"
                max="5"
                value={book.rating}
                onChange={handleInputChage}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="input-Bookfeatured"
              type="checkbox"
              name="featured"
              className="w-4 h-4"
              checked={book.featured}
              onChange={handleInputChage}
            />
            <label htmlFor="input-Bookfeatured" className="ml-2 text-sm">
              This is a featured book
            </label>
          </div>

          <button type="submit" className="submit" id="submit">
            {!facilities.isUpdated ? "Add Book" : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
