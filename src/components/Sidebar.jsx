/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import {
  FaHome, FaBoxOpen, FaPlusCircle,
  FaStar, FaEnvelope, FaSignOutAlt,
  FaChevronLeft, FaChevronRight,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/");
  };

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Products", path: "/dashboard/products", icon: <FaBoxOpen /> },
    { name: "Add Product", path: "/dashboard/add-product", icon: <FaPlusCircle /> },
    { name: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> },
    { name: "Contacts", path: "/dashboard/contacts", icon: <FaEnvelope /> },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col justify-between
        bg-[#f8f6f0] border-r border-[#e2b932]
        transition-all duration-300 ease-in-out 
        ${collapsed ? "w-[72px]" : "w-[240px]"}
      `}
    >

      {/* ── Top ── */}
      <div className="flex flex-col ">

        {/* Logo + toggle */}
        <div className={`flex items-center border-b border-[#e2b932] h-[64px]  px-4 ${collapsed ? "justify-center" : "justify-between"}`}>

          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#f8f6f0] border border-[#e2b932] flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="text-[15px] font-semibold tracking-tight text-[#1a1a2e] whitespace-nowrap select-none">
                Titanium<span className="text-[#c9a227]">Safe</span>
              </h2>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#B8941F] bg-[#f8f6f0] text-[#B8941F] hover:text-[#c9a227]/60 hover:border-[#c9a227]/60 transition-all duration-500 flex-shrink-0 cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed
              ? <FaChevronRight className="text-[9px]" />
              : <FaChevronLeft className="text-[9px]" />
            }
          </button>
        </div>

        {/* Nav Links */}
        <nav className={`flex flex-col gap-1 p-3 mt-1 ${collapsed ? "px-2" : ""}`}>
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/dashboard"}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl transition-all duration-200 font-medium text-[13px]
                ${collapsed ? "justify-center px-0 py-2.5" : "px-3.5 py-2.5"}
                ${isActive
                  ? "bg-[#c9a227]/10 text-[#c9a227] border border-[#e2b932]"
                  : "text-[#4a6080] border border-transparent hover:bg-[#080d1a] hover:text-slate-300 hover:border-[#1a2540]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex-shrink-0 text-[14px] transition-colors duration-200 ${isActive ? "text-[#c9a227]" : "text-[#3d5070] group-hover:text-slate-400"}`}>
                    {item.icon}
                  </span>
                  {!collapsed && <span className="whitespace-nowrap leading-none">{item.name}</span>}
                  {!collapsed && isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a227] flex-shrink-0" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ── Bottom ── */}
      <div className={`border-t border-[#e2b932] ${collapsed ? "p-2" : "p-3"}`}>

        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`group w-full flex items-center gap-3 rounded-xl bg-red-500/5 border border-red-500/80 text-[#5a3535] hover:bg-red-500/10 hover:border-red-500/90 hover:text-red-400 transition-all duration-200 font-medium text-[13px] cursor-pointer ${collapsed ? "justify-center px-0 py-2.5" : "px-3.5 py-2.5"}`}
        >
          <FaSignOutAlt className="text-[14px] flex-shrink-0 group-hover:text-red-400 transition-colors duration-200" />
          {!collapsed && <span className="whitespace-nowrap ">Logout</span>}
        </button>
      </div>

    </div>
  );
};

export default Sidebar;