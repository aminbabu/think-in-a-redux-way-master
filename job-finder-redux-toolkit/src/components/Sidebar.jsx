import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearEditJob } from "../features/jobs/jobsSlice";
import { filterJobs } from "../features/jobFilters/jobFiltersSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handlejobs = () => {
    dispatch(filterJobs(""));
  };

  const handleIntershipjobs = () => {
    dispatch(filterJobs("Internship"));
  };

  const handleFulltimejobs = () => {
    dispatch(filterJobs("Full Time"));
  };

  const handleRemotejobs = () => {
    dispatch(filterJobs("Remote"));
  };

  const handleNewJob = () => {
    dispatch(clearEditJob());
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="main-menu menu-active"
              id="lws-alljobs-menu"
              onClick={handlejobs}
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <Link
                  className="sub-menu"
                  to="/jobs/internship"
                  id="lws-internship-menu"
                  onClick={handleIntershipjobs}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  &nbsp;Internship
                </Link>
              </li>
              <li>
                <Link
                  className="sub-menu"
                  to="/jobs/fulltime"
                  id="lws-fulltime-menu"
                  onClick={handleFulltimejobs}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  &nbsp;Full Time
                </Link>
              </li>
              <li>
                <Link
                  className="sub-menu"
                  to="/jobs/remote"
                  id="lws-remote-menu"
                  onClick={handleRemotejobs}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  &nbsp;Remote
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/create"
              className="main-menu"
              id="lws-addJob-menu"
              role="button"
              onClick={handleNewJob}
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              &nbsp;<span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
