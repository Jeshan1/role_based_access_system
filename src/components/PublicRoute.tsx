import React from "react";
import { useAuth } from "../context/Auth";
import { Navigate, Outlet } from "react-router";

const PublicRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
