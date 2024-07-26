import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import CreatableSelect from "react-select/creatable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateJobs = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    skills: [],
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const { companies } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const handleSkillsChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
    setInput({
      ...input,
      skills: selectedOptions.map((option) => option.value),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/job/postjob`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    setInput({
      title: "",
      description: "",
      skills: [],
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: 0,
      companyId: "",
    });
    setSelectedOption([]);
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "Java", label: "Java" },
    { value: "SQL", label: "SQL" },
    { value: "Python", label: "Python" },
    { value: "Android Developer", label: "Android Developer" },
    { value: "Angular", label: "Angular" },
  ];

  return (
    <div>
      <div className="max-w-screen-2xl container mt-6 mx-auto xl:px-24 px-4">
        <div className="p-8 w-full border border-gray-200 shadow-lg rounded-md bg-[#FAFAFA] py-10 px-4 lg:px-16">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <label>Required Skills</label>
              <CreatableSelect
                value={selectedOption}
                onChange={handleSkillsChange}
                isMulti
                options={options}
                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>
                Salary <span className="text-xs text-gray-500">(in LPA)</span>
              </Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>
                Experience Level
                <span className="text-xs text-gray-500">(in years)</span>
              </Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length !== 0 && (
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies &&
                      companies.map((company) => {
                        return (
                          <SelectItem
                            key={company?._id}
                            value={company?.name.toLowerCase()}
                          >
                            {company?.name}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button
            onClick={submitHandler}
            disabled={companies?.length === 0 ? true : false}
            className="w-full mt-4"
          >
            Post New Job
          </Button>
          {companies.length === 0 && (
            <p className="text-red-600 text-xs font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateJobs;
