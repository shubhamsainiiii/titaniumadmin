/* eslint-disable no-unused-vars */

import React from "react";

import {
    Routes,
    Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Reviews from "../pages/Reviews";
import Contacts from "../pages/Contacts";
import NotFound from "../pages/NotFound";

import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {

    return (
        <Routes>

            {/* Login */}
            <Route
                path="/"
                element={<Login />}
            />

            {/* Dashboard Layout */}
            <Route
                path="/dashboard"
                element={<AdminLayout />}
            >

                <Route
                    index
                    element={<Dashboard />}
                />

                <Route
                    path="products"
                    element={<Products />}
                />

                <Route
                    path="add-product"
                    element={<AddProduct />}
                />

                <Route
                    path="edit-product/:id"
                    element={<EditProduct />}
                />

                <Route
                    path="reviews"
                    element={<Reviews />}
                />

                <Route
                    path="contacts"
                    element={<Contacts />}
                />

            </Route>

            <Route
                path="/dashboard/edit-product/:id"
                element={<EditProduct />}
            />

            {/* Not Found */}
            <Route
                path="*"
                element={<NotFound />}
            />


        </Routes>
    );
};

export default AppRoutes;