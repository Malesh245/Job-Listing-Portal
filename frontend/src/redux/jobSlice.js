// jobSlice.js

import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: null,
    singleJobById: null,
    searchText: "",
    apply: false,
    adminJobs: null,
    searchAdminJobs: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJobById: (state, action) => {
      state.singleJobById = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setApply: (state, action) => {
      state.apply = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setSearchAdminJobs: (state, action) => {
      state.searchAdminJobs = action.payload;
    },
    // New reducer for updating a job
    updateJob: (state, action) => {
      const updatedJob = action.payload;
      state.adminJobs = state.adminJobs.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );
    },
  },
});

export const {
  setAllJobs,
  setSingleJobById,
  setSearchText,
  setApply,
  setAdminJobs,
  setSearchAdminJobs,
  updateJob,
} = jobSlice.actions;

export default jobSlice.reducer;
