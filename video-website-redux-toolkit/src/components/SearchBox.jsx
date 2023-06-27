import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.svg";
import { search } from "../features/videoFilters/videoFiltersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const match = useMatch("/");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(query));

    if (!match) navigate("/");
  };

  return (
    <div className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
      <form onSubmit={handleSubmit}>
        <input
          className="outline-none border-none mr-2"
          type="search"
          name="search"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </form>
      <img
        className="inline h-4 cursor-pointer"
        src={searchIcon}
        alt="Search"
      />
    </div>
  );
};

export default SearchBox;
