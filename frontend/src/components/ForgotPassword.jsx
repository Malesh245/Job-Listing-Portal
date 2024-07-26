// src/pages/ForgetPassword.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const ForgetPassword = () => {
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
            Forget Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Go back to{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create Account
            </Link>
          </p>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-2"
            >
              <FaFacebook />
              Sign in with Facebook
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 gap-2"
            >
              <FcGoogle />
              Sign in with Google
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

export default ForgetPassword;
