import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectFilterChanged,
  projectSelected,
} from "../../features/filters/filtersSlice";

const ProjectItem = ({ project = {} }) => {
  const dispatch = useDispatch();
  const { projects = [] } = useSelector((state) => state.filters);

  const [isChecked, setIsChecked] = useState(true);

  const { id, projectName, colorClass } = project;

  const isSelected = projects
    .map((project) => project?.toLowerCase())
    ?.includes(projectName?.toLowerCase());

  const handleChange = (e) => {
    setIsChecked(e.target.checked);

    if (!isSelected) {
      dispatch(projectSelected(projectName));
    } else {
      dispatch(projectFilterChanged(projectName));
    }
  };

  return (
    <div className="checkbox-container">
      <input
        id={id}
        type="checkbox"
        className={colorClass}
        checked={isChecked}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id} className="label">
        {projectName}
      </label>
    </div>
  );
};

export default ProjectItem;
