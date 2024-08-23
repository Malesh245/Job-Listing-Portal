import React from "react";
import ApplicationTable from "./ApplicationTable";

const MyApplication = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        Total Applied Jobs
      </h1>
      <ApplicationTable />
    </div>
  );
};

export default MyApplication;
