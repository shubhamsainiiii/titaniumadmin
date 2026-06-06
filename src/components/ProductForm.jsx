/* eslint-disable no-unused-vars */

import React, { useRef } from "react";

const inputClass =
  "w-full h-[52px] px-[18px] rounded-xl bg-[#080d1a] border border-[#1a2540] text-slate-200 text-sm placeholder:text-[#3d4f6e] transition-all duration-200 focus:outline-none focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/10";

const labelClass =
  "block mb-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[#4a6080]";

const sectionTitleClass =
  "mb-5 text-[11px] font-medium tracking-[0.12em] uppercase text-[#2d3f5c]";

const SectionDivider = () => (
  <hr className="border-none border-t border-[#111d33]" />
);

const ProductForm = ({
  formData,
  handleChange,
  handleImages,       // (e) => void — called when new files selected
  handleRemoveImage,  // (index) => void — remove image at index from both preview + files
  handleSubmit,
  loading,
  imagePreview,       // string[] — base64 / blob URLs
}) => {
  console.log("handleRemoveImage:", handleRemoveImage);
  const fileInputRef = useRef(null);
  const isEditing = Boolean(formData?.id || formData?._id);

  // Internal remove: clear file input so same file can be re-added,
  // then delegate actual state removal to parent
  const onRemove = (index) => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    handleRemoveImage(index);
  };

  return (
    <div className="min-h-screen bg-[#070c18] flex items-start justify-center">
      <div className="w-full max-w-5xl">

        <div className="bg-[#0d1526] border border-[#1a2540] rounded-3xl overflow-hidden">

          {/* ── Header ── */}
          <div className="px-9 pt-9 pb-7 border-b border-[#111d33] flex items-start justify-between">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/20 mb-3">
                {isEditing ? "Editing" : "New Entry"}
              </span>
              <h2 className="text-2xl font-semibold text-slate-100 tracking-tight m-0">
                {isEditing ? "Update Product" : "Add New Product"}
              </h2>
              <p className="mt-1.5 text-[13px] text-[#3d5070]">
                {isEditing
                  ? "Make changes and save to update the product."
                  : "Fill all product details carefully before submitting."}
              </p>
            </div>
            <div className="w-12 h-12 flex-shrink-0 bg-[#c9a227]/[0.08] border border-[#c9a227]/15 rounded-xl flex items-center justify-center">
              {isEditing ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </div>
          </div>

          {/* ── Form Body ── */}
          <form onSubmit={handleSubmit} className="px-9 py-8 flex flex-col gap-3">

            {/* 01 — Product Identity */}
            <div>
              <p className={sectionTitleClass}>01 — Product Identity</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Titan Vault Pro" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Brand Name</label>
                  <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} placeholder="e.g. SecureX" className={inputClass} />
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* 02 — Physical Properties */}
            <div>
              <p className={sectionTitleClass}>02 — Physical Properties</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Colour</label>
                  <input type="text" name="colour" value={formData.colour} onChange={handleChange} placeholder="e.g. Matte Black" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Material</label>
                  <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="e.g. Steel Alloy" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Special Feature</label>
                  <input type="text" name="specialFeature" value={formData.specialFeature} onChange={handleChange} placeholder="e.g. Biometric Lock" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Dimensions</label>
                  <input type="text" name="productDimensions" value={formData.productDimensions} onChange={handleChange} placeholder="40 × 30 × 25 cm" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Closure Type</label>
                  <input type="text" name="closureType" value={formData.closureType} onChange={handleChange} placeholder="e.g. Electronic" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Water Resistance</label>
                  <input type="text" name="waterResistanceLevel" value={formData.waterResistanceLevel} onChange={handleChange} placeholder="e.g. IP67" className={inputClass} />
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* 03 — Pricing & Category */}
            <div>
              <p className={sectionTitleClass}>03 — Pricing & Category</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none bg-[image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%234a6080' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_18px_center]`}
                  >
                    <option value="">Select category</option>
                    <option value="Home Safes">Home Safes</option>
                    <option value="Office Vaults">Office Vaults</option>
                    <option value="Jewelry Safes">Jewelry Safes</option>
                    <option value="Digital Lockers">Digital Lockers</option>
                    <option value="Fireproof Safes">Fireproof Safes</option>
                  </select>
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* 04 — Description */}
            <div>
              <p className={sectionTitleClass}>04 — Description</p>
              <label className={labelClass}>Product Description</label>
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product — key features, use cases, build quality..."
                className="w-full px-[18px] py-4 rounded-xl bg-[#080d1a] border border-[#1a2540] text-slate-200 text-sm placeholder:text-[#3d4f6e] leading-relaxed resize-none transition-all duration-200 focus:outline-none focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/10"
              />
            </div>

            <SectionDivider />

            {/* 05 — Images */}
            <div>
              <p className={sectionTitleClass}>05 — Product Images</p>
              <label className={labelClass}>Upload Images</label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="w-full px-[18px] py-3.5 rounded-xl bg-[#080d1a] border border-dashed border-[#1e2d47] text-[#4a6080] text-sm cursor-pointer transition-all duration-200 hover:border-[#c9a227] hover:text-[#c9a227] file:bg-[#1e2a45] file:text-[#94a3b8] file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-[13px] file:mr-3 file:cursor-pointer hover:file:bg-[#253352]"
              />

              {/* Image Preview Grid */}
              {imagePreview?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {imagePreview.map((src, index) => (
                    <div
                      key={src}
                      className="relative group rounded-xl overflow-hidden border border-[#1a2540] bg-[#080d1a] h-40"
                    >
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                      <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-[#0a0f1e] border border-[#2a3a5c] text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500/25 hover:border-red-500/50 hover:text-red-400"
                      >
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <path d="M1 1l8 8M9 1L1 9" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-14 rounded-[14px] bg-[#c9a227] text-[#050b16] text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  {isEditing ? "Updating Product…" : "Uploading Product…"}
                </span>
              ) : (
                isEditing ? "Update Product" : "Submit Product"
              )}
            </button>

          </form>
        </div>

        <p className="text-center mt-5 text-xs text-[#1e2d47]">
          All fields are required before submission.
        </p>

      </div>
    </div>
  );
};

export default ProductForm;