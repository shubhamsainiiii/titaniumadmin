// /* eslint-disable no-unused-vars */

// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const AdminLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-[#070c18]">

//       {/* Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Main Content — shifts with sidebar */}
//       <div
//         className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "ml-[72px]" : "ml-[240px]"
//           }`}
//       >

//         {/* Topbar */}
//         <Topbar collapsed={collapsed} />

//         {/* Pages */}
//         <div className="p-6 mt-[64px]">
//           <Outlet />
//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminLayout;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#f8f6f0]">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0d1526",
            color: "#fff",
            border: "1px solid #1a2540",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#c9a227",
              secondary: "#0d1526",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0d1526",
            },
          },
        }}
      />

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
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