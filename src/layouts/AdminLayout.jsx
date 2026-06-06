/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#070c18]">

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content — shifts with sidebar */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "ml-[72px]" : "ml-[240px]"
          }`}
      >

        {/* Topbar */}
        <Topbar collapsed={collapsed} />

        {/* Pages */}
        <div className="p-6 mt-[64px]">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;