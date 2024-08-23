import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ProfilePopover } from "../ProfilePopover";
import { useSelector } from "react-redux";
import { MenuIcon, XIcon } from "lucide-react";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b-2 shadow-md w-full">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            Job Listing<span className="text-[#2d72ea]"> Portal</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {authUser && authUser.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!authUser ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5f32ad]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <ProfilePopover />
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center gap-5 py-4">
            {authUser && authUser.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link
                    to={"/admin/companies "}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/jobs"} onClick={() => setIsMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/jobs"} onClick={() => setIsMenuOpen(false)}>
                    Jobs
                  </Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/browse"} onClick={() => setIsMenuOpen(false)}>
                    Browse
                  </Link>
                </li>
              </>
            )}
            {!authUser ? (
              <div className="flex flex-col items-center gap-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant={"outline"}>Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-[#6A38C2] hover:bg-[#5f32ad]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <ProfilePopover />
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
