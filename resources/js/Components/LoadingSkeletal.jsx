// LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-20 px-4">
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                {/* Skeleton for an image */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-48 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>

                {/* Repeating skeleton for additional cards */}
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex flex-col items-center space-y-4">
                        <div className="h-48 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSpinner;
