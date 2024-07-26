import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id); // Fetching company by ID
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/company/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <div className="max-w-4xl mx-auto my-10 p-4 md:p-6 lg:p-8">
        <form
          onSubmit={submitHandler}
          className="shadow-lg p-4 md:p-6 lg:p-8 bg-white rounded-lg"
        >
          <div className="flex flex-col md:flex-row items-center gap-5 mb-10">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="mt-1"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-8">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
