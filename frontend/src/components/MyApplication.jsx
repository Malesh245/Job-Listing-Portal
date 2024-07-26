import React from "react";
import ApplicationTable from "./ApplicationTable";

const MyApplication = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        Total Applied Jobs
      </h1>
      <ApplicationTable />
    </div>
  );
};

export default MyApplication;
