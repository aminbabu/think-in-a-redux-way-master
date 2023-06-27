import React from "react";
import JobFilters from "./JobFilters";
import JobList from "./JobList";

const JobBoard = () => {
  return (
    <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
      <JobFilters />

      <JobList />
    </main>
  );
};

export default JobBoard;
