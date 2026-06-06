/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../assets/logo.jpeg";
const Topbar = ({ collapsed }) => {
  return (
    <div
      className={`
        fixed top-0 right-0 z-40 h-[64px]
        bg-[#0d1526]/95 backdrop-blur-md border-b border-[#111d33]
        flex items-center justify-between px-6
        transition-all duration-300
        ${collapsed ? "left-[72px]" : "left-[240px]"}
      `}
    >

      {/* Left — Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c9a227]/20 bg-white flex items-center justify-center flex-shrink-0">
          <img
            src={logo}
            alt="TitaniumSafe Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-[15px] font-semibold tracking-tight text-slate-100 select-none">
          Titanium<span className="text-[#c9a227]">Safe</span>
          <span className="ml-2 text-[10px] font-medium text-[#2d3f5c] tracking-[0.1em] uppercase align-middle">
            Admin
          </span>
        </h2>
      </div>

      {/* Right — Admin info */}
      <div className="flex items-center gap-3">
        <div className="w-px h-5 bg-[#1a2540]" />
        {/* Admin */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-[#c9a227]/10 border border-[#c9a227]/20 flex items-center justify-center group-hover:border-[#c9a227]/40 transition-all duration-200">
            <span className="text-[10px] font-semibold text-[#c9a227]">AD</span>
          </div>
          <div>
            <p className="text-[10px] text-[#3d5070] leading-tight">Welcome back</p>
            <p className="text-[13px] font-semibold text-slate-200 leading-tight">Admin</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;