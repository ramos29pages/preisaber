import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function StudentStatsVisualizationSkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl w-full h-dic overflow-hidden border border-gray-200">
      {/* Header Skeleton */}
      <div className="p-5 bg-gradient-to-r from-orange-300 to-orange-400 border-b border-orange-200 animate-pulse">
        <h2 className="font-bold text-white md:text-xl">
          <Skeleton width={200} height={24} />
        </h2>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resumen General Skeleton */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 animate-pulse">
            <h3 className="text-sm font-bold text-gray-600 mb-4">
              <Skeleton width={150} height={20} />
            </h3>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 p-2 md:p-4 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500 text-center mb-1">
                    <Skeleton width={50} />
                  </div>
                  <div className="text-2xl text-center font-extrabold text-gray-800">
                    <Skeleton width={40} />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600 mt-auto flex items-center">
              <Skeleton width={250} height={16} />
            </div>
          </div>

          {/* Bar Chart Skeleton */}
          <div className="h-72 p-2 bg-white rounded-xl border border-gray-100 animate-pulse flex items-center justify-center">
            <Skeleton width="90%" height="80%" />
          </div>
        </div>

        {/* Pie Chart Skeleton */}
        <div className="mt-6 h-80 bg-white rounded-xl p-5 border border-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Skeleton width="70%" height="70%" shape="circular" />
            <div className="mt-4">
              <Skeleton count={2} width={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}