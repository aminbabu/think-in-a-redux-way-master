import React from "react";
import TeamLoader from "./TeamLoader";

const TaskLoader = () => {
  return (
    <div className="task-loader loader placeholder-glow">
      <span className="span-10 placeholder"></span>
      <span className="span-10 placeholder "></span>
      <span className="span-3 placeholder mr-auto"></span>
      <TeamLoader />
      <span className="span-3 placeholder"></span>
    </div>
  );
};

export default TaskLoader;
