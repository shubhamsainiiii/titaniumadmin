/* eslint-disable no-unused-vars */

import React from "react";

import { motion } from "framer-motion";

const DashboardCard = ({
    title,
    value,
    icon,
}) => {

    return (
        <motion.div
            whileHover={{
                y: -5,
            }}
            className="bg-[#111827] border border-white/10 rounded-3xl p-6 flex items-center justify-between"
        >

            <div>

                <p className="text-gray-400 text-sm">
                    {title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                    {value}
                </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-3xl">

                {icon}

            </div>

        </motion.div>
    );
};

export default DashboardCard;

