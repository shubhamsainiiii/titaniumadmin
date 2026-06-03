/* eslint-disable no-unused-vars */

import React from "react";

const ProductForm = ({
  formData,
  handleChange,
  handleImages,
  handleSubmit,
  loading,
  imagePreview,
}) => {

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111827] border border-white/10 rounded-[32px] p-8 lg:p-10 space-y-8"
    >

      {/* Heading */}
      <div>

        <h2 className="text-3xl font-bold text-white">
          Add New Product
        </h2>

        <p className="text-gray-400 mt-2">
          Fill all product details carefully.
        </p>

      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Product Name */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Brand Name */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Brand Name
          </label>

          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            placeholder="Enter Brand Name"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Colour */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Colour
          </label>

          <input
            type="text"
            name="colour"
            value={formData.colour}
            onChange={handleChange}
            placeholder="Enter Product Colour"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Material */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Material
          </label>

          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="Enter Material"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Special Feature */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Special Feature
          </label>

          <input
            type="text"
            name="specialFeature"
            value={formData.specialFeature}
            onChange={handleChange}
            placeholder="Enter Special Feature"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Product Dimensions */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Product Dimensions
          </label>

          <input
            type="text"
            name="productDimensions"
            value={formData.productDimensions}
            onChange={handleChange}
            placeholder="Example: 40 x 30 x 25 cm"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Closure Type */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Closure Type
          </label>

          <input
            type="text"
            name="closureType"
            value={formData.closureType}
            onChange={handleChange}
            placeholder="Enter Closure Type"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Water Resistance */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Water Resistance Level
          </label>

          <input
            type="text"
            name="waterResistanceLevel"
            value={formData.waterResistanceLevel}
            onChange={handleChange}
            placeholder="Enter Water Resistance"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Price */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Product Price"
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          />

        </div>

        {/* Category */}
        <div>

          <label className="block mb-3 text-sm text-gray-400">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full h-[58px] px-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white focus:border-[#D4AF37]"
          >

            <option value="">
              Select Category
            </option>

            <option value="Home Safes">
              Home Safes
            </option>

            <option value="Office Vaults">
              Office Vaults
            </option>

            <option value="Jewelry Safes">
              Jewelry Safes
            </option>

            <option value="Digital Lockers">
              Digital Lockers
            </option>

            <option value="Fireproof Safes">
              Fireproof Safes
            </option>

          </select>

        </div>

      </div>

      {/* Description */}
      <div>

        <label className="block mb-3 text-sm text-gray-400">
          Description
        </label>

        <textarea
          rows="6"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Product Description"
          className="w-full p-5 rounded-2xl bg-[#0F172A] border border-white/10 outline-none text-white resize-none focus:border-[#D4AF37]"
        ></textarea>

      </div>

      {/* Images */}
      <div>

        <label className="block mb-3 text-sm text-gray-400">
          Product Images
        </label>

        <input
          type="file"
          multiple
          onChange={handleImages}
          className="w-full p-4 rounded-2xl bg-[#0F172A] border border-white/10 text-white"
        />

      </div>

      {/* Image Preview */}
      {
        imagePreview?.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

            {imagePreview.map((image, index) => (

              <div
                key={index}
                className="rounded-2xl overflow-hidden border border-white/10"
              >

                <img
                  src={image}
                  alt="preview"
                  className="w-full h-32 object-cover"
                />

              </div>
            ))}

          </div>
        )
      }

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-[60px] rounded-2xl bg-[#D4AF37] text-[#0F172A] font-bold text-lg hover:opacity-90 transition-all duration-300"
      >

        {
          loading
            ? "Uploading Product..."
            : "Submit Product"
        }

      </button>

    </form>
  );
};

export default ProductForm;