/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import ProductForm from "../components/ProductForm";
import api from "../services/api";
import toast from "react-hot-toast";
const AddProduct = () => {

    // =========================
    // States
    // =========================
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
    // Handle Input Change
    // =========================
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const handleImages = async (e) => {

        const files = Array.from(e.target.files);

        try {

            const compressedFiles =
                await Promise.all(

                    files.map(async (file) => {

                        const compressed =
                            await imageCompression(
                                file,
                                {
                                    maxSizeMB: 0.3,
                                    maxWidthOrHeight: 1200,
                                    useWebWorker: true,
                                }
                            );

                        console.log(
                            "Original:",
                            (
                                file.size /
                                1024 /
                                1024
                            ).toFixed(2),
                            "MB"
                        );

                        console.log(
                            "Compressed:",
                            (
                                compressed.size /
                                1024 /
                                1024
                            ).toFixed(2),
                            "MB"
                        );

                        return compressed;
                    })
                );

            setImages(compressedFiles);

            const preview =
                compressedFiles.map(
                    (file) =>
                        URL.createObjectURL(file)
                );

            setImagePreview(preview);

        } catch (error) {

            console.log(error);

            toast.error(
                "Image Compression Failed"
            );
        }
    };


    const reorderImages = (index) => {
        if (index === 0) return;

        // Actual files reorder
        setImages((prev) => {
            const updated = [...prev];
            const selected = updated.splice(index, 1)[0];
            updated.unshift(selected);
            return updated;
        });

        // Preview reorder
        setImagePreview((prev) => {
            const updated = [...prev];
            const selected = updated.splice(index, 1)[0];
            updated.unshift(selected);
            return updated;
        });
    };


    const handleRemoveImage = (index) => {
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };


    // =========================
    // Handle Submit
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            // Get Token
            const token =
                localStorage.getItem(
                    "token"
                );

            // Validation
            if (!token) {
                setLoading(false);

                toast.error(
                    "Please Login First"
                );

                return;
            }

            // FormData
            const productData =
                new FormData();

            // Append Fields
            Object.keys(formData).forEach((key) => {

                productData.append(
                    key,
                    formData[key]
                );

            });

            // Append Images
            images.forEach((image) => {

                productData.append(
                    "images",
                    image
                );

            });

            // =========================
            // API Call
            // =========================
            const { data } =
                await api.post(

                    "/products/create",

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

            // Success
            toast.success(
                data.message
            );

            // Reset Form
            setFormData({

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

            setImages([]);

            setImagePreview([]);

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Something Went Wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>
            {/* Product Form */}
            <ProductForm
                formData={formData}
                handleChange={handleChange}
                handleImages={handleImages}
                handleRemoveImage={handleRemoveImage}
                handleSubmit={handleSubmit}
                loading={loading}
                imagePreview={imagePreview}
                reorderImages={reorderImages}
            />

        </div>
    );
};

export default AddProduct;