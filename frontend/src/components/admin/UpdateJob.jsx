import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import CreatableSelect from "react-select/creatable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { updateJobThunk } from "@/redux/jobThunk";
import axios from "axios";
import { updateJob } from "@/redux/jobSlice";

const UpdateJob = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
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
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Example of getting token from local storage
        const res = await axios.get(
          `http://localhost:8000/api/v1/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const job = res.data.job;
          setInput({
            title: job.title,
            description: job.description,
            category: job.category,
            skills: job.skills,
            requirements: job.requirements,
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            experience: job.experience,
            position: job.position,
            companyId: job.companyId,
          });
          setSelectedOption(
            job.skills.map((skill) => ({ value: skill, label: skill }))
          );
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to fetch job details");
      }
    };

    fetchJob();
  }, [jobId]);

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

  const handleSelectCategory = (e) => {
    setInput({ ...input, category: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Log input data to verify correct values
    console.log("Input Data Before API Call:", input);

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/job/updatejob/${jobId}`,
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
      console.error("Error updating job:", error); // Log error details
      toast.error("Failed to update job");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const categories = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

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
              <Label>Job Category</Label>
              <select
                value={input.category}
                onChange={handleSelectCategory}
                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              >
                <option value="">Select Job Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
            {companies.length > 0 && (
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="w-full flex items-center justify-end">
            <Button
              onClick={submitHandler}
              disabled={companies?.length === 0 ? true : false}
              className="mt-6"
            >
              Post New Job
            </Button>
          </div>
          {companies.length === 0 && (
            <p className="text-red-600 text-xs font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
