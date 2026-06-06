/* eslint-disable react-hooks/set-state-in-effect */
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