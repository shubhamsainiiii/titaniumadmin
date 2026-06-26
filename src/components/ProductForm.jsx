/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";

const inputClass =
  "w-full h-[48px] px-4 rounded-xl bg-[#f8f6f0] border border-[#e8e2d6] text-[#0f1623] text-sm placeholder:text-[#b8b0a0] transition-all duration-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10";

const labelClass =
  "block mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9ca3af]";

const sectionTitleClass =
  "mb-4 text-[11px] font-bold tracking-[0.12em] uppercase text-[#B8941F] flex items-center gap-2";

const SectionDivider = () => (
  <div className="h-px bg-[#f0ebe2]" />
);

const ProductForm = ({
  formData,
  handleChange,
  handleImages,
  handleRemoveImage,
  handleSubmit,
  loading,
  imagePreview,
  reorderImages,

}) => {
  const fileInputRef = useRef(null);
  const isEditing = Boolean(formData?.id || formData?._id);

  const onRemove = (index) => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    handleRemoveImage(index);
  };

  // Description ko submit se pehle normalize karo — comma/newline se split, trim, \n se join
  const onSubmit = (e) => {
    e.preventDefault();

    const normalizedDescription = formData.description
      ? formData.description
        .split(/,|\n/)
        .map((f) => f.trim())
        .filter(Boolean)
        .join("\n")
      : "";

    // formData mein normalized description inject karke parent handleSubmit call karo
    const normalizedEvent = {
      ...e,
      preventDefault: () => { },
      _normalizedDescription: normalizedDescription,
    };

    // formData ko mutate karo temporarily — parent handleSubmit formData se padhta hai
    const originalDesc = formData.description;
    formData.description = normalizedDescription;
    handleSubmit(normalizedEvent);
    formData.description = originalDesc;
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex items-start justify-center py-8">
      <div className="w-full max-w-5xl px-4">

        <div className="bg-white border border-[#e8e2d6] rounded-3xl overflow-hidden shadow-xl shadow-[#D4AF37]/5">

          {/* Header */}
          <div className="px-9 pt-8 pb-6 border-b border-[#f0ebe2] flex items-start justify-between">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#D4AF37]/10 text-[#B8941F] border border-[#D4AF37]/20 mb-3">
                {isEditing ? "Editing Product" : "New Entry"}
              </span>
              <h2 className="text-2xl font-bold text-[#0f1623] tracking-tight">
                {isEditing ? "Update Product" : "Add New Product"}
              </h2>
              <p className="mt-1.5 text-sm text-[#9ca3af]">
                {isEditing
                  ? "Make changes and save to update the product."
                  : "Fill all product details carefully before submitting."}
              </p>
            </div>
            <div className="w-12 h-12 flex-shrink-0 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center">
              {isEditing ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8941F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8941F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={onSubmit} className="px-9 py-8 flex flex-col gap-6">

            {/* 01 — Product Identity */}
            <div>
              <p className={sectionTitleClass}>
                <span className="w-5 h-[2px] bg-[#D4AF37] rounded-full" />
                01 — Product Identity
              </p>
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
              <p className={sectionTitleClass}>
                <span className="w-5 h-[2px] bg-[#D4AF37] rounded-full" />
                02 — Physical Properties
              </p>
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
                  <input type="text" name="specialFeature" value={formData.specialFeature} onChange={handleChange} placeholder="e.g. Biometric Lock, Fire Resistant" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Dimensions</label>
                  <input type="text" name="productDimensions" value={formData.productDimensions} onChange={handleChange} placeholder="40 × 30 × 25 cm" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Lock System</label>
                  <input type="text" name="closureType" value={formData.closureType} onChange={handleChange} placeholder="e.g. Electronic" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Storage</label>
                  <input type="text" name="waterResistanceLevel" value={formData.waterResistanceLevel} onChange={handleChange} placeholder="e.g. 5 Ltr" className={inputClass} />
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* 03 — Pricing & Category */}
            <div>
              <p className={sectionTitleClass}>
                <span className="w-5 h-[2px] bg-[#D4AF37] rounded-full" />
                03 — Pricing & Category
              </p>
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
                    className={`${inputClass} appearance-none cursor-pointer bg-[image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_16px_center]`}
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

            {/* 04 — Purchase Links */}
            <div>
              <p className={sectionTitleClass}>
                <span className="w-5 h-[2px] bg-[#D4AF37] rounded-full" />
                04 — Purchase Links
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Amazon Product Link</label>

                  <input
                    type="url"
                    name="amazonLink"
                    value={formData.amazonLink || ""}
                    onChange={handleChange}
                    placeholder="https://www.amazon.in/..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Flipkart Product Link</label>

                  <input
                    type="url"
                    name="flipkartLink"
                    value={formData.flipkartLink || ""}
                    onChange={handleChange}
                    placeholder="https://www.flipkart.com/..."
                    className={inputClass}
                  />
                </div>
              </div>

              <p className="mt-2 text-[11px] text-[#9ca3af]">
                Optional: Agar product Amazon ya Flipkart par available hai to uska link yahan add karein.
              </p>
            </div>

            {/* 05 — Description */}
            <div>
              <p className={sectionTitleClass}>
                <span className="w-5 h-[2px] bg-[#D4AF37] rounded-full" />
                05 — Description
              </p>
              <label className={labelClass}>Product Description</label>
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product — key features, use cases, build quality..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#f8f6f0] border border-[#e8e2d6] text-[#0f1623] text-sm placeholder:text-[#b8b0a0] leading-relaxed resize-none transition-all duration-200 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10"
              />
              <p className="mt-1.5 text-[11px] text-[#b8b0a0]">
                Tip: Comma ya new line se alag features likho — automatically bullet points mein save honge.
              </p>
            </div>

            <SectionDivider />

            {/* 06 — Images */}
            <div>
              <p className={sectionTitleClass}>
                <span className="w-5 h-[2px] bg-[#D4AF37] rounded-full" />
                06 — Product Images
              </p>
              <label className={labelClass}>Upload Images</label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="w-full px-4 py-3.5 rounded-xl bg-[#f8f6f0] border border-dashed border-[#d1c9b8] text-[#9ca3af] text-sm cursor-pointer transition-all duration-200 hover:border-[#D4AF37] hover:text-[#B8941F] file:bg-[#D4AF37]/10 file:text-[#B8941F] file:border-0 file:rounded-lg file:px-4 file:py-1.5 file:text-[12px] file:font-semibold file:mr-3 file:cursor-pointer hover:file:bg-[#D4AF37]/20"
              />

              {/* Image Preview */}
              {imagePreview?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {imagePreview.map((src, index) => (
                    <div
                      key={src}
                      className={`relative group rounded-xl overflow-hidden bg-[#f8f6f0] h-36 border-2 ${index === 0
                        ? "border-[#D4AF37]"
                        : "border-[#e8e2d6]"
                        }`}
                    >
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />

                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-[#D4AF37] text-[#0f1623] text-[10px] font-bold px-2 py-1 rounded-full">
                          COVER
                        </div>
                      )}

                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => reorderImages(index)}
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg text-[10px] font-semibold border border-[#e8e2d6] opacity-0 group-hover:opacity-100 transition-all"
                        >
                          Set Cover
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#e8e2d6] text-[#9ca3af] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:border-red-200 hover:text-red-500 shadow-sm"
                      >
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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
              className="w-full h-14 rounded-2xl bg-[#D4AF37] text-[#0f1623] text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:brightness-105 hover:shadow-lg hover:shadow-[#D4AF37]/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  {isEditing ? "Updating Product…" : "Uploading Product…"}
                </>
              ) : (
                isEditing ? "Update Product" : "Submit Product"
              )}
            </button>

          </form>
        </div>

        <p className="text-center mt-5 text-xs text-[#c8c0b0]">
          All fields are required before submission.
        </p>

      </div>
    </div>
  );
};

export default ProductForm;
