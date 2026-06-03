
/* eslint-disable no-unused-vars */

import React from "react";

import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import toast from "react-hot-toast";

const ProductTable = ({
  products,
  getProducts,
}) => {

  const navigate =
    useNavigate();

  // =========================
  // Delete Product
  // =========================
  const handleDelete = async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      // Confirm
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete) return;

      // API
      const { data } =
        await api.delete(

          `/products/delete/${id}`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      // Success
      toast.success(
        data.message
      );

      // Refresh Products
      getProducts();

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Delete Failed"
      );

    }
  };

  // =========================
  // Toggle Availability
  // =========================
  const handleToggle = async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      // API
      const { data } =
        await api.put(

          `/products/toggle/${id}`,

          {},

          {
            headers: {

              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      // Success
      toast.success(
        data.message
      );

      // Refresh Products
      getProducts();

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Update Failed"
      );

    }
  };

  return (
    <div className="overflow-x-auto bg-[#111827] border border-white/10 rounded-3xl">

      <table className="w-full text-white min-w-[900px]">

        {/* Table Head */}
        <thead className="border-b border-white/10 bg-white/[0.02]">

          <tr>

            <th className="p-5 text-left font-semibold">
              Image
            </th>

            <th className="p-5 text-left font-semibold">
              Product
            </th>

            <th className="p-5 text-left font-semibold">
              Category
            </th>

            <th className="p-5 text-left font-semibold">
              Price
            </th>

            <th className="p-5 text-left font-semibold">
              Status
            </th>

            <th className="p-5 text-left font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        {/* Table Body */}
        <tbody>

          {
            products?.length > 0 ? (

              products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b border-white/5 hover:bg-white/3 transition-all duration-300"
                >

                  {/* Product Image */}
                  <td className="p-5">

                    <img
                      src={
                        product.images?.[0]
                      }

                      alt={product.name}

                      className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                    />

                  </td>

                  {/* Product Name */}
                  <td className="p-5">

                    <div>

                      <h3 className="font-semibold text-lg text-white">

                        {product.name}

                      </h3>

                      <p className="text-sm text-gray-400 mt-1">

                        {
                          product.brandName
                        }

                      </p>

                    </div>

                  </td>

                  {/* Category */}
                  <td className="p-5 text-gray-300">

                    {product.category}

                  </td>

                  {/* Price */}
                  <td className="p-5 font-bold text-[#D4AF37]">

                    ₹ {product.price}

                  </td>

                  {/* Status */}
                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium
                      
                      ${product.available
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                        }`}
                    >

                      {
                        product.available
                          ? "Available"
                          : "Unavailable"
                      }

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="p-5">

                    <div className="flex items-center gap-5">

                      {/* Toggle */}
                      <button
                        onClick={() =>
                          handleToggle(
                            product._id
                          )
                        }

                        className={`text-2xl cursor-pointer transition-all duration-300
  
    ${product.available
                            ? "text-green-400"
                            : "text-red-400"
                          }`}
                      >

                        {
                          product.available
                            ? <FaToggleOn />
                            : <FaToggleOff />
                        }

                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/edit-product/${product._id}`
                          )
                        }

                        className="text-blue-400 text-lg cursor-pointer transition-all duration-300"
                      >

                        <FaEdit />

                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }

                        className="text-red-400 text-lg  cursor-pointer transition-all duration-300"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-16 text-gray-400 text-lg"
                >

                  No Products Found

                </td>

              </tr>
            )
          }

        </tbody>

      </table>

    </div>
  );
};

export default ProductTable;