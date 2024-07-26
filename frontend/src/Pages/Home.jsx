import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import JobCard from "../components/JobCard";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // filter jobs by title
  const filteredItems = jobs.filter(
    (job) =>
      job.jobTitle &&
      job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // filter jobs by category using radio
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // filter jobs by category using button base
  const handleOnClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // filter input item
    if (query) {
      filteredJobs = filteredItems;
    }
    // category filter
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          employmentType,
          salaryType,
          experienceLevel,
          postingDate,
          maxPrice,
        }) =>
          (jobLocation &&
            jobLocation.toLowerCase() === selected.toLowerCase()) ||
          (employmentType &&
            employmentType.toLowerCase() === selected.toLowerCase()) ||
          (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
          (experienceLevel &&
            experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
          (postingDate && postingDate >= selected)
      );
    }
    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => {
      return <JobCard key={i} data={data} />;
    });
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded-sm drop-shadow-md">
          <Sidebar handleChange={handleChange} handleOnClick={handleOnClick} />
        </div>
        {/* Jobs Detail */}
        <div className="col-span-2 bg-white p-4 rounded-md drop-shadow-md">
          {isLoading ? (
            <p className="font-medium text-center">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} jobs</h3>
              <p>No Jobs Found!</p>
            </>
          )}
          {/* pagination here */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* right side */}
        <div className="bg-white p-4 rounded-sm drop-shadow-md">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
