// components/SiteStatistics.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SiteStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get("/api/admin/statistics");
        setStatistics(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <h2 className="text-lg font-bold mb-4">Site Statistics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-gray-100">
            <h3 className="text-md font-semibold">User Activity</h3>
            <p>Online Users: {statistics.onlineUsers}</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-100">
            <h3 className="text-md font-semibold">Application Statistics</h3>
            <p>Total Applications: {statistics.totalApplications}</p>
            <p>Reviewed Applications: {statistics.reviewedApplications}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteStatistics;
