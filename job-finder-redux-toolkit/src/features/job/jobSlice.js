import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJob } from "./jobAPI";

// initial state
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  job: {},
};

// async thunks
export const jobAsync = createAsyncThunk("job/fetchJob", async (id) => {
  const response = getJob(id);

  return response;
});

export const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(jobAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(jobAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.job = payload;
      })
      .addCase(jobAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error?.message;
      });
  },
});

export default jobSlice.reducer;
