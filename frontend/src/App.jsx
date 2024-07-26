import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import CreateJob from "./Pages/CreateJob";
import MyJobs from "./Pages/MyJobs";
import SalaryPage from "./Pages/SalaryPage";
import UpdateJob from "./Pages/UpdateJob";
import JobDetails from "./Pages/JobDetails";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import Auth from "./Pages/Auth";
import CompanyProfile from "./Pages/CompanyProfile";
import UserProfile from "./Pages/UserProfile";
import Footer from "./components/Footer";
import { useSelector } from "./redux/store";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}

const App = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <main className="bg-[#f7fdfd]">
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Routes that don't require authentication */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Routes that require authentication */}
        <Route element={<Layout />}>
          <Route path="/find-jobs" element={<Home />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route
            path={
              user?.user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/company-profile/:id" element={<CompanyProfile />} />
          <Route path="/post-job" element={<CreateJob />} />
          <Route path="/job-detail/:id" element={<JobDetails />} />
          <Route path="/post-job" element={<CreateJob />} />
          <Route path="/my-job" element={<MyJobs />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route
            path="/edit-job/:id"
            element={<UpdateJob />}
            loader={({ params }) =>
              fetch(`http://localhost:5000/all-jobs/${params.id}`)
            }
          />
        </Route>
      </Routes>
      {user && <Footer />}
    </main>
  );
};

export default App;
