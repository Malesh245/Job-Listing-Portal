import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Label } from "./ui/label";

const Profile = () => {
  useGetAppliedJobs();
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={authUser?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{authUser?.fullname}</h1>
              <p className="text-gray-600">
                {authUser?.profile?.bio
                  ? authUser?.profile?.bio
                  : "Add your bio here"}
              </p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4" />
            <span>{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-4 w-4" />
            <span>{authUser?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="my-2 font-bold text-lg">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {authUser?.profile?.skills.length !== 0 ? (
              authUser?.profile?.skills?.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {authUser?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={authUser?.profile?.resume}
              className="text-blue-500 hover:underline"
            >
              {authUser?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
