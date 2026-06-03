/* eslint-disable no-unused-vars */

import React from "react";

import {
  FaUserCircle,
} from "react-icons/fa";

const Topbar = () => {

  return (
    <div className="fixed top-0 left-[260px] right-0 z-50 h-[80px] bg-[#111827]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8">

      {/* Title */}
      <h2 className="text-2xl font-bold text-white">

        TitaniumSafe Admin

      </h2>

      {/* Admin Info */}
      <div className="flex items-center gap-3">

        <FaUserCircle className="text-3xl text-[#D4AF37]" />

        <div>

          <p className="text-sm text-gray-400">
            Welcome Back
          </p>

          <h4 className="font-semibold text-white">
            Admin
          </h4>

        </div>

      </div>

    </div>
  );
};

export default Topbar;