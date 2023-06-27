import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobsAsync } from "../features/jobs/jobsSlice";
import JobItem from "./JobItem";
import Message from "./Message";

const JobList = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, jobs, error } = useSelector(
    (state) => state.jobs
  );
  const { jobType, searchedQuery, sortBySalary } = useSelector(
    (state) => state.jobFilters
  );

  const fitleredByType = (job) => {
    if (!jobType) return true;

    return job.type?.toLowerCase() === jobType.toLowerCase();
  };

  const sortJobsBySalary = (a, b) => {
    const salaryA = Number(a.salary);
    const salaryB = Number(b.salary);

    if (salaryA < salaryB) return -1;

    if (salaryA > salaryB) return 1;

    return 0;
  };

  const filterBySearch = (job) =>
    job?.title?.toLowerCase()?.includes(searchedQuery.toLowerCase());

  useEffect(() => {
    dispatch(getJobsAsync());
  }, [dispatch]);

  let content = null;

  if (isLoading) content = <Message>Loading...</Message>;

  if (!isLoading && isError)
    content = <Message className="error">{error}</Message>;

  if (!isLoading && !isError && jobs?.length === 0)
    content = <Message>There is no found!</Message>;

  if (!isLoading && !isError && jobs?.length) {
    const sortedJobs = [...jobs];

    if (sortBySalary.toLowerCase() === "lowtohigh") {
      sortedJobs.sort(sortJobsBySalary);
    }

    if (sortBySalary.toLowerCase() === "hightolow") {
      sortedJobs.sort(sortJobsBySalary).reverse();
    }

    content = sortedJobs
      .filter(fitleredByType)
      .filter(filterBySearch)
      .map((job) => <JobItem key={job.id} job={job} />);
  }

  return <div className="jobs-list">{content}</div>;
};

export default JobList;
