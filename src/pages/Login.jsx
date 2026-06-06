/* eslint-disable no-unused-vars */
import React, {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    motion,
} from "framer-motion";

import toast from "react-hot-toast";

import api from "../services/api";

const Login = () => {

    const navigate =
        useNavigate();

    // =========================
    // States
    // =========================
    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            email: "",
            password: "",
        });

    // =========================
    // Handle Change
    // =========================
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    // =========================
    // Handle Submit
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            // API Call
            console.log("API URL:", import.meta.env.VITE_API_URL);
            const { data } =
                await api.post(

                    "/auth/login",

                    formData
                );

            // Save Token
            localStorage.setItem(
                "token",
                data.token
            );

            // Success Toast
            toast.success(
                data.message
            );

            // Navigate
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-5">

            <motion.form
                initial={{
                    opacity: 0,
                    y: 40,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: 0.5,
                }}

                onSubmit={handleSubmit}

                className="w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl p-8"
            >

                {/* Heading */}
                <h2 className="text-4xl font-bold text-center text-white mb-2">

                    Admin Login

                </h2>

                <p className="text-gray-400 text-center mb-10">

                    Welcome back admin

                </p>

                {/* Email */}
                <div className="mb-6">

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"

                        value={formData.email}

                        onChange={handleChange}

                        className="w-full h-[55px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
                    />

                </div>

                {/* Password */}
                <div className="mb-8">

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"

                        value={formData.password}

                        onChange={handleChange}

                        className="w-full h-[55px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
                    />

                </div>

                {/* Button */}
                <button
                    type="submit"

                    disabled={loading}

                    className="w-full h-[55px] rounded-2xl bg-[#D4AF37] text-[#0F172A] font-bold text-lg hover:opacity-90 transition-all duration-300"
                >

                    {
                        loading
                            ? "Please Wait..."
                            : "Login"
                    }

                </button>

            </motion.form>

        </div>
    );
};

export default Login;