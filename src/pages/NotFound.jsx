/* eslint-disable no-unused-vars */

import React from "react";

import {
    Link,
} from "react-router-dom";

const NotFound = () => {

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-center px-5">

            <h1 className="text-7xl font-bold text-[#D4AF37]">

                404

            </h1>

            <h2 className="text-3xl font-bold text-white mt-5">

                Page Not Found

            </h2>

            <Link
                to="/dashboard"

                className="mt-8 px-8 py-4 rounded-2xl bg-[#D4AF37] text-[#0F172A] font-bold"
            >

                Go Dashboard

            </Link>

        </div>
    );
};

export default NotFound;