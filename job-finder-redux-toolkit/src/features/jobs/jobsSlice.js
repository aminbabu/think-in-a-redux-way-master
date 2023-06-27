import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getJobs, createJob, updateJob, deleteJob } from "./jobsAPI";

// initial state
const initialState = {
  isLoading: false,
  isError: false,
  jobs: [],
  error: "",
  editableJob: {},
};

// async thunks
export const getJobsAsync = createAsyncThunk("jobs/getJobs", async () => {
  const jobs = await getJobs();

  return jobs;
});

export const createJobAsync = createAsyncThunk(
  "jobs/createJob",
  async (data) => {
    const job = await createJob(data);

    return job;
  }
);

export const updateJobAsync = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, data }) => {
    const job = await updateJob(id, data);

    return job;
  }
);

export const deleteJobAsync = createAsyncThunk("jobs/deleteJob", async (id) => {
  const job = await deleteJob(id);

  return job;
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    editJob: (state, { payload }) => {
      state.editableJob = payload;
    },
    clearEditJob: (state) => {
      state.editableJob = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createJobAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.jobs.push(payload);
      })
      .addCase(createJobAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
      })
      .addCase(getJobsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getJobsAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.jobs = payload;
      })
      .addCase(getJobsAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
        state.jobs = [];
      })
      .addCase(updateJobAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(updateJobAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";

        const updatedJobIndex = state.jobs.findIndex(
          (job) => job.id === payload.id
        );
        state.jobs[updatedJobIndex] = payload;
      })
      .addCase(updateJobAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
      })
      .addCase(deleteJobAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(deleteJobAsync.fulfilled, (state, { meta }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.jobs = state.jobs.filter((job) => job.id !== meta.arg);
      })
      .addCase(deleteJobAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
      });
  },
});

export const { editJob, clearEditJob } = jobsSlice.actions;
export default jobsSlice.reducer;
