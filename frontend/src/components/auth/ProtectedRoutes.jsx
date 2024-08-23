import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, requiredRole }) => {
  const { authUser } = useSelector((state) => state.auth);

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
