/* eslint-disable no-unused-vars */

import React from "react";

import { FaStar } from "react-icons/fa";

const ReviewTable = ({
    reviews,
}) => {

    return (
        <div className="overflow-x-auto bg-[#111827] border border-white/10 rounded-3xl">

            <table className="w-full text-white">

                <thead className="border-b border-white/10">

                    <tr>

                        <th className="p-5 text-left">
                            User
                        </th>

                        <th className="p-5 text-left">
                            Rating
                        </th>

                        <th className="p-5 text-left">
                            Review
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reviews.map((item) => (

                        <tr
                            key={item._id}
                            className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300"
                        >

                            {/* User */}
                            <td className="p-5 font-medium">
                                {item.userName}
                            </td>

                            {/* Rating */}
                            <td className="p-5">

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                        {item.rating}
                                    </span>
                                    <FaStar className="text-lg text-[#D4AF37]" />
                                </div>

                            </td>

                            {/* Review */}
                            <td className="p-5 text-gray-300">
                                {item.review}
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default ReviewTable;