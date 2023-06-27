import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProject,
  selectProject,
} from "../../features/filters/filtersSlice";

const Checkbox = ({ id, label, ...attributes }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.filters);

  const [checked, setChecked] = useState(true);

  const isSelected = projects?.includes(label);

  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (!isSelected) {
      dispatch(selectProject(label));
    } else {
      dispatch(removeProject(label));
    }
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        {...attributes}
        checked={checked}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
