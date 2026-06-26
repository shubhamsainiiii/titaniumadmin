/* eslint-disable react-hooks/set-state-in-effect */
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
            amazonLink: "",
            flipkartLink: "",
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

    const reorderImages = (index) => {
        if (index === 0) return;

        setImages((prev) => {
            const updated = [...prev];
            const selected = updated.splice(index, 1)[0];
            updated.unshift(selected);
            return updated;
        });

        setImagePreview((prev) => {
            const updated = [...prev];
            const selected = updated.splice(index, 1)[0];
            updated.unshift(selected);
            return updated;
        });
    };

    const handleRemoveImage = (index) => {
        setImagePreview((prev) =>
            prev.filter((_, i) => i !== index)
        );

        setImages((prev) =>
            prev.filter((_, i) => i !== index)
        );
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
            <ProductForm
                formData={formData}
                handleChange={handleChange}
                handleImages={handleImages}
                handleSubmit={handleSubmit}
                loading={loading}
                handleRemoveImage={handleRemoveImage}
                imagePreview={imagePreview}
                reorderImages={reorderImages}
            />

        </div>
    );
};

export default EditProduct;