import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "FullStack Developer",
      "Nextjs Developer",
      "Software Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0 - 40k", "42k to 1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchText(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg sm:text-xl">Filter Jobs</h1>
      </div>
      <hr className="my-3" />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-medium text-md sm:text-lg">
              {data.filterType}
            </h2>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`; // Ensure unique id for each radio button
              return (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
