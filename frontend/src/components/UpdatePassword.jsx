import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setAuthUser } from "@/redux/authSlice";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const formData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(setLoading(true));
    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/user/update/password",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(setLoading(false));
      if (response.data.success) {
        dispatch(setAuthUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
      <h3 className="text-lg font-bold mb-4">Update Password</h3>
      <div className="mb-4">
        <label className="block mb-2">Current Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">New Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Confirm Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {loading ? (
          <Button disabled onClick={handleUpdatePassword}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Update Password</Button>
        )}
        <button
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
