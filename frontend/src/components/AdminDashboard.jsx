// components/AdminDashboard.js

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>
      <div className="space-y-4">
        <Link
          to="/superadmin/users"
          className="block bg-blue-500 text-white py-2 px-4 rounded"
        >
          User Management
        </Link>
        <Link
          to="/superadmin/jobs"
          className="block bg-green-500 text-white py-2 px-4 rounded"
        >
          Job Management
        </Link>
        <Link
          to="/superadmin/statistics"
          className="block bg-yellow-500 text-white py-2 px-4 rounded"
        >
          Site Statistics
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
