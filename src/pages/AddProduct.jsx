// /* eslint-disable no-unused-vars */

// import React, {
//     useState,
// } from "react";

// import ProductForm from "../components/ProductForm";

// import axios from "axios";

// import toast from "react-hot-toast";

// const AddProduct = () => {

//     const [loading, setLoading] =
//         useState(false);

//     const [imagePreview, setImagePreview] =
//         useState([]);

//     const [images, setImages] =
//         useState([]);

//     const [formData, setFormData] =
//         useState({

//             name: "",
//             brandName: "",
//             colour: "",
//             material: "",
//             specialFeature: "",
//             productDimensions: "",
//             closureType: "",
//             waterResistanceLevel: "",
//             description: "",
//             price: "",
//             category: "",
//         });

//     // =========================
//     // Handle Input Change
//     // =========================
//     const handleChange = (e) => {

//         setFormData({

//             ...formData,

//             [e.target.name]:
//                 e.target.value,
//         });
//     };

//     // =========================
//     // Handle Images
//     // =========================
//     const handleImages = (e) => {

//         const files =
//             [...e.target.files];

//         setImages(files);

//         // Preview
//         const preview =
//             files.map((file) =>
//                 URL.createObjectURL(file)
//             );

//         setImagePreview(preview);
//     };

//     // =========================
//     // Handle Submit
//     // =========================
//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setLoading(true);

//             const token =
//                 localStorage.getItem("token");

//             // FormData
//             const productData =
//                 new FormData();

//             // Append Fields
//             Object.keys(formData).forEach((key) => {

//                 productData.append(
//                     key,
//                     formData[key]
//                 );

//             });

//             // Append Images
//             images.forEach((image) => {

//                 productData.append(
//                     "images",
//                     image
//                 );

//             });

//             // API Callsss
//             const { data } =
//                 await axios.post(

//                     "http://localhost:8080/api/products/create",

//                     productData,

//                     {
//                         headers: {

//                             Authorization:
//                                 `Bearer ${token}`,

//                             "Content-Type":
//                                 "multipart/form-data",
//                         },
//                     }
//                 );

//             // Success
//             toast.success(
//                 data.message
//             );

//             // Reset Form
//             setFormData({

//                 name: "",
//                 brandName: "",
//                 colour: "",
//                 material: "",
//                 specialFeature: "",
//                 productDimensions: "",
//                 closureType: "",
//                 waterResistanceLevel: "",
//                 description: "",
//                 price: "",
//                 category: "",
//             });

//             setImages([]);

//             setImagePreview([]);

//         } catch (error) {

//             console.log(error);

//             toast.error(

//                 error.response?.data?.message ||

//                 "Something Went Wrong"
//             );

//         } finally {

//             setLoading(false);

//         }
//     };

//     return (
//         <div>

//             {/* Heading */}
//             <div className="mb-10">

//                 <h2 className="text-4xl font-bold text-white">

//                     Add Product

//                 </h2>

//                 <p className="text-gray-400 mt-3">

//                     Upload new TitaniumSafe product details.

//                 </p>

//             </div>

//             {/* Form */}
//             <ProductForm
//                 formData={formData}
//                 handleChange={handleChange}
//                 handleImages={handleImages}
//                 handleSubmit={handleSubmit}
//                 loading={loading}
//                 imagePreview={imagePreview}
//             />

//         </div>
//     );
// };

// export default AddProduct;



/* eslint-disable no-unused-vars */

import React, {
    useState,
} from "react";

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

    // =========================
    // Handle Images
    // =========================
    const handleImages = (e) => {

        const files =
            [...e.target.files];

        setImages(files);

        // Preview Images
        const preview =
            files.map((file) =>
                URL.createObjectURL(file)
            );

        setImagePreview(preview);
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

            {/* Heading */}
            <div className="mb-10">

                <h2 className="text-4xl font-bold text-white">

                    Add Product

                </h2>

                <p className="text-gray-400 mt-3">

                    Upload new TitaniumSafe product details.

                </p>

            </div>

            {/* Product Form */}
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

export default AddProduct;