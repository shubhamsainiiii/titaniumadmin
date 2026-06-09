// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { FaStar, FaTrash, FaCheckCircle } from "react-icons/fa";
// import { FiAlertTriangle, FiX } from "react-icons/fi";
// import api from "../services/api";

// // ── Confirm Modal ──────────────────────────────────────────────────────────
// const ConfirmModal = ({ onConfirm, onCancel, loading }) => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
//         <div className="relative bg-[#0d1526] border border-[#1a2540] rounded-3xl p-7 w-full max-w-sm shadow-2xl shadow-black/60 flex flex-col items-center gap-5" style={{ animation: "fadeInScale 0.2s ease" }}>
//             <button
//                 onClick={onCancel}
//                 className="absolute top-4 right-4 w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
//             >
//                 <FiX className="text-sm" />
//             </button>
//             <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
//                 <FiAlertTriangle className="text-red-400 text-2xl" />
//             </div>
//             <div className="text-center">
//                 <h3 className="text-white font-semibold text-base mb-1.5">Delete Review?</h3>
//                 <p className="text-[#4a6080] text-sm leading-relaxed">
//                     This action cannot be undone. The review will be permanently removed.
//                 </p>
//             </div>
//             <div className="flex gap-3 w-full mt-1">
//                 <button
//                     onClick={onCancel}
//                     disabled={loading}
//                     className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     onClick={onConfirm}
//                     disabled={loading}
//                     className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                     {loading ? (
//                         <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin " />
//                     ) : (
//                         <><FaTrash className="text-[11px] " /> Yes, Delete</>
//                     )}
//                 </button>
//             </div>
//         </div>
//     </div>
// );

// // ── Success Toast ──────────────────────────────────────────────────────────
// const SuccessToast = ({ message, onClose }) => (
//     <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" style={{ animation: "slideUp 0.3s ease" }}>
//         <div className="flex items-center gap-3 bg-[#0d1526] border border-emerald-500/30 rounded-2xl px-5 py-3.5 shadow-2xl shadow-black/50 min-w-[280px]">
//             <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
//                 <FaCheckCircle className="text-emerald-400 text-sm" />
//             </div>
//             <p className="text-white text-sm font-medium flex-1">{message}</p>
//             <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors ml-2">
//                 <FiX className="text-sm" />
//             </button>
//         </div>
//     </div>
// );

// const StarRating = ({ rating }) => (
//     <div className="flex items-center gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//             <FaStar
//                 key={star}
//                 className={`text-[13px] ${star <= rating ? "text-[#c9a227]" : "text-[#1a2540]"}`}
//             />
//         ))}
//     </div>
// );

// const ratingColor = (rating) => {
//     if (rating >= 4) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//     if (rating === 3) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
//     return "bg-red-500/10 text-red-400 border-red-500/20";
// };

// const getInitials = (name = "") =>
//     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

// const avatarColors = [
//     "bg-violet-500/10 border-violet-500/20 text-violet-400",
//     "bg-sky-500/10 border-sky-500/20 text-sky-400",
//     "bg-rose-500/10 border-rose-500/20 text-rose-400",
//     "bg-teal-500/10 border-teal-500/20 text-teal-400",
//     "bg-orange-500/10 border-orange-500/20 text-orange-400",
// ];

// const ReviewTable = ({ reviews: initialReviews, getReviews }) => {

//     const [reviews, setReviews] = useState(initialReviews || []);
//     const [confirmId, setConfirmId] = useState(null);
//     const [deleting, setDeleting] = useState(false);
//     const [successMsg, setSuccessMsg] = useState("");

//     // Sync when parent passes updated data
//     React.useEffect(() => {
//         setReviews(initialReviews || []);
//     }, [initialReviews]);

//     const openConfirm = (id) => setConfirmId(id);
//     const closeConfirm = () => { setConfirmId(null); setDeleting(false); };

//     const handleDelete = async () => {
//         try {
//             setDeleting(true);
//             const token = localStorage.getItem("token");
//             const { data } = await api.delete(`/reviews/delete/${confirmId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             // ✅ Instantly remove from local state — no page refresh needed
//             setReviews((prev) => prev.filter((r) => r._id !== confirmId));
//             closeConfirm();
//             setSuccessMsg(data.message || "Review deleted successfully!");
//             getReviews?.();
//             setTimeout(() => setSuccessMsg(""), 3000);
//         } catch (error) {
//             console.log(error);
//             closeConfirm();
//         }
//     };

//     // ── Empty state ─────────────────────────────────────────
//     if (!reviews?.length) {
//         return (
//             <div className="bg-[#0d1526] border border-[#1a2540] rounded-3xl flex flex-col items-center justify-center py-20 gap-3">
//                 <div className="w-12 h-12 rounded-2xl bg-[#080d1a] border border-[#1a2540] flex items-center justify-center">
//                     <FaStar className="text-[#1a2540] text-lg" />
//                 </div>
//                 <p className="text-[13px] text-[#2d3f5c] font-medium tracking-wide">
//                     No reviews yet
//                 </p>
//             </div>
//         );
//     }

//     // ── Stats ───────────────────────────────────────────────
//     const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
//     const dist = [5, 4, 3, 2, 1].map((s) => ({
//         star: s,
//         count: reviews.filter((r) => r.rating === s).length,
//         pct: Math.round((reviews.filter((r) => r.rating === s).length / reviews.length) * 100),
//     }));

//     return (
//         <>
//             {confirmId && (
//                 <ConfirmModal
//                     onConfirm={handleDelete}
//                     onCancel={closeConfirm}
//                     loading={deleting}
//                 />
//             )}
//             {successMsg && (
//                 <SuccessToast message={successMsg} onClose={() => setSuccessMsg("")} />
//             )}

//             <div className="flex flex-col gap-5">

//                 {/* ── Summary card ── */}
//                 <div className="bg-[#0d1526] border border-[#1a2540] rounded-3xl p-6 flex items-center gap-8">

//                     {/* Big score */}
//                     <div className="flex flex-col items-center gap-1 flex-shrink-0">
//                         <span className="text-5xl font-semibold text-slate-100 tracking-tight leading-none">
//                             {avg}
//                         </span>
//                         <div className="flex items-center gap-0.5 mt-1">
//                             {[1, 2, 3, 4, 5].map((s) => (
//                                 <FaStar
//                                     key={s}
//                                     className={`text-[14px] ${s <= Math.round(avg) ? "text-[#c9a227]" : "text-[#1a2540]"}`}
//                                 />
//                             ))}
//                         </div>
//                         <span className="text-[11px] text-[#3d5070] mt-1 tracking-wide">
//                             {reviews.length} review{reviews.length !== 1 ? "s" : ""}
//                         </span>
//                     </div>

//                     <div className="w-px h-16 bg-[#111d33] flex-shrink-0" />

//                     {/* Distribution bars */}
//                     <div className="flex flex-col gap-2 flex-1 min-w-0">
//                         {dist.map(({ star, count, pct }) => (
//                             <div key={star} className="flex items-center gap-3">
//                                 <span className="text-[11px] text-[#3d5070] w-3 flex-shrink-0">{star}</span>
//                                 <FaStar className="text-[10px] text-[#c9a227] flex-shrink-0" />
//                                 <div className="flex-1 h-1.5 bg-[#111d33] rounded-full overflow-hidden">
//                                     <div
//                                         className="h-full bg-[#c9a227] rounded-full transition-all duration-500"
//                                         style={{ width: `${pct}%` }}
//                                     />
//                                 </div>
//                                 <span className="text-[11px] text-[#2d3f5c] w-6 text-right flex-shrink-0">
//                                     {count}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* ── Table card ── */}
//                 <div className="bg-[#0d1526] border border-[#1a2540] rounded-3xl overflow-hidden">

//                     {/* Header */}
//                     <div className="px-6 py-4 border-b border-[#111d33] flex items-center justify-between">
//                         <div>
//                             <h2 className="text-[15px] font-semibold text-slate-100 tracking-tight">
//                                 Customer Reviews
//                             </h2>
//                             <p className="text-[12px] text-[#3d5070] mt-0.5">
//                                 {reviews.length} total responses
//                             </p>
//                         </div>
//                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/20">
//                             <FaStar className="text-[10px]" /> {avg} avg
//                         </span>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full min-w-[620px]">

//                             <thead>
//                                 <tr className="border-b border-[#0f1a2e]">
//                                     {["User", "Rating", "Review", "Action"].map((h) => (
//                                         <th
//                                             key={h}
//                                             className={`px-6 py-3.5 text-left text-[11px] font-medium tracking-[0.12em] uppercase text-[#2d3f5c] ${h === "Action" ? "text-center" : ""}`}
//                                         >
//                                             {h}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>

//                             <tbody className="divide-y divide-[#0f1a2e]">
//                                 {reviews.map((item, idx) => (
//                                     <tr
//                                         key={item._id}
//                                         className="group hover:bg-[#0a1020] transition-colors duration-200"
//                                     >
//                                         {/* User */}
//                                         <td className="px-6 py-4">
//                                             <div className="flex items-center gap-3">
//                                                 <div className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 text-[10px] font-semibold ${avatarColors[idx % avatarColors.length]}`}>
//                                                     {getInitials(item.userName)}
//                                                 </div>
//                                                 <span className="text-[13px] font-medium text-slate-200 whitespace-nowrap">
//                                                     {item.userName}
//                                                 </span>
//                                             </div>
//                                         </td>

//                                         {/* Rating */}
//                                         <td className="px-6 py-4">
//                                             <div className="flex items-center gap-3">
//                                                 <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-semibold border ${ratingColor(item.rating)}`}>
//                                                     {item.rating}
//                                                     <FaStar className="text-[10px]" />
//                                                 </span>
//                                                 <StarRating rating={item.rating} />
//                                             </div>
//                                         </td>

//                                         {/* Review */}
//                                         <td className="px-6 py-4 max-w-xs">
//                                             <p className="text-[13px] text-[#4a6080] leading-relaxed line-clamp-2 group-hover:text-slate-400 transition-colors duration-200">
//                                                 {item.review}
//                                             </p>
//                                         </td>

//                                         {/* Action */}
//                                         <td className="px-6 py-4 text-center">
//                                             <button
//                                                 onClick={() => openConfirm(item._id)}
//                                                 className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 cursor-pointer"
//                                                 aria-label={`Delete review by ${item.userName}`}
//                                             >
//                                                 <FaTrash className="text-[11px]" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Footer */}
//                     <div className="px-6 py-3.5 border-t border-[#0f1a2e] flex items-center justify-between">
//                         <p className="text-[12px] text-[#2d3f5c]">
//                             Showing{" "}
//                             <span className="text-[#4a6080] font-medium">{reviews.length}</span>{" "}
//                             reviews
//                         </p>
//                         <div className="flex items-center gap-1.5">
//                             <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] opacity-40 block" />
//                             <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] opacity-60 block" />
//                             <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] block" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes fadeInScale {
//                     from { opacity: 0; transform: scale(0.95); }
//                     to   { opacity: 1; transform: scale(1); }
//                 }
//                 @keyframes slideUp {
//                     from { opacity: 0; transform: translateX(-50%) translateY(16px); }
//                     to   { opacity: 1; transform: translateX(-50%) translateY(0); }
//                 }
//             `}</style>
//         </>
//     );
// };

// export default ReviewTable;

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaStar, FaTrash, FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import api from "../services/api";

// ── Confirm Modal ──────────────────────────────────────────
const ConfirmModal = ({ onConfirm, onCancel, loading }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
        <div className="relative bg-white border border-[#e8e2d6] rounded-3xl p-7 w-full max-w-sm shadow-2xl flex flex-col items-center gap-5"
            style={{ animation: "fadeInScale 0.2s ease" }}>
            <button onClick={onCancel}
                className="absolute top-4 right-4 w-7 h-7 rounded-xl bg-[#f8f6f0] border border-[#e8e2d6] flex items-center justify-center text-[#9ca3af] hover:text-[#0f1623] transition-all cursor-pointer">
                <FiX className="text-sm" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                <FiAlertTriangle className="text-red-500 text-2xl" />
            </div>
            <div className="text-center">
                <h3 className="text-[#0f1623] font-bold text-base mb-1.5">Delete Review?</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                    This action cannot be undone. The review will be permanently removed.
                </p>
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

// ── Helpers ────────────────────────────────────────────────
const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={`text-[13px] ${star <= rating ? "text-[#D4AF37]" : "text-[#e8e2d6]"}`} />
        ))}
    </div>
);

const ratingColor = (rating) => {
    if (rating >= 4) return "bg-emerald-50 text-emerald-600 border-emerald-200";
    if (rating === 3) return "bg-amber-50 text-amber-600 border-amber-200";
    return "bg-red-50 text-red-500 border-red-200";
};

const getInitials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const avatarColors = [
    { bg: "#EDE9FE", text: "#5B21B6" },
    { bg: "#DBEAFE", text: "#1E40AF" },
    { bg: "#FCE7F3", text: "#9D174D" },
    { bg: "#D1FAE5", text: "#065F46" },
    { bg: "#FEF3C7", text: "#92400E" },
];

// ── Main ───────────────────────────────────────────────────
const ReviewTable = ({ reviews: initialReviews, getReviews }) => {
    const [reviews, setReviews] = useState(initialReviews || []);
    const [confirmId, setConfirmId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    React.useEffect(() => { setReviews(initialReviews || []); }, [initialReviews]);

    const openConfirm = (id) => setConfirmId(id);
    const closeConfirm = () => { setConfirmId(null); setDeleting(false); };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const token = localStorage.getItem("token");
            const { data } = await api.delete(`/reviews/delete/${confirmId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReviews((prev) => prev.filter((r) => r._id !== confirmId));
            closeConfirm();
            setSuccessMsg(data.message || "Review deleted successfully!");
            getReviews?.();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (error) {
            console.log(error);
            closeConfirm();
        }
    };

    // Empty state
    if (!reviews?.length) {
        return (
            <div className="bg-white border border-[#e8e2d6] rounded-3xl flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#f8f6f0] border border-[#e8e2d6] flex items-center justify-center">
                    <FaStar className="text-[#d1c9b8] text-lg" />
                </div>
                <p className="text-sm text-[#9ca3af] font-medium tracking-wide">No reviews yet</p>
            </div>
        );
    }

    const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
    const dist = [5, 4, 3, 2, 1].map((s) => ({
        star: s,
        count: reviews.filter((r) => r.rating === s).length,
        pct: Math.round((reviews.filter((r) => r.rating === s).length / reviews.length) * 100),
    }));

    return (
        <>
            {confirmId && <ConfirmModal onConfirm={handleDelete} onCancel={closeConfirm} loading={deleting} />}
            {successMsg && <SuccessToast message={successMsg} onClose={() => setSuccessMsg("")} />}

            <div className="flex flex-col gap-5">

                {/* Summary Card */}
                <div className="bg-white border border-[#e8e2d6] rounded-3xl p-6 flex items-center gap-8 shadow-sm">
                    {/* Score */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <span className="text-5xl font-bold text-[#0f1623] tracking-tight leading-none">{avg}</span>
                        <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <FaStar key={s} className={`text-[14px] ${s <= Math.round(avg) ? "text-[#D4AF37]" : "text-[#e8e2d6]"}`} />
                            ))}
                        </div>
                        <span className="text-[11px] text-[#9ca3af] mt-1 tracking-wide">
                            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="w-px h-16 bg-[#f0ebe2] flex-shrink-0" />

                    {/* Bars */}
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        {dist.map(({ star, count, pct }) => (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-[11px] text-[#9ca3af] w-3 flex-shrink-0">{star}</span>
                                <FaStar className="text-[10px] text-[#D4AF37] flex-shrink-0" />
                                <div className="flex-1 h-1.5 bg-[#f0ebe2] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="text-[11px] text-[#9ca3af] w-6 text-right flex-shrink-0">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white border border-[#e8e2d6] rounded-3xl overflow-hidden shadow-sm">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[#f0ebe2] flex items-center justify-between bg-[#fdfbf7]">
                        <div>
                            <h2 className="text-sm font-bold text-[#0f1623] tracking-tight">Customer Reviews</h2>
                            <p className="text-xs text-[#9ca3af] mt-0.5">{reviews.length} total responses</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#D4AF37]/10 text-[#B8941F] border border-[#D4AF37]/20">
                            <FaStar className="text-[10px]" /> {avg} avg
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[620px]">
                            <thead>
                                <tr className="border-b border-[#f0ebe2] bg-[#fdfbf7]">
                                    {["User", "Rating", "Review", "Action"].map((h) => (
                                        <th key={h}
                                            className={`px-6 py-3.5 text-left text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9ca3af] ${h === "Action" ? "text-center" : ""}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0ebe2]">
                                {reviews.map((item, idx) => {
                                    const color = avatarColors[idx % avatarColors.length];
                                    return (
                                        <tr key={item._id} className="group hover:bg-[#fdfbf7] transition-colors duration-150">

                                            {/* User */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                                                        style={{ background: color.bg, color: color.text, borderColor: color.bg }}>
                                                        {getInitials(item.userName)}
                                                    </div>
                                                    <span className="text-sm font-medium text-[#0f1623] whitespace-nowrap">
                                                        {item.userName}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Rating */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${ratingColor(item.rating)}`}>
                                                        {item.rating}<FaStar className="text-[10px]" />
                                                    </span>
                                                    <StarRating rating={item.rating} />
                                                </div>
                                            </td>

                                            {/* Review */}
                                            <td className="px-6 py-4 max-w-xs">
                                                <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2 group-hover:text-[#4a5568] transition-colors duration-150">
                                                    {item.review}
                                                </p>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => openConfirm(item._id)}
                                                    className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center mx-auto hover:bg-red-100 transition-all duration-200 cursor-pointer"
                                                    aria-label={`Delete review by ${item.userName}`}>
                                                    <FaTrash className="text-[11px]" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3.5 border-t border-[#f0ebe2] bg-[#fdfbf7] flex items-center justify-between">
                        <p className="text-xs text-[#9ca3af]">
                            Showing <span className="text-[#0f1623] font-semibold">{reviews.length}</span> reviews
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 block" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 block" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] block" />
                        </div>
                    </div>
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

export default ReviewTable;