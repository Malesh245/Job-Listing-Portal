import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import MyApplication from "./MyApplication";
import UpdatePassword from "./UpdatePassword";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

const Dashboard = () => {
  useGetAppliedJobs();
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState("My Profile");

  // Protect route
  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const renderContent = () => {
    switch (selectedSection) {
      case "My Profile":
        return <Profile authUser={authUser} />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Change Password":
        return <UpdatePassword />;
      case "Applied Jobs":
        return <MyApplication />;
      default:
        return <Profile authUser={authUser} />;
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mt-4 mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <div className="container flex items-center justify-between">
        <p className="font-semibold">Dashboard</p>
        <p className="font-semibold">
          Welcome!{" "}
          <span className="font-bold text-xl">{authUser?.fullname}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/4 border-r bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
          <h4 className="text-center mb-5">Manage Account</h4>
          <div className="flex flex-col items-center gap-4">
            <Avatar
              className="h-24 w-24 cursor-pointer"
              onClick={() => setSelectedSection("My Profile")}
            >
              <AvatarImage
                src={authUser?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
          </div>
          <div className="mt-5">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setSelectedSection("My Profile")}
                  className="w-full text-left flex items-center"
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("Update Profile")}
                  className="w-full text-left flex items-center"
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("Change Password")}
                  className="w-full text-left flex items-center"
                >
                  Change Password
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("Applied Jobs")}
                  className="w-full text-left flex items-center"
                >
                  Applied Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
