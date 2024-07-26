import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      console.log("Verification code:", code); // Log the code before sending

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/verify-email",
        { code: code.trim() } // sending the code in the body
      );
      console.log("Response from server:", response.data); // Log the response from the server
      setMessage(response.data.message);
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error during verification:", error); // Log the error if verification fails
      setMessage("Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/resend-verification-code",
        { email: user.email }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.log("Error during resending verification code:", error);
      setMessage("Failed to resend verification code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <div className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
        <h1 className="font-bold text-xl mb-4 text-center">
          Email Verification
        </h1>
        <p className="text-center font-light text-sm pt-3 mb-5">
          We've sent a verification code to your email. Please enter the code
          below to verify your email address and activate your account.
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 w-full">
            <Label>Verification Code</Label>
            <Input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="cursor-pointer"
            />
          </div>
        </div>
        {loading ? (
          <Button className="my-4 w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="my-4 w-full" onClick={handleVerify}>
            Verify My Account
          </Button>
        )}
        <p className="font-light text-sm pt-1">{message}</p>
        <p className="font-light text-sm pt-1">
          Didn't receive any code?{" "}
          <button onClick={handleResend}>Resend</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
