import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDescription from "./components/JobDescription";
import Browse from "./components/Browse";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Singup";
import Profile from "./components/Profile";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyEmail from "./components/auth/VerifyEmail";
import CreateJobs from "./components/admin/CreateJobs";
import Applicants from "./components/admin/Applicants";
import Companies from "./components/Companies";
import CompanyCreate from "./components/CompanyCreate";
import CompanySetup from "./components/CompanySetup";
import PostedJobs from "./components/PostedJobs";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import About from "./components/About";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import FAQs from "./components/FAQs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import UpdateJob from "./components/admin/UpdateJob";
import Dashboard from "./components/Dashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import AdminDashboard from "./components/AdminDashboard";
import SiteStatistics from "./components/SiteStatistics";
import JobManagement from "./components/JobManagement";
import UserManagement from "./components/UserManagement";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import SuperAdminLogin from "./components/auth/SuperAdminLogin";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/jobs", element: <Jobs /> },
        { path: "/description/:id", element: <JobDescription /> },
        { path: "/browse", element: <Browse /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/profile", element: <Profile /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/verify-email", element: <VerifyEmail /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/blog", element: <Blog /> },
        { path: "/faqs", element: <FAQs /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/terms-conditions", element: <TermsConditions /> },
        { path: "/login-superadmin", element: <SuperAdminLogin /> },
        // Super Admin Dashboard Routes
        {
          path: "/superadmin/dashboard",
          element: (
            <ProtectedRoutes requiredRole="super admin">
              <AdminDashboard />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/superadmin/users",
          element: (
            <ProtectedRoutes requiredRole="super admin">
              <UserManagement />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/superadmin/jobs",
          element: (
            <ProtectedRoutes requiredRole="super admin">
              <JobManagement />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/superadmin/statistics",
          element: (
            <ProtectedRoute requiredRole="super admin">
              <SiteStatistics />
            </ProtectedRoute>
          ),
        },
        // Admin Dashboard Routes
        {
          path: "/admin/jobs",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <PostedJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/create",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <CreateJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/:id/applicants",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <Applicants />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <CompanyDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies/create",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <CompanyCreate />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies/:id",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <CompanySetup />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/:jobId/edit",
          element: (
            <ProtectedRoute requiredRole="recruiter">
              <UpdateJob />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
