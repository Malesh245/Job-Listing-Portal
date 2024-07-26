import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewCompany = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/company/register",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (companyName.trim() !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [companyName]);

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="my-10">
          <h1 className="font-bold text-2xl mb-2">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>
        <Label className="block mb-2">Company Name</Label>
        <Input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mb-4 w-full"
          placeholder="JobHunt, Microsoft etc."
        />
        <div className="flex flex-col md:flex-row items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="w-full md:w-auto"
          >
            Cancel
          </Button>
          <Button
            disabled={disable}
            onClick={createNewCompany}
            className="w-full md:w-auto"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
