import React from "react";
import ProjectList from "./ProjectList";
import TeamMembers from "./TeamMembers";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <!-- Projects List --> */}
      <ProjectList />

      {/* <!-- Team Members --> */}
      <TeamMembers />
    </div>
  );
};

export default Sidebar;
