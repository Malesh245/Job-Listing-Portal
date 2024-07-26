import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/description/:id",
        element: <JobDescription />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/faqs",
        element: <FAQs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },

      // Admin Dashboard Route Started
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute>
            <PostedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute>
            <CreateJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute>
            <CompanyCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <ProtectedRoute>
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:jobId/edit",
        element: (
          <ProtectedRoute>
            <UpdateJob />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
