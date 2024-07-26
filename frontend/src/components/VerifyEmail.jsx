// src/VerifyEmail.js
import React, { useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-email", {
        code,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Verification failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Email Verification</h1>
      <p>
        We've sent a verification to your email to verify your email address and
        activate your account.
      </p>
      <input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: "10px", margin: "10px 0", width: "300px" }}
      />
      <button
        onClick={handleVerify}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Verify My Account
      </button>
      <p>{message}</p>
      <p>
        Didn't receive any code? <a href="/">Resend</a>
      </p>
    </div>
  );
};

export default VerifyEmail;
