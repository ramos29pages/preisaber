import React from "react";

 const SkeletonFormCard = () => {
  return (
   <div className="animate-pulse bg-white rounded-md mb-4 p-4 shadow-md self-center">
    <div className="flex items-center justify-evenly">
     <div className="h-12 md:h-20 w-12 md:w-20 bg-gray-300 rounded-full"></div>
     <div className="text-sm md:text-md text-slate-500 text-center w-3/4">
      <div className="bg-orange-300 h-6 rounded w-1/2 mx-auto mb-2"></div>
      <div className="bg-gray-300 h-4 rounded mb-1"></div>
      <div className="bg-gray-300 h-4 rounded mb-1 w-1/3 mx-auto"></div>
      <div className="bg-gray-300 h-4 rounded w-1/4"></div>
     </div>
    </div>
   </div>
  );
 };

 export default SkeletonFormCard;