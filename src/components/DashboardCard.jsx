/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({
    title,
    value,
    icon,
    trend,
    loading,
}) => {

    if (loading) {
        return (
            <div className="bg-white border border-[#e8e2d6] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">

                    <div className="flex-1">

                        {/* Title */}
                        <div className="h-3 w-24 bg-[#f8f6f0] rounded mb-4 animate-pulse"></div>

                        {/* Number */}
                        <div className="h-14 w-28 bg-[#faf8f3] rounded-xl mb-4 animate-pulse"></div>

                        {/* Trend */}
                        <div className="h-3 w-32 bg-[#f8f6f0] rounded animate-pulse"></div>

                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-[#faf8f3] animate-pulse"></div>

                </div>
            </div>
        );
    }
    return (
        <motion.div
            whileHover={{
                y: -4,
                boxShadow: "0 12px 32px rgba(212,175,55,0.10)",
            }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-[#e8e2d6] rounded-2xl p-6 flex items-center justify-between shadow-sm cursor-default"
        >
            <div>
                <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest mb-1">
                    {title}
                </p>

                <h2 className="text-4xl font-bold text-[#0f1623] leading-none mt-2">
                    {value}
                </h2>

                {trend && (
                    <p className="text-xs text-[#9ca3af] mt-2">
                        {trend}
                    </p>
                )}
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#B8941F] text-2xl flex-shrink-0">
                {icon}
            </div>
        </motion.div>
    );
};

export default DashboardCard;