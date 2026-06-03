/* eslint-disable no-unused-vars */

import React, {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useNavigate,
} from "react-router-dom";

import ProductForm from "../components/ProductForm";

import api from "../services/api";

import toast from "react-hot-toast";

const EditProduct = () => {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [imagePreview, setImagePreview] =
        useState([]);

    const [images, setImages] =
        useState([]);

    const [formData, setFormData] =
        useState({

            name: "",
            brandName: "",
            colour: "",
            material: "",
            specialFeature: "",
            productDimensions: "",
            closureType: "",
            waterResistanceLevel: "",
            description: "",
            price: "",
            category: "",
        });

    // =========================
    // Fetch Single Product
    // =========================
    const getSingleProduct = async () => {

        try {

            const { data } =
                await api.get(
                    `/products/single/${id}`
                );

            setFormData(
                data.product
            );

            setImagePreview(
                data.product.images
            );

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        getSingleProduct();

    }, []);

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
    // Handle Images
    // =========================
    const handleImages = (e) => {

        const files =
            [...e.target.files];

        setImages(files);

        const preview =
            files.map((file) =>
                URL.createObjectURL(file)
            );

        setImagePreview(preview);
    };

    // =========================
    // Update Product
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token =
                localStorage.getItem(
                    "token"
                );

            const productData =
                new FormData();

            Object.keys(formData).forEach((key) => {

                productData.append(
                    key,
                    formData[key]
                );

            });

            images.forEach((image) => {

                productData.append(
                    "images",
                    image
                );

            });

            const { data } =
                await api.put(

                    `/products/update/${id}`,

                    productData,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            toast.success(
                data.message
            );

            navigate(
                "/dashboard/products"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Update Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <div className="mb-10">

                <h2 className="text-4xl font-bold text-white">

                    Edit Product

                </h2>

            </div>

            <ProductForm
                formData={formData}
                handleChange={handleChange}
                handleImages={handleImages}
                handleSubmit={handleSubmit}
                loading={loading}
                imagePreview={imagePreview}
            />

        </div>
    );
};

export default EditProduct;