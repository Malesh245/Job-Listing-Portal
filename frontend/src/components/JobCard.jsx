import React from "react";
import { Link } from "react-router-dom";
const JobCard = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
  } = data;
  return (
    <section className="card">
      <Link
        to={`/job-details/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img src={companyLogo} className="w-8" alt="" />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2">{jobLocation}</span>
            <span className="flex items-center gap-2">{employmentType}</span>
            <span className="flex items-center gap-2">{minPrice}</span>
            <span className="flex items-center gap-2">{postingDate}</span>
          </div>
          <p className="text-base text-primary/70">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default JobCard;
