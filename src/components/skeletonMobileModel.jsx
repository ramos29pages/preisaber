import React from 'react';

export function SkeletonModelMobile() {
  return (
    <div className="py-4 px-6 border-b border-gray-200 animate-pulse">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <div className="ml-3">
          <div className="w-3/5 h-4 bg-gray-300 rounded-md"></div>
          <div className="mt-1 w-2/5 h-3 bg-gray-300 rounded-sm"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div>
          <div className="w-1/3 h-3 bg-gray-300 rounded-sm"></div>
        </div>
        <div>
          <div className="w-2/3 h-3 bg-gray-300 rounded-sm"></div>
        </div>

        <div>
          <div className="w-1/3 h-3 bg-gray-300 rounded-sm"></div>
        </div>
        <div>
          <div className="w-1/2 h-3 bg-gray-300 rounded-sm"></div>
        </div>

        <div>
          <div className="w-1/4 h-3 bg-gray-300 rounded-sm"></div>
        </div>
        <div>
          <div className="w-3/4 h-3 bg-gray-300 rounded-sm"></div>
        </div>

        <div className="col-span-2 mt-2">
          <div className="w-1/2 h-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}