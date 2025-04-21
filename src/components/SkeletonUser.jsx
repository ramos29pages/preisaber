// src/components/SkeletonUser.jsx
import React from "react";

export const SkeletonUser = () => (
  <div className="flex items-center justify-between p-4 animate-pulse">
    <div className="flex items-center">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>

      {/* Text placeholders */}
      <div className="flex flex-col space-y-2">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
        <div className="h-3 bg-gray-200 rounded w-48"></div>
      </div>
    </div>

    {/* Botones placeholder */}
    <div className="flex space-x-2">
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);
