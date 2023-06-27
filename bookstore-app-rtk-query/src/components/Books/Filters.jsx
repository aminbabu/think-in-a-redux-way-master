import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredBook } from "../../features/filters/filtersSlice";

const Filters = () => {
  const { filteredQurey } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleClick = (value) => {
    dispatch(filteredBook(value));
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        className={`lws-filter-btn ${
          filteredQurey === "all" ? "active-filter" : ""
        }`}
        onClick={() => handleClick("all")}
      >
        All
      </button>
      <button
        type="button"
        className={`lws-filter-btn ${
          filteredQurey === "featured" ? "active-filter" : ""
        }`}
        onClick={() => handleClick("featured")}
      >
        Featured
      </button>
    </div>
  );
};

export default Filters;
