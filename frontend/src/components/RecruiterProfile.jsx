import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

const RecruiterProfile = ({ authUser }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <h1 className="text-xl font-bold mb-5">My Profile</h1>
      <div className="m-2">
        <Avatar className="h-24 w-24 cursor-pointer">
          <AvatarImage src={authUser?.profile?.profilePhoto} alt="profile" />
        </Avatar>
      </div>
      <p>Name: {authUser?.fullname}</p>
      <p>Email: {authUser?.email}</p>
      <p>Phone: {authUser?.phoneNumber}</p>
      {/* Add more profile details here */}
    </div>
  );
};

export default RecruiterProfile;
