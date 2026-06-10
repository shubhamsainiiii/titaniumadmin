/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../assets/logo.jpeg";
const Topbar = ({ collapsed }) => {
  return (
    <div
      className={`
        fixed top-0 right-0 z-40 h-[64px]
        bg-[#f8f6f0] backdrop-blur-md border-b border-[#e2b932]
        flex items-center justify-between px-6
        transition-all duration-300
        ${collapsed ? "left-[72px]" : "left-[240px]"}
      `}
    >

      {/* Left — Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e2b932]  flex items-center justify-center flex-shrink-0">
          <img
            src={logo}
            alt="TitaniumSafe Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-[15px] font-semibold tracking-tight text-[#1a1a2e] select-none">
          Titanium<span className="text-[#c9a227]">Safe</span>
        </h2>
      </div>

      {/* Right — Admin info */}
      <div className="flex items-center gap-3">
        <div className="w-px h-5 bg-[#1a2540]" />
        {/* Admin */}
        <div className="flex items-center gap-2.5 cursor-pointer group text-[#1a1a2e]">
          <div>
            <p className="text-[10px] leading-tight">Welcome back</p>
            <p className="text-[13px] font-semibold  leading-tight">Admin</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;