import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setSingleJobById } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";

const JobDescription = () => {
  const { singleJobById } = useSelector((store) => store.job);
  const { authUser } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJobById?.applications?.some(
      (application) => application.applicant === authUser?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();

  const applyJobHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `http://localhost:8000/api/v1/application/apply/${params.id}`
      );
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedJob = {
          ...singleJobById,
          applications: [
            ...singleJobById.applications,
            { applicant: authUser._id },
          ],
        };
        dispatch(setSingleJobById(updatedJob)); // Update the Redux state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8000/api/v1/job/${params.id}`
        );
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === authUser?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {singleJobById?.title}
          </h1>
          <div className="flex flex-wrap gap-2 my-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJobById?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJobById?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJobById?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          } mt-4 sm:mt-0`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className="my-4">
        <h2 className="border-b-2 pb-1 border-b-gray-300 text-lg font-medium">
          Job Description
        </h2>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-bold">
          Role:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.title}
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Location:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.location}
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Description:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.description}
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Skills:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.skills}
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Experience:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.experienceLevel}
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Salary:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.salary} LPA
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Total Applicants:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.applications?.length}
          </span>
        </h3>
        <h3 className="text-lg font-bold">
          Posted Date:{" "}
          <span className="font-normal text-gray-800">
            {singleJobById?.createdAt.split("T")[0]}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default JobDescription;
