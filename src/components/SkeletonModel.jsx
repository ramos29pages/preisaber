// src/components/SkeletonUser.jsx
import React from "react";

export const SkeletonModel = () => (
  <div className="flex items-center justify-between p-4 animate-pulse">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
      <div className=" h-8 bg-gray-200 rounded w-48"></div>
    </div>

    <div className="flex space-x-2">
      <div className=" h-8 bg-gray-200 rounded w-48"></div>
    </div>

    <div className="flex space-x-2">
      <div className=" h-8 bg-gray-200 rounded w-48"></div>
    </div>

    <div className="flex space-x-2">
      <div className=" h-8 bg-gray-200 rounded w-48"></div>
    </div>
  </div>
);
