/* eslint-disable react-hooks/set-state-in-effect */

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaTrash, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import api from "../services/api";
import toast from "react-hot-toast";

// ── Helpers ────────────────────────────────────────────────────────────────

const getInitials = (name) =>
    name?.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const avatarColors = [
    "bg-yellow-500/20 text-yellow-400",
    "bg-blue-500/20 text-blue-400",
    "bg-green-500/20 text-green-400",
    "bg-purple-500/20 text-purple-400",
    "bg-pink-500/20 text-pink-400",
];

const getAvatarColor = (name) =>
    avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

// ── Stats Card ─────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="text-lg" />
        </div>
        <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-0.5">
                {label}
            </p>
            <p className="text-white text-2xl font-bold leading-none">{value}</p>
        </div>
    </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────

const ContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getContacts = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/contact/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContacts(data.contacts || data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Delete this inquiry?");
            if (!confirmDelete) return;

            const token = localStorage.getItem("token");
            const { data } = await api.delete(`/contact/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(data.message);
            getContacts();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Delete Failed");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p- rounded-3xl">
            <div className="mb-5">
                <h2 className="text-4xl font-bold text-white">
                    Contact
                </h2>
            </div>


            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard
                    icon={FaEnvelope}
                    label="Total Inquiries"
                    value={contacts.length}
                    color="bg-yellow-400/10 text-yellow-400"
                />
                <StatCard
                    icon={FaUser}
                    label="Unique Users"
                    value={new Set(contacts.map((c) => c.email)).size}
                    color="bg-blue-400/10 text-blue-400"
                />
                <StatCard
                    icon={FaPhone}
                    label="With Phone"
                    value={contacts.filter((c) => c.phone).length}
                    color="bg-green-400/10 text-green-400"
                />
            </div>

            {/* Table Card */}
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden">

                {/* Table Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                        <h3 className="text-white font-semibold text-base">
                            Contact Inquiries
                        </h3>
                        <p className="text-gray-400 text-sm mt-0.5">
                            {contacts.length} total responses
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-3 py-1.5">
                        <FaEnvelope className="text-yellow-400 text-sm" />
                        <span className="text-yellow-400 text-sm font-semibold">
                            {contacts.length} total
                        </span>
                    </div>
                </div>

                {/* Empty State */}
                {!contacts.length ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <FaEnvelope className="text-4xl mb-3 text-gray-600" />
                        <p className="text-sm">No contact inquiries found</p>
                    </div>
                ) : (
                    <>
                        {/* Column Labels */}
                        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5">
                            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                Name
                            </div>
                            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                Email
                            </div>
                            <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                Phone
                            </div>
                            <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                Message
                            </div>
                            <div className="col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
                                Action
                            </div>
                        </div>

                        {/* Rows */}
                        {contacts.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="grid grid-cols-12 px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-colors items-center"
                            >
                                {/* Name */}
                                <div className="col-span-3 flex items-center gap-3">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${getAvatarColor(item.name)}`}
                                    >
                                        {getInitials(item.name)}
                                    </div>
                                    <p className="text-white text-sm font-medium truncate">
                                        {item.name}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="col-span-3">
                                    <span className="flex items-center gap-2 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-lg w-fit max-w-full">
                                        <FaEnvelope className="text-[10px] flex-shrink-0" />
                                        <span className="truncate">{item.email}</span>
                                    </span>
                                </div>

                                {/* Phone */}
                                <div className="col-span-2">
                                    <span className="flex items-center gap-2 bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-medium px-2.5 py-1 rounded-lg w-fit">
                                        <FaPhone className="text-[10px] flex-shrink-0" />
                                        <span className="truncate">{item.phone || "—"}</span>
                                    </span>
                                </div>

                                {/* Message */}
                                <div className="col-span-3">
                                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                        {item.message || "—"}
                                    </p>
                                </div>

                                {/* Action */}
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
                                        aria-label={`Delete inquiry from ${item.name}`}
                                    >
                                        <FaTrash className="text-xs " />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactPage;