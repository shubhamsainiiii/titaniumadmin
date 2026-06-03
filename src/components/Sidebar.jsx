/* eslint-disable no-unused-vars */

import React from "react";

import {
  FaHome,
  FaBoxOpen,
  FaPlusCircle,
  FaStar,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

const Sidebar = () => {

  const navigate =
    useNavigate();

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    toast.success(
      "Logout Successful"
    );

    navigate("/");
  };

  // =========================
  // Sidebar Links
  // =========================
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Products",
      path: "/dashboard/products",
      icon: <FaBoxOpen />,
    },

    {
      name: "Add Product",
      path: "/dashboard/add-product",
      icon: <FaPlusCircle />,
    },

    {
      name: "Reviews",
      path: "/dashboard/reviews",
      icon: <FaStar />,
    },

    {
      name: "Contacts",
      path: "/dashboard/contacts",
      icon: <FaEnvelope />,
    },
  ];

  return (
    <div className="w-[260px] fixed top-0 left-0 h-screen bg-[#111827] border-r border-white/10 p-6 flex flex-col justify-between">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="mb-12">

          <h2 className="text-3xl font-bold text-white">

            Titanium
            <span className="text-[#D4AF37]">
              Safe
            </span>

          </h2>

        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">

          {links.map((item, index) => (

            <NavLink
              key={index}
              to={item.path}

              end={item.path === "/dashboard"}

              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium
              
                ${isActive
                  ? "bg-[#D4AF37] text-[#0F172A] shadow-lg"
                  : "text-white hover:bg-white/10"
                }`
              }
            >

              <span className="text-xl">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </NavLink>
          ))}

        </div>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}

        className="flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300 font-medium"
      >

        <FaSignOutAlt className="text-xl" />

        Logout

      </button>

    </div>
  );
};

export default Sidebar;