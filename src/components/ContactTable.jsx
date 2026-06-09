// /* eslint-disable react-hooks/set-state-in-effect */

// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { FaTrash, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
// import api from "../services/api";
// import toast from "react-hot-toast";

// // ── Helpers ────────────────────────────────────────────────────────────────

// const getInitials = (name) =>
//     name?.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// const avatarColors = [
//     "bg-yellow-500/20 text-yellow-400",
//     "bg-blue-500/20 text-blue-400",
//     "bg-green-500/20 text-green-400",
//     "bg-purple-500/20 text-purple-400",
//     "bg-pink-500/20 text-pink-400",
// ];

// const getAvatarColor = (name) =>
//     avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

// // ── Stats Card ─────────────────────────────────────────────────────────────

// const StatCard = ({ icon: Icon, label, value, color }) => (
//     <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
//         <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
//             <Icon className="text-lg" />
//         </div>
//         <div>
//             <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-0.5">
//                 {label}
//             </p>
//             <p className="text-white text-2xl font-bold leading-none">{value}</p>
//         </div>
//     </div>
// );

// // ── Main Page ──────────────────────────────────────────────────────────────

// const ContactPage = () => {
//     const [contacts, setContacts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getContacts = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const { data } = await api.get("/contact/all", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setContacts(data.contacts || data);
//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to load contacts");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getContacts();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             const confirmDelete = window.confirm("Delete this inquiry?");
//             if (!confirmDelete) return;

//             const token = localStorage.getItem("token");
//             const { data } = await api.delete(`/contact/delete/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             toast.success(data.message);
//             getContacts();
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "Delete Failed");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen p- rounded-3xl">
//             <div className="mb-5">
//                 <h2 className="text-4xl font-bold text-white">
//                     Contact
//                 </h2>
//             </div>


//             {/* Stats Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//                 <StatCard
//                     icon={FaEnvelope}
//                     label="Total Inquiries"
//                     value={contacts.length}
//                     color="bg-yellow-400/10 text-yellow-400"
//                 />
//                 <StatCard
//                     icon={FaUser}
//                     label="Unique Users"
//                     value={new Set(contacts.map((c) => c.email)).size}
//                     color="bg-blue-400/10 text-blue-400"
//                 />
//                 <StatCard
//                     icon={FaPhone}
//                     label="With Phone"
//                     value={contacts.filter((c) => c.phone).length}
//                     color="bg-green-400/10 text-green-400"
//                 />
//             </div>

//             {/* Table Card */}
//             <div className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden">

//                 {/* Table Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
//                     <div>
//                         <h3 className="text-white font-semibold text-base">
//                             Contact Inquiries
//                         </h3>
//                         <p className="text-gray-400 text-sm mt-0.5">
//                             {contacts.length} total responses
//                         </p>
//                     </div>
//                     <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-3 py-1.5">
//                         <FaEnvelope className="text-yellow-400 text-sm" />
//                         <span className="text-yellow-400 text-sm font-semibold">
//                             {contacts.length} total
//                         </span>
//                     </div>
//                 </div>

//                 {/* Empty State */}
//                 {!contacts.length ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//                         <FaEnvelope className="text-4xl mb-3 text-gray-600" />
//                         <p className="text-sm">No contact inquiries found</p>
//                     </div>
//                 ) : (
//                     <>
//                         {/* Column Labels */}
//                         <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5">
//                             <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
//                                 Name
//                             </div>
//                             <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
//                                 Email
//                             </div>
//                             <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
//                                 Phone
//                             </div>
//                             <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
//                                 Message
//                             </div>
//                             <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
//                                 Action
//                             </div>
//                         </div>

//                         {/* Rows */}
//                         {contacts.map((item, index) => (
//                             <div
//                                 key={item._id || index}
//                                 className="grid grid-cols-12 px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-colors items-center"
//                             >
//                                 {/* Name */}
//                                 <div className="col-span-3 flex items-center gap-3">
//                                     <div
//                                         className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${getAvatarColor(item.name)}`}
//                                     >
//                                         {getInitials(item.name)}
//                                     </div>
//                                     <p className="text-white text-sm font-medium truncate">
//                                         {item.name}
//                                     </p>
//                                 </div>

//                                 {/* Email */}
//                                 <div className="col-span-3">
//                                     <span className="flex items-center gap-2 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-lg w-fit max-w-full">
//                                         <FaEnvelope className="text-[10px] flex-shrink-0" />
//                                         <span className="truncate">{item.email}</span>
//                                     </span>
//                                 </div>

//                                 {/* Phone */}
//                                 <div className="col-span-2">
//                                     <span className="flex items-center gap-2 bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-medium px-2.5 py-1 rounded-lg w-fit">
//                                         <FaPhone className="text-[10px] flex-shrink-0" />
//                                         <span className="truncate">{item.phone || "—"}</span>
//                                     </span>
//                                 </div>

//                                 {/* Message */}
//                                 <div className="col-span-3">
//                                     <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
//                                         {item.message || "—"}
//                                     </p>
//                                 </div>

//                                 {/* Action */}
//                                 <div className="col-span-1 flex justify-center">
//                                     <button
//                                         onClick={() => handleDelete(item._id)}
//                                         className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
//                                         aria-label={`Delete inquiry from ${item.name}`}
//                                     >
//                                         <FaTrash className="text-xs " />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ContactPage;


/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaTrash, FaEnvelope, FaPhone, FaUser, FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import api from "../services/api";
import toast from "react-hot-toast";

// ── Helpers ────────────────────────────────────────────────
const getInitials = (name) =>
    name?.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const avatarColors = [
    { bg: "#FEF3C7", text: "#92400E" },
    { bg: "#DBEAFE", text: "#1E40AF" },
    { bg: "#D1FAE5", text: "#065F46" },
    { bg: "#EDE9FE", text: "#5B21B6" },
    { bg: "#FCE7F3", text: "#9D174D" },
];
const getAvatarColor = (name) =>
    avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

// ── Stat Card ──────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, bg, iconColor }) => (
    <div className="bg-white border border-[#e8e2d6] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
            <Icon className={`text-lg ${iconColor}`} />
        </div>
        <div>
            <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-[#0f1623] text-2xl font-bold leading-none">{value}</p>
        </div>
    </div>
);

// ── Confirm Modal ──────────────────────────────────────────
const ConfirmModal = ({ onConfirm, onCancel, loading }) => (
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
                <h3 className="text-[#0f1623] font-bold text-base mb-1.5">Delete Inquiry?</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">This action cannot be undone. The inquiry will be permanently removed.</p>
            </div>
            <div className="flex gap-3 w-full mt-1">
                <button onClick={onCancel} disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-[#f8f6f0] border border-[#e8e2d6] text-[#6b7280] text-sm font-medium hover:bg-[#e8e2d6] transition-all duration-200 disabled:opacity-50 cursor-pointer">
                    Cancel
                </button>
                <button onClick={onConfirm} disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-100 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                    {loading
                        ? <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        : <><FaTrash className="text-[11px]" /> Yes, Delete</>
                    }
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
            <button onClick={onClose} className="text-[#9ca3af] hover:text-[#0f1623] transition-colors ml-2 cursor-pointer">
                <FiX className="text-sm" />
            </button>
        </div>
    </div>
);

// ── Skeleton Row ───────────────────────────────────────────
const SkeletonRow = () => (
    <div className="grid grid-cols-12 px-6 py-4 border-b border-[#f0ebe2] items-center animate-pulse">
        <div className="col-span-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e8e2d6]" />
            <div className="h-3 bg-[#e8e2d6] rounded-full w-24" />
        </div>
        <div className="col-span-3"><div className="h-6 bg-[#e8e2d6] rounded-lg w-32" /></div>
        <div className="col-span-2"><div className="h-6 bg-[#e8e2d6] rounded-lg w-24" /></div>
        <div className="col-span-3"><div className="h-3 bg-[#e8e2d6] rounded-full w-full" /></div>
        <div className="col-span-1 flex justify-center"><div className="w-8 h-8 rounded-xl bg-[#e8e2d6]" /></div>
    </div>
);

// ── Main Page ──────────────────────────────────────────────
const ContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmId, setConfirmId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const getContacts = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/contact/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContacts(data.contacts || data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getContacts(); }, []);

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const token = localStorage.getItem("token");
            const { data } = await api.delete(`/contact/delete/${confirmId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContacts((prev) => prev.filter((c) => c._id !== confirmId));
            setConfirmId(null);
            setDeleting(false);
            setSuccessMsg(data.message || "Inquiry deleted successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (error) {
            console.log(error);
            setConfirmId(null);
            setDeleting(false);
        }
    };

    return (
        <>
            {confirmId && <ConfirmModal onConfirm={handleDelete} onCancel={() => setConfirmId(null)} loading={deleting} />}
            {successMsg && <SuccessToast message={successMsg} onClose={() => setSuccessMsg("")} />}

            <div className="min-h-screen">

                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#0f1623]">Contacts</h1>
                    <p className="text-[#9ca3af] text-sm mt-1">Manage all customer inquiries</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <StatCard icon={FaEnvelope} label="Total Inquiries" value={contacts.length}
                        bg="bg-[#D4AF37]/10" iconColor="text-[#B8941F]" />
                    <StatCard icon={FaUser} label="Unique Users" value={new Set(contacts.map((c) => c.email)).size}
                        bg="bg-blue-50" iconColor="text-blue-500" />
                    <StatCard icon={FaPhone} label="With Phone" value={contacts.filter((c) => c.phone).length}
                        bg="bg-green-50" iconColor="text-green-500" />
                </div>

                {/* Table Card */}
                <div className="bg-white border border-[#e8e2d6] rounded-2xl overflow-hidden shadow-sm">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0ebe2]">
                        <div>
                            <h3 className="text-[#0f1623] font-bold text-base">Contact Inquiries</h3>
                            <p className="text-[#9ca3af] text-xs mt-0.5">{contacts.length} total responses</p>
                        </div>
                        <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl px-3 py-1.5">
                            <FaEnvelope className="text-[#B8941F] text-sm" />
                            <span className="text-[#B8941F] text-sm font-semibold">{contacts.length} total</span>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <>
                            <div className="grid grid-cols-12 px-6 py-3 border-b border-[#f0ebe2]">
                                {["Name", "Email", "Phone", "Message", "Action"].map((h, i) => (
                                    <div key={h} className={`text-xs font-semibold text-[#9ca3af] uppercase tracking-widest ${i === 4 ? "col-span-1 text-center" : i === 3 ? "col-span-3" : i === 2 ? "col-span-2" : "col-span-3"}`}>{h}</div>
                                ))}
                            </div>
                            {[1, 2, 3, 4].map(i => <SkeletonRow key={i} />)}
                        </>
                    ) : !contacts.length ? (
                        <div className="flex flex-col items-center justify-center py-20 text-[#9ca3af]">
                            <div className="w-14 h-14 rounded-2xl bg-[#f8f6f0] border border-[#e8e2d6] flex items-center justify-center mb-4">
                                <FaEnvelope className="text-2xl text-[#d1d5db]" />
                            </div>
                            <p className="text-sm font-medium">No contact inquiries found</p>
                        </div>
                    ) : (
                        <>
                            {/* Column Labels */}
                            <div className="grid grid-cols-12 px-6 py-3 border-b border-[#f0ebe2] bg-[#fdfbf7]">
                                <div className="col-span-3 text-xs font-semibold text-[#9ca3af] uppercase tracking-widest">Name</div>
                                <div className="col-span-3 text-xs font-semibold text-[#9ca3af] uppercase tracking-widest">Email</div>
                                <div className="col-span-2 text-xs font-semibold text-[#9ca3af] uppercase tracking-widest">Phone</div>
                                <div className="col-span-3 text-xs font-semibold text-[#9ca3af] uppercase tracking-widest">Message</div>
                                <div className="col-span-1 text-xs font-semibold text-[#9ca3af] uppercase tracking-widest text-center">Action</div>
                            </div>

                            {/* Rows */}
                            {contacts.map((item, index) => {
                                const color = getAvatarColor(item.name);
                                return (
                                    <div key={item._id || index}
                                        className="grid grid-cols-12 px-6 py-4 border-b border-[#f0ebe2] last:border-b-0 hover:bg-[#fdfbf7] transition-colors items-center">

                                        {/* Name */}
                                        <div className="col-span-3 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                                                style={{ background: color.bg, color: color.text }}>
                                                {getInitials(item.name)}
                                            </div>
                                            <p className="text-[#0f1623] text-sm font-medium truncate">{item.name}</p>
                                        </div>

                                        {/* Email */}
                                        <div className="col-span-3">
                                            <span className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-lg w-fit max-w-full">
                                                <FaEnvelope className="text-[10px] flex-shrink-0" />
                                                <span className="truncate">{item.email}</span>
                                            </span>
                                        </div>

                                        {/* Phone */}
                                        <div className="col-span-2">
                                            <span className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 text-xs font-medium px-2.5 py-1 rounded-lg w-fit">
                                                <FaPhone className="text-[10px] flex-shrink-0" />
                                                <span className="truncate">{item.phone || "—"}</span>
                                            </span>
                                        </div>

                                        {/* Message */}
                                        <div className="col-span-3">
                                            <p className="text-[#6b7280] text-sm line-clamp-2 leading-relaxed">{item.message || "—"}</p>
                                        </div>

                                        {/* Action */}
                                        <div className="col-span-1 flex justify-center">
                                            <button onClick={() => setConfirmId(item._id)}
                                                className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                                                aria-label={`Delete inquiry from ${item.name}`}>
                                                <FaTrash className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
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

export default ContactPage;