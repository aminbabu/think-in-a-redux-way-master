import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postsAsync } from "../features/posts/postsSlice";

const initialState = { sort: "", filter: "all" };

const Sidebar = () => {
  const dispatch = useDispatch();
  const [query, setQyery] = useState(initialState);

  const { sort, filter } = query || {};

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setQyery((prevQuery) => {
      return { ...prevQuery, [name]: value };
    });
  };

  useEffect(() => {
    let queryStr = "";
    if (sort === "newest") queryStr += "_sort=createdAt&_order=desc";
    if (sort === "most_liked") queryStr += "_sort=likes&_order=desc";
    if (filter === "all") queryStr += "";
    if (filter === "saved") queryStr += "&isSaved=true";

    dispatch(postsAsync(queryStr));
  }, [dispatch, sort, filter]);

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            value={sort}
            onChange={handleChange}
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            {/* <!-- handle filter on button click --> */}
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                className="radio"
                value="all"
                checked={filter === "all"}
                onChange={handleChange}
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                className="radio"
                value="saved"
                checked={filter === "saved"}
                onChange={handleChange}
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
