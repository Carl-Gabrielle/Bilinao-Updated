import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductRatingsReviews = ({ reviews = [] }) => {
    // Make sure reviews is always an array
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
        return (
            <div className="text-center text-slate-800">
                <h2>No reviews yet for this product.</h2>
            </div>
        );
    }

    const totalRatings = reviews.reduce((acc, review) => acc + review.rate, 0);
    const averageRating = totalRatings / totalReviews;

    return (
        <div className="h-full">
            <h1 className="mt-16 mb-6 text-2xl font-medium leading-relaxed tracking-wider uppercase text-slate-900">
                Product Ratings & Reviews
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Customer Reviews Section */}
                <div className="col-span-1 pr-4 border-0 sm:border-r border-slate-400 ">
                    <h1 className="text-xl font-semibold text-slate-900">
                        Customer Reviews
                    </h1>
                    <div className="flex items-center mt-5 space-x-3">
                        <div className="flex items-center space-x-1 text-lg text-yellow-500">
                            {[...Array(Math.floor(averageRating))].map((_, idx) => (
                                <FaStar key={idx} />
                            ))}
                            {averageRating % 1 >= 0.5 && <FaStarHalfAlt />}
                            {[...Array(5 - Math.ceil(averageRating))].map((_, idx) => (
                                <FaRegStar key={idx} />
                            ))}
                        </div>
                        <span className="text-sm text-slate-800">
                            {averageRating.toFixed(1)} out of 5
                        </span>
                    </div>
                </div>
                {/* Star Rating Distribution */}
                <div className="flex flex-col justify-center col-span-2">
                    {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={index} className="flex items-center justify-between my-1 space-x-2">
                            <span className="flex items-center text-sm text-slate-800">
                                <span className="mr-2">{star}</span> star
                            </span>
                            <div className="w-full h-3 rounded-full bg-slate-200">
                                <div
                                    className="h-3 bg-yellow-500 rounded-full"
                                    style={{
                                        width: `${(reviews.filter((review) => review.rate === star).length / totalReviews) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm text-slate-800">
                                {((reviews.filter((review) => review.rate === star).length / totalReviews) * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <h1 className="mt-10 mb-6 text-2xl font-medium leading-relaxed tracking-wider uppercase text-slate-900">
                Customer Says
            </h1>
            {reviews.map((review, index) => (
                <div key={index} className="px-4 py-4 mt-4 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Customer Profile */}
                            <img
                                src={review.userProfileImage || "/path/to/default/image.jpg"}
                                alt="CustomerProfile"
                                className="object-cover border-2 rounded-full size-12 border-slate-700 border-opacity-30 backdrop-blur-md"
                            />
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-slate-800">{review.userName}</span>
                                <span className="w-32 px-2 py-1 text-xs font-medium rounded-md bg-slate-600 bg-opacity-30 backdrop-blur-md text-slate-800">
                                    Verified Purchase
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-slate-800">{review.date}</span>
                            <div className="flex items-center mt-2 space-x-1 text-xs text-yellow-500">
                                {[...Array(Math.floor(review.rate))].map((_, idx) => (
                                    <FaStar key={idx} />
                                ))}
                                {review.rate % 1 >= 0.5 && <FaStarHalfAlt />}
                                {[...Array(5 - Math.ceil(review.rate))].map((_, idx) => (
                                    <FaRegStar key={idx} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 px-14">
                        <h1 className="text-sm text-slate-800">{review.description}</h1>
                    </div>
                    <hr className="mt-2 border-slate-300" />
                </div>
            ))}
        </div>
    );
};

export default ProductRatingsReviews;
