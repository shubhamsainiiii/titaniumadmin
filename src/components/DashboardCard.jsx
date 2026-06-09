// /* eslint-disable no-unused-vars */

// import React from "react";

// import { motion } from "framer-motion";

// const DashboardCard = ({
//     title,
//     value,
//     icon,
// }) => {

//     return (
//         <motion.div
//             whileHover={{
//                 y: -5,
//             }}
//             className="bg-[#111827] border border-white/10 rounded-3xl p-6 flex items-center justify-between"
//         >

//             <div>

//                 <p className="text-gray-400 text-sm">
//                     {title}
//                 </p>

//                 <h2 className="text-4xl font-bold text-white mt-2">
//                     {value}
//                 </h2>

//             </div>

//             <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-3xl">

//                 {icon}

//             </div>

//         </motion.div>
//     );
// };

// export default DashboardCard;

// /* eslint-disable no-unused-vars */
// import React from "react";
// import { motion } from "framer-motion";

// const DashboardCard = ({ title, value, icon, trend }) => {
//     return (
//         <motion.div
//             whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(212,175,55,0.10)" }}
//             transition={{ duration: 0.2 }}
//             className="bg-white border border-[#e8e2d6] rounded-2xl p-6 flex items-center justify-between shadow-sm cursor-default"
//         >
//             <div>
//                 <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest mb-1">
//                     {title}
//                 </p>
//                 <h2 className="text-4xl font-bold text-[#0f1623] leading-none mt-2">
//                     {value}
//                 </h2>
//                 {trend && (
//                     <p className="text-xs text-[#9ca3af] mt-2">{trend}</p>
//                 )}
//             </div>

//             <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#B8941F] text-2xl flex-shrink-0">
//                 {icon}
//             </div>
//         </motion.div>
//     );
// };

// export default DashboardCard;


/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({
    title,
    value,
    icon,
    trend,
    loading
}) => {

    if (loading) {
        return (
            <div className="bg-white border border-[#e8e2d6] rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="h-3 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 w-20 bg-gray-200 rounded mb-3"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded"></div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            whileHover={{
                y: -4,
                boxShadow:
                    "0 12px 32px rgba(212,175,55,0.10)",
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