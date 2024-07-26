import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Jobnotfound from "./Jobnotfound";

const Jobs = () => {
  const { authUser } = useSelector((store) => store.auth);
  const { allJobs, searchText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchText]);

  useEffect(() => {
    if (authUser?.role === "recruiter") {
      navigate("/admin/jobs");
    }
  }, [authUser, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/4 lg:w-1/5">
            <FilterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <Jobnotfound />
            ) : (
              <div className="h-full overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
