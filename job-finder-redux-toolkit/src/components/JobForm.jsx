import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearEditJob,
  createJobAsync,
  editJob,
  updateJobAsync,
} from "../features/jobs/jobsSlice";
import { jobAsync } from "../features/job/jobSlice";

const initialJob = {
  lwsJobTitle: "",
  lwsJobType: "",
  lwsJobSalary: "",
  lwsJobDeadline: "",
};

const JobForm = () => {
  const dispatch = useDispatch();
  const { editableJob } = useSelector((state) => state.jobs);
  const { job: existingJob, isError } = useSelector((state) => state.job);

  const navigate = useNavigate();
  const { jobId } = useParams();

  const [newJob, setNewJob] = useState(initialJob);
  const [editMode, setEditMode] = useState(false);

  const { lwsJobTitle, lwsJobType, lwsJobSalary, lwsJobDeadline } = newJob;

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setNewJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("from submit");

    const jobItem = {
      title: lwsJobTitle,
      type: lwsJobType,
      salary: lwsJobSalary,
      deadline: lwsJobDeadline,
    };

    dispatch(createJobAsync(jobItem));
    setNewJob(initialJob);
    navigate("/");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedJob = {
      title: lwsJobTitle,
      type: lwsJobType,
      salary: lwsJobSalary,
      deadline: lwsJobDeadline,
    };

    dispatch(updateJobAsync({ id: editableJob.id, data: updatedJob }));
    dispatch(clearEditJob());
    setNewJob(initialJob);
    navigate("/");
  };

  useEffect(() => {
    const { id, title, type, salary, deadline } = editableJob;

    if (id) {
      setEditMode(true);
      setNewJob({
        lwsJobTitle: title,
        lwsJobType: type,
        lwsJobSalary: salary,
        lwsJobDeadline: deadline,
      });
    } else if (jobId) {
      if (!isError && !existingJob.id) {
        dispatch(jobAsync(jobId));
      }
      if (existingJob.id) {
        dispatch(editJob(existingJob));
      }
    } else {
      setEditMode(false);
      setNewJob(initialJob);
    }
  }, [dispatch, editableJob, navigate, jobId, isError, existingJob]);

  return (
    <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
      <h1 className="mb-10 text-center lws-section-title">
        {editMode ? "Edit Job" : "Add New Job"}
      </h1>

      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={editMode ? handleUpdate : handleSubmit}
          className="space-y-6"
        >
          <div className="fieldContainer">
            <label
              htmlFor="lws-JobTitle"
              className="text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <select
              id="lws-JobTitle"
              name="lwsJobTitle"
              required
              value={lwsJobTitle}
              onChange={handleChange}
            >
              <option hidden>Select Job</option>
              <option>Software Engineer</option>
              <option>Software Developer</option>
              <option>Full Stack Developer</option>
              <option>MERN Stack Developer</option>
              <option>DevOps Engineer</option>
              <option>QA Engineer</option>
              <option>Product Manager</option>
              <option>Social Media Manager</option>
              <option>Senior Executive</option>
              <option>Junior Executive</option>
              <option>Android App Developer</option>
              <option>IOS App Developer</option>
              <option>Frontend Developer</option>
              <option>Frontend Engineer</option>
              <option>Back End Developer</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobType">Job Type</label>
            <select
              id="lws-JobType"
              name="lwsJobType"
              required
              value={lwsJobType}
              onChange={handleChange}
            >
              <option hidden>Select Job Type</option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobSalary">Salary</label>
            <div className="flex border rounded-md shadow-sm border-slate-600">
              <span className="input-tag">BDT</span>
              <input
                type="number"
                name="lwsJobSalary"
                id="lws-JobSalary"
                required
                className="!rounded-l-none !border-0"
                placeholder="20,00,000"
                value={lwsJobSalary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobDeadline">Deadline</label>
            <input
              type="date"
              name="lwsJobDeadline"
              id="lws-JobDeadline"
              required
              value={lwsJobDeadline}
              onChange={handleChange}
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
            >
              {editMode ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default JobForm;
