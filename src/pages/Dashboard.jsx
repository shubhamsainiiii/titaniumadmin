/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaStar, FaEnvelope, FaArrowUp } from "react-icons/fa";
import api from "../services/api";

const StatCard = ({ title, value, icon, color, loading }) => {
    const colors = {
        gold: { bg: "bg-[#c9a227]/10", border: "border-[#c9a227]/20", icon: "text-[#c9a227]", bar: "bg-[#c9a227]", glow: "shadow-[#c9a227]/10" },
        blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400", bar: "bg-blue-400", glow: "shadow-blue-500/10" },
        violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", icon: "text-violet-400", bar: "bg-violet-400", glow: "shadow-violet-500/10" },
    };
    const c = colors[color] || colors.gold;

    return (
        <div className={`relative bg-[#0d1526] border ${c.border} rounded-2xl p-6 overflow-hidden shadow-xl ${c.glow}`}>

            {/* Subtle corner glow */}
            <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${c.bg} blur-2xl`} />

            <div className="relative flex items-start justify-between">

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                    <span className={`${c.icon} text-lg`}>{icon}</span>
                </div>

                {/* Trend badge */}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                    <FaArrowUp className="text-[8px]" /> Live
                </span>
            </div>

            {/* Value */}
            <div className="mt-5">
                {loading ? (
                    <div className="h-9 w-16 bg-[#1a2540] rounded-lg animate-pulse" />
                ) : (
                    <p className="text-4xl font-semibold text-slate-100 tracking-tight leading-none">
                        {value}
                    </p>
                )}
                <p className="text-[13px] text-[#3d5070] mt-2 font-medium tracking-wide">
                    {title}
                </p>
            </div>

            {/* Bottom accent bar */}
            <div className="mt-5 h-0.5 w-full bg-[#111d33] rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full w-2/3 opacity-60`} />
            </div>

        </div>
    );
};

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, reviews: 0, contacts: 0 });
    const [loading, setLoading] = useState(true);

    const getDashboardStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const [productsRes, reviewsRes, contactsRes] = await Promise.all([
                api.get("/products/all"),
                api.get("/reviews/all", { headers: { Authorization: `Bearer ${token}` } }),
                api.get("/contact/all", { headers: { Authorization: `Bearer ${token}` } }),
            ]);

            setStats({
                products: productsRes.data.products?.length || 0,
                reviews: reviewsRes.data.totalReviews || reviewsRes.data.reviews?.length || 0,
                contacts: contactsRes.data.contacts?.length || 0,
            });
        } catch (error) {
            console.log("Dashboard Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getDashboardStats(); }, []);

    const cards = [
        { title: "Total Products", value: stats.products, icon: <FaBoxOpen />, color: "gold" },
        { title: "Total Reviews", value: stats.reviews, icon: <FaStar />, color: "blue" },
        { title: "Total Contacts", value: stats.contacts, icon: <FaEnvelope />, color: "violet" },
    ];

    return (
        <div className="min-h-screen bg-[#070c18] p-6 lg:p-8">

            {/* ── Page Header ── */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-6 rounded-full bg-[#c9a227]" />
                    <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#3d5070]">
                        Overview
                    </p>
                </div>
                <h1 className="text-3xl font-semibold text-slate-100 tracking-tight">
                    Dashboard
                </h1>
                <p className="text-[13px] text-[#3d5070] mt-1.5">
                    Welcome back, Admin. Here's what's happening today.
                </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {cards.map((card) => (
                    <StatCard key={card.title} {...card} loading={loading} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;