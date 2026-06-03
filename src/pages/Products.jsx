// /* eslint-disable no-unused-vars */

// import React from "react";

// import ProductTable from "../components/ProductTable";

// const Products = () => {

//     const products = [
//         {
//             _id: 1,

//             name: "Titanium Safe X1",

//             price: 45000,

//             available: true,

//             images: [
//                 "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop",
//             ],
//         },
//     ];

//     return (
//         <div>

//             <div className="flex items-center justify-between mb-10">

//                 <h2 className="text-4xl font-bold text-white">

//                     Products

//                 </h2>

//             </div>

//             <ProductTable
//                 products={products}
//             />

//         </div>
//     );
// };

// export default Products;


/* eslint-disable no-unused-vars */

import React, {
    useEffect,
    useState,
} from "react";

import ProductTable from "../components/ProductTable";

import api from "../services/api";

import toast from "react-hot-toast";

const Products = () => {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // =========================
    // Get Products
    // =========================
    const getProducts = async () => {

        try {

            setLoading(true);

            const { data } =
                await api.get(
                    "/products/all"
                );

            setProducts(
                data.products
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed To Fetch Products"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getProducts();

    }, []);

    return (
        <div>

            {/* Heading */}
            <div className="mb-10">

                <h2 className="text-4xl font-bold text-white">

                    Products

                </h2>

                <p className="text-gray-400 mt-3">

                    Manage all TitaniumSafe products.

                </p>

            </div>

            {/* Loading */}
            {
                loading ? (

                    <div className="flex justify-center py-20">

                        <div className="w-14 h-14 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>

                    </div>

                ) : (

                    <ProductTable
                        products={products}
                        getProducts={getProducts}
                    />
                )
            }

        </div>
    );
};

export default Products;