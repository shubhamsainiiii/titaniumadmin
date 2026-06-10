/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */

import React, {
    useEffect,
    useState,
} from "react";

import ReviewTable from "../components/ReviewTable";

import api from "../services/api";

import toast from "react-hot-toast";

const Reviews = () => {

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const getReviews = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const { data } =
                await api.get(
                    "/reviews/all",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setReviews(
                data.reviews
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed To Load Reviews"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getReviews();

    }, []);

    return (
        <div>

            <div className="mb-10">

                <h2 className="text-4xl font-bold text-[#0f1623]">

                    Reviews

                </h2>

                <p className="text-gray-400 mt-2">

                    Total Reviews: {reviews.length}

                </p>

            </div>

            {loading ? (

                <div className="text-center text-white py-20">
                    Loading Reviews...
                </div>

            ) : (

                <ReviewTable
                    reviews={reviews}
                />

            )}

        </div>
    );
};

export default Reviews;