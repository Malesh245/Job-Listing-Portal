// src/pages/Login.jsx
import React, { useState } from "react";
import { FaBuildingUser, FaFacebook, FaUserTie } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const [accountType, setAccountType] = useState("Candidate");
  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md lg:max-w-xl">
        <div className="text-center">
          <img
            src="/path-to-your-logo.png"
            alt="Jobpilot Logo"
            className="w-20 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create Account
            </Link>
          </p>
          <div className="rounded-md bg-gray-400 mt-2">
            <p className="text-center font-light text-sm pt-3 ">
              LOGIN ACCOUNT AS A
            </p>
            <div className="flex mb-4 p-4 gap-1">
              <button
                className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 rounded-lg ${
                  accountType === "Candidate"
                    ? "bg-blue text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setAccountType("Candidate")}
              >
                <FaUserTie />
                Candidate
              </button>
              <button
                className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 rounded-lg ${
                  accountType === "Employer"
                    ? "bg-blue text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setAccountType("Employer")}
              >
                <FaBuildingUser />
                Employer
              </button>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-2"
            >
              <FaFacebook />
              Sign up with Facebook
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-2"
            >
              <FcGoogle />
              Sign up with Google
            </button>
          </div>
        </form>
      </div>
      <div className="hidden lg:flex lg:w-2/3 bg-indigo-100 items-center justify-center p-8">
        <div>
          <h1 className="text-4xl font-bold text-indigo-600">
            Over 1,75,324 candidates waiting for good employers.
          </h1>
          <div className="mt-6 flex space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">1,75,324</p>
              <p className="text-gray-700">Live Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">97,354</p>
              <p className="text-gray-700">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">7,532</p>
              <p className="text-gray-700">New Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
