import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchJobs, sortJobs } from "../features/jobFilters/jobFiltersSlice";

const JobFilters = () => {
  const dispatch = useDispatch();

  const [searchedQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(searchJobs(searchedQuery));
    dispatch(sortJobs(sortQuery));
  }, [dispatch, searchedQuery, sortQuery]);

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            name="searchJob"
            value={searchedQuery}
            onChange={handleSearch}
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          value={sortQuery}
          onChange={handleSort}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Salary (Low to High)</option>
          <option value="highTolow">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;
