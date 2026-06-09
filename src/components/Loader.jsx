// /* eslint-disable no-unused-vars */

// import React from "react";

// const Loader = () => {

//   return (
//     <div className="flex items-center justify-center py-16">

//       <div className="w-10 h-10 border-[3px] border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>

//     </div>
//   );
// };

// export default Loader;

/* eslint-disable no-unused-vars */
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">

      {/* Spinner rings */}
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#e8e2d6]" />
        {/* Spin ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#D4AF37] animate-spin" />
        {/* Inner dot */}
        <div className="absolute inset-[14px] rounded-full bg-[#D4AF37]/20" />
      </div>

      {/* Label */}
      <p className="text-[#c8c0b0] text-xs font-semibold uppercase tracking-widest animate-pulse">
        Loading...
      </p>

    </div>
  );
};

export default Loader;