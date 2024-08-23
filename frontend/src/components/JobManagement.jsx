// components/JobManagement.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/jobs");
        setJobs(res.data.jobs);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/admin/jobs/${id}/approve`);
      setJobs(
        jobs.map((job) =>
          job._id === id ? { ...job, status: "approved" } : job
        )
      );
      toast.success("Job approved successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/admin/jobs/${id}/reject`);
      setJobs(
        jobs.map((job) =>
          job._id === id ? { ...job, status: "rejected" } : job
        )
      );
      toast.success("Job rejected successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <h2 className="text-lg font-bold mb-4">Job Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="py-2 px-4 border">{job.title}</td>
                <td className="py-2 px-4 border">{job.company}</td>
                <td className="py-2 px-4 border">{job.status}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleApprove(job._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(job._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobManagement;
