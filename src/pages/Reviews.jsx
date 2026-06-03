/* eslint-disable no-unused-vars */

import React from "react";

import ReviewTable from "../components/ReviewTable";

const Reviews = () => {

    const reviews = [
        {
            _id: 1,

            userName: "Shubham",

            rating: 5,

            review: "Amazing Product",
        },
    ];

    return (
        <div>

            <h2 className="text-4xl font-bold text-white mb-10">

                Reviews

            </h2>

            <ReviewTable
                reviews={reviews}
            />

        </div>
    );
};

export default Reviews;