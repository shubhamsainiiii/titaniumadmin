// /* eslint-disable no-unused-vars */

// import React from "react";

// import {
//     FaBoxOpen,
//     FaStar,
//     FaEnvelope,
// } from "react-icons/fa";

// import DashboardCard from "../components/DashboardCard";

// const Dashboard = () => {

//     return (
//         <div>

//             <h2 className="text-4xl font-bold text-white mb-10">

//                 Dashboard

//             </h2>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//                 <DashboardCard
//                     title="Total Products"
//                     value="12"
//                     icon={<FaBoxOpen />}
//                 />

//                 <DashboardCard
//                     title="Total Reviews"
//                     value="48"
//                     icon={<FaStar />}
//                 />

//                 <DashboardCard
//                     title="Total Contacts"
//                     value="25"
//                     icon={<FaEnvelope />}
//                 />

//             </div>

//         </div>
//     );
// };

// export default Dashboard;

/* eslint-disable no-unused-vars */

import React, {
    useEffect,
    useState,
} from "react";

import {
    FaBoxOpen,
    FaStar,
    FaEnvelope,
} from "react-icons/fa";

import DashboardCard from "../components/DashboardCard";

import api from "../services/api";

import toast from "react-hot-toast";

import Loader from "../components/Loader";

const Dashboard = () => {

    // =========================
    // States
    // =========================
    const [loading, setLoading] =
        useState(true);

    const [stats, setStats] =
        useState({

            totalProducts: 0,
            totalReviews: 0,
            totalContacts: 0,
        });

    // =========================
    // Fetch Dashboard Data
    // =========================
    const getDashboardData = async () => {

        try {

            setLoading(true);

            // Parallel APIs
            const [

                productsRes,

                reviewsRes,

                contactsRes,

            ] = await Promise.all([

                api.get("/products/all"),

                api.get("/reviews/latest"),

                api.get("/contact/all"),

            ]);

            setStats({

                totalProducts:
                    productsRes.data.products.length,


                totalReviews:
                    reviewsRes.data.reviews.length,

                totalContacts:
                    contactsRes.data.contacts.length,
            });

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed To Load Dashboard"
            );

        } finally {

            setLoading(false);

        }
    };

    // =========================
    // Use Effect
    // =========================
    useEffect(() => {

        getDashboardData();

    }, []);

    // =========================
    // Loading
    // =========================
    if (loading) {

        return <Loader />;

    }

    return (
        <div>

            {/* Heading */}
            <div className="mb-10">

                <h2 className="text-4xl font-bold text-white">

                    Dashboard

                </h2>

                <p className="text-gray-400 mt-3">

                    Welcome back admin 👋

                </p>

            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Products */}
                <DashboardCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={<FaBoxOpen />}
                />

                {/* Reviews */}
                <DashboardCard
                    title="Total Reviews"
                    value={stats.totalReviews}
                    icon={<FaStar />}
                />

                {/* Contacts */}
                <DashboardCard
                    title="Total Contacts"
                    value={stats.totalContacts}
                    icon={<FaEnvelope />}
                />

            </div>

        </div>
    );
};

export default Dashboard;