import React from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
