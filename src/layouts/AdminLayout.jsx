/* eslint-disable no-unused-vars */

import React from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

const AdminLayout = () => {

  return (
    <div className="flex min-h-screen bg-[#0F172A]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-[260px]">

        {/* Topbar */}
        <Topbar />

        {/* Pages */}
        <div className="p-6">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default AdminLayout;