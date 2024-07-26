import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const location = useLocation();
  const { authUser } = useSelector((store) => store.auth);

  const isActive = (path) => {
    return location.pathname === path ? "text-white" : "text-gray-400";
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and company name */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Job Listing Portal</h2>
            <p>Lorem ipsum dolor., Thane 421306, Mumbai, India</p>
            <p>Call now: (+91) 00000-00000</p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
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

          {authUser?.role === "student" || !authUser ? (
            /* Student section */
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Students</h3>
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
                    Applied Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/candidate-dashboard"
                    className={`hover:text-white ${isActive(
                      "/candidate-dashboard"
                    )}`}
                  >
                    Students Dashboard
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
          ) : null}

          {authUser?.role === "recruiter" || !authUser ? (
            /* Recruiter section */
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Recruiter</h3>
              <ul>
                <li>
                  <Link
                    to="/admin/jobs/create"
                    className={`hover:text-white ${isActive("/post-job")}`}
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/companies"
                    className={`hover:text-white ${isActive(
                      "/browse-candidates"
                    )}`}
                  >
                    Companyies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employer-dashboard"
                    className={`hover:text-white ${isActive(
                      "/employer-dashboard"
                    )}`}
                  >
                    Recruiter Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs/:id/applicants"
                    className={`hover:text-white ${isActive("/applications")}`}
                  >
                    Applicants
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}

          {/* Support section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
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
        <div className="border-t border-gray-700 mt-8 py-4 flex items-center justify-between flex-col md:flex-row">
          {/* Copyright */}
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p>2024 Job Listing Portal. All rights Reserved</p>
          </div>
          {/* Social media icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-white text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-white text-2xl">
              <FaTwitter />
            </a>

            <a href="#" className="text-white text-2xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-white text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
