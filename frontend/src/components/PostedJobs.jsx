import React, { useEffect, useState } from "react";
import JobTable from "./JobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchAdminJobs } from "@/redux/jobSlice";

function PostedJobs() {
  useGetAllAdminJobs();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchAdminJobs(text));
  }, [text, dispatch]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full md:w-1/3"
            placeholder="Filter by company name & role"
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="mt-4 md:mt-0"
          >
            New Jobs
          </Button>
        </div>
        <div className="mt-6">
          <JobTable />
        </div>
      </div>
    </div>
  );
}

export default PostedJobs;
