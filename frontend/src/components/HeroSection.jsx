import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchText(query));
    navigate("/browse");
  };

  return (
    <div className="max-w-screen-2xl mx-auto xl:px-24 px-4 md:py-12 py-6">
      <div className="flex flex-col gap-8 md:gap-12 my-10">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3">
            Find your <span className="text-[#2d72ea]">new job</span> today
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black/70 mb-8">
            Thousands of jobs in the computer, engineering, and technology
            sectors are waiting for you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full max-w-4xl shadow-lg border border-gray-200 rounded-full mx-auto">
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream jobs"
            className="outline-none border-none px-4 py-2 w-full rounded-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#2d72ea] text-white px-4 py-2 sm:rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
