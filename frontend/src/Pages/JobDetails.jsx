import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <h2>JobDetails:${id}</h2>
      <h1>{job.jobTitle}</h1>
      <button className="bg-blue px-8 py-2 text-white active:bg-sky-900">
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
