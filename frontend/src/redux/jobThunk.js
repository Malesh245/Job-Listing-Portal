// jobThunk.js

import { updateJob } from "./jobSlice"; // Import the updateJob action
import axios from "axios";

export const updateJobThunk = (jobData, jobId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/v1/job/updatejob/${jobData}`,
      jobData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      dispatch(updateJob(response.data.job));
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message || "Failed to update job");
  }
};
