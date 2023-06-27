import React from "react";
import { useDispatch } from "react-redux";
import { searchQueryChanged } from "../../features/filters/filtersSlice";
import debounce from "../../utils/debounce";

const Searchbox = () => {
  const dispatch = useDispatch();

  const doSearch = (value) => {
    dispatch(searchQueryChanged(value.trim()));
  };

  const handleChange = debounce(doSearch, 500);

  return (
    <div className="flex-1 max-w-xs search-field group">
      <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
      <input
        type="text"
        placeholder="Search Task"
        className="search-input text-[#111827]"
        id="lws-searchTask"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbox;
