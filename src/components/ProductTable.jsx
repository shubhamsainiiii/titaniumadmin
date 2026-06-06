/* eslint-disable no-unused-vars */
import React from "react";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const ProductTable = ({ products, getProducts }) => {
  const navigate = useNavigate();

  // =========================
  // Delete Product
  // =========================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      const { data } = await api.delete(`/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  // =========================
  // Toggle Availability
  // =========================
  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.put(`/products/toggle/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="w-full">

      {/* ── Header row ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
            Product Inventory
          </h2>
          <p className="text-[13px] text-[#3d5070] mt-0.5">
            {products?.length ?? 0} product{products?.length !== 1 ? "s" : ""} listed
          </p>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="bg-[#0d1526] border border-[#1a2540] rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">

            {/* Head */}
            <thead>
              <tr className="border-b border-[#111d33]">
                {["Image", "Product", "Category", "Price", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.12em] uppercase text-[#2d3f5c]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f1a2e]">
              {products?.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="group transition-colors duration-200 hover:bg-[#0a1020]"
                  >
                    <td className="px-6 py-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#1a2540] bg-[#080d1a] flex-shrink-0">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Name + Brand */}
                    <td className="px-6 py-4">
                      <p className="text-[15px] font-semibold text-slate-100 leading-tight">
                        {product.name}
                      </p>
                      <p className="text-[12px] text-[#3d5070] mt-1 tracking-wide">
                        {product.brandName}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-medium bg-[#080d1a] border border-[#1a2540] text-[#4a6080]">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="text-[15px] font-semibold text-[#c9a227]">
                        ₹ {product.price?.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium border
                          ${product.available
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${product.available ? "bg-emerald-400" : "bg-red-400"}`}
                        />
                        {product.available ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        {/* Toggle */}
                        <button
                          onClick={() => handleToggle(product._id)}
                          title={product.available ? "Mark Unavailable" : "Mark Available"}
                          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer text-lg
                            ${product.available
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                            }`}
                        >
                          {product.available ? <FaToggleOn /> : <FaToggleOff />}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
                          title="Edit Product"
                          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#1a2f50] bg-[#080d1a] text-[#4a7abf] text-sm transition-all duration-200 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 cursor-pointer"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(product._id)}
                          title="Delete Product"
                          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#2a1a1a] bg-[#080d1a] text-[#7a3a3a] text-sm transition-all duration-200 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 cursor-pointer"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#080d1a] border border-[#1a2540] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d3f5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                      </div>
                      <p className="text-[13px] text-[#2d3f5c] font-medium tracking-wide">
                        No products found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Footer count bar */}
        {products?.length > 0 && (
          <div className="px-6 py-3.5 border-t border-[#0f1a2e] flex items-center justify-between">
            <p className="text-[12px] text-[#2d3f5c]">
              Showing <span className="text-[#4a6080] font-medium">{products.length}</span> records
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductTable;