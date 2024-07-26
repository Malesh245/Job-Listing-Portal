import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold text-primary mb-3">
        Find your <span className="text-blue">new job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </p>

      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-2 gap-4">
          <div
            className="flex
           md:rounded-md rounded shadow-md  md:w-1/2 w-full"
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="What position are you looking for ?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0  sm:text-sm sm:leading-6 w-full"
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <div
            className="flex
           md:rounded-md rounded shadow-md  md:w-1/2 w-full"
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Location"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0  sm:text-sm sm:leading-6 w-full"
            />
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <button className="bg-blue py-2 px-8 text-white md:rounded-md rounded-md">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
