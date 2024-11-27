import React from "react";
import { useAuth } from "../context/Auth";
import { Navigate, Outlet, useNavigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, error } = useAuth();
  console.log(user);
  console.log(loading);
  console.log(error);

  if (loading) {
    return <p>loading...</p>;
  }
  
  return !user ? <Navigate to="/login" replace /> : children;
};

export default PrivateRoute;
