import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetCompanies from "@/hooks/useGetCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetCompanies();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(text));
  }, [text, dispatch]);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between my-5 gap-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full md:w-auto"
            placeholder="Filter by name"
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full md:w-auto"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
