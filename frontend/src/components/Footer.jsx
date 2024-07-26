import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-white" : "text-gray-400";
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 justify-center">
          {/* Logo and company name */}
          <div>
            <h2 className="text-xl font-bold mb-4">Job Listing Portal</h2>
            <p>6391 Elgin St. Celina, Delaware 10299, York, USA</p>
            <p>Call now: (319) 555-0115</p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link
                  to="/about"
                  className={`hover:text-white ${isActive("/about")}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`hover:text-white ${isActive("/contact")}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`hover:text-white ${isActive("/blog")}`}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          {/* Candidate */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Candidate</h3>
            <ul>
              <li>
                <Link
                  to="/browse-jobs"
                  className={`hover:text-white ${isActive("/browse-jobs")}`}
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse-employers"
                  className={`hover:text-white ${isActive(
                    "/browse-employers"
                  )}`}
                >
                  Browse Employers
                </Link>
              </li>
              <li>
                <Link
                  to="/candidate-dashboard"
                  className={`hover:text-white ${isActive(
                    "/candidate-dashboard"
                  )}`}
                >
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/saved-jobs"
                  className={`hover:text-white ${isActive("/saved-jobs")}`}
                >
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>
          {/* Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Employers</h3>
            <ul>
              <li>
                <Link
                  to="/post-job"
                  className={`hover:text-white ${isActive("/post-job")}`}
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/browse-candidates"
                  className={`hover:text-white ${isActive(
                    "/browse-candidates"
                  )}`}
                >
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link
                  to="/employer-dashboard"
                  className={`hover:text-white ${isActive(
                    "/employer-dashboard"
                  )}`}
                >
                  Employers Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/applications"
                  className={`hover:text-white ${isActive("/applications")}`}
                >
                  Applications
                </Link>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li>
                <Link
                  to="/faqs"
                  className={`hover:text-white ${isActive("/faqs")}`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className={`hover:text-white ${isActive("/privacy-policy")}`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className={`hover:text-white ${isActive(
                    "/terms-conditions"
                  )}`}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Border above copyright and social sections */}
        <div className="border-t border-gray-700 mt-8 py-4 flex items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            <p>2021 Jobpilot Job Portal. All rights Reserved</p>
          </div>
          {/* Social media icons */}
          <div className="flex">
            <a href="#" className="mr-4">
              <FaFacebook className="text-white text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaTwitter className="text-white text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaLinkedin className="text-white text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaInstagram className="text-white text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
