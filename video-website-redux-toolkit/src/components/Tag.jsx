import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTag,
  selectTag,
} from "../features/videoFilters/videoFiltersSlice";

const Tag = ({ tag }) => {
  const dispatch = useDispatch();
  const { tags: selectedTags } = useSelector((state) => state.videoFilters);

  const { title } = tag || {};

  const isSelected = selectedTags?.includes(title);

  const handleClick = () => {
    isSelected ? dispatch(removeTag(title)) : dispatch(selectTag(title));
  };

  return (
    <button
      type="button"
      className={`${
        isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
      } px-4 py-1 rounded-full cursor-pointer`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Tag;
