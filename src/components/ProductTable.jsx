/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

// ── Confirm Modal ──────────────────────────────────────────
const ConfirmModal = ({ title, desc, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white border border-[#e8e2d6] rounded-3xl p-7 w-full max-w-sm shadow-2xl flex flex-col items-center gap-5" style={{ animation: "fadeInScale 0.2s ease" }}>
      <button onClick={onCancel} className="absolute top-4 right-4 w-7 h-7 rounded-xl bg-[#f8f6f0] border border-[#e8e2d6] flex items-center justify-center text-[#9ca3af] hover:text-[#0f1623] transition-all cursor-pointer">
        <FiX className="text-sm" />
      </button>
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
        <FiAlertTriangle className="text-red-500 text-2xl" />
      </div>
      <div className="text-center">
        <h3 className="text-[#0f1623] font-bold text-base mb-1.5">{title}</h3>
        <p className="text-[#9ca3af] text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="flex gap-3 w-full mt-1">
        <button onClick={onCancel} disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-[#f8f6f0] border border-[#e8e2d6] text-[#6b7280] text-sm font-medium hover:bg-[#e8e2d6] transition-all disabled:opacity-50 cursor-pointer">
          Cancel
        </button>
        <button onClick={onConfirm} disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
          {loading
            ? <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            : <><FaTrash className="text-[11px]" /> Yes, Delete</>}
        </button>
      </div>
    </div>
  </div>
);

// ── Success Toast ──────────────────────────────────────────
const SuccessToast = ({ message, onClose }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" style={{ animation: "slideUp 0.3s ease" }}>
    <div className="flex items-center gap-3 bg-white border border-emerald-200 rounded-2xl px-5 py-3.5 shadow-xl min-w-[280px]">
      <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
        <FaCheckCircle className="text-emerald-500 text-sm" />
      </div>
      <p className="text-[#0f1623] text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="text-[#9ca3af] hover:text-[#0f1623] transition-colors cursor-pointer">
        <FiX className="text-sm" />
      </button>
    </div>
  </div>
);

// ── Main ───────────────────────────────────────────────────
const ProductTable = ({ products, getProducts }) => {
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      const { data } = await api.delete(`/products/delete/${confirmId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfirmId(null);
      setDeleting(false);
      showSuccess(data.message || "Product deleted successfully!");
      getProducts();
    } catch (error) {
      console.log(error);
      setConfirmId(null);
      setDeleting(false);
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      setTogglingId(id);
      const token = localStorage.getItem("token");
      const { data } = await api.put(`/products/toggle/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSuccess(data.message || "Availability updated!");
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <>
      {confirmId && (
        <ConfirmModal
          title="Delete Product?"
          desc="This action cannot be undone. The product will be permanently removed."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
          loading={deleting}
        />
      )}
      {successMsg && <SuccessToast message={successMsg} onClose={() => setSuccessMsg("")} />}

      <div className="w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0f1623] tracking-tight">Product Inventory</h2>
            <p className="text-sm text-[#9ca3af] mt-0.5">
              {products?.length ?? 0} product{products?.length !== 1 ? "s" : ""} listed
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-[#e8e2d6] rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">

              <thead>
                <tr className="border-b border-[#f0ebe2] bg-[#fdfbf7]">
                  {["Image", "Product", "Category", "Price", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9ca3af]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0ebe2]">
                {products?.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="group hover:bg-[#fdfbf7] transition-colors duration-150">

                      {/* Image */}
                      <td className="px-6 py-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#e8e2d6] bg-[#f8f6f0] flex-shrink-0">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      </td>

                      {/* Name + Brand */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-[#0f1623] leading-tight">{product.name}</p>
                        <p className="text-xs text-[#9ca3af] mt-1">{product.brandName}</p>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#B8941F]">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[#D4AF37]">
                          ₹{product.price?.toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${product.available
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-red-50 text-red-500 border-red-200"
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${product.available ? "bg-emerald-500" : "bg-red-500"}`} />
                          {product.available ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">

                          {/* Toggle */}
                          <button
                            onClick={() => handleToggle(product._id)}
                            disabled={togglingId === product._id}
                            title={product.available ? "Mark Unavailable" : "Mark Available"}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer text-lg disabled:opacity-50 ${product.available
                              ? "bg-emerald-50 border-emerald-200 text-emerald-500 hover:bg-emerald-100"
                              : "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                              }`}
                          >
                            {togglingId === product._id
                              ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              : product.available ? <FaToggleOn /> : <FaToggleOff />
                            }
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
                            title="Edit Product"
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-500 text-sm transition-all duration-200 hover:bg-blue-100 cursor-pointer"
                          >
                            <FaEdit />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setConfirmId(product._id)}
                            title="Delete Product"
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 text-sm transition-all duration-200 hover:bg-red-100 cursor-pointer"
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
                        <div className="w-14 h-14 rounded-2xl bg-[#f8f6f0] border border-[#e8e2d6] flex items-center justify-center">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d1c9b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          </svg>
                        </div>
                        <p className="text-sm text-[#9ca3af] font-medium">No products found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {products?.length > 0 && (
            <div className="px-6 py-3.5 border-t border-[#f0ebe2] bg-[#fdfbf7] flex items-center justify-between">
              <p className="text-xs text-[#9ca3af]">
                Showing <span className="text-[#0f1623] font-semibold">{products.length}</span> records
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 block" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 block" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] block" />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
    </>
  );
};

export default ProductTable;