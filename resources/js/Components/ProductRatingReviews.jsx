import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const ProductRatingReviews = ({ reviews, averageRating }) => {
    return (
        <div className="h-full">
            <h1 className="mt-16 mb-6 text-2xl font-medium leading-relaxed tracking-wider uppercase text-slate-900">
                Product Ratings & Reviews
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 pr-4 border-0 sm:border-r border-slate-400 ">
                    <h1 className="text-xl font-semibold text-slate-900">
                        Customer Reviews
                    </h1>
                    <div className="flex items-center mt-5 space-x-3">
                        <div className="flex items-center space-x-1 text-lg text-yellow-500">
                            {Array.from({ length: 5 }, (_, index) => (
                                <FaStar
                                    key={index}
                                    className={index < averageRating ? 'text-yellow-500' : 'text-slate-300'}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-slate-800">{averageRating} out of 5</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center col-span-2">
                    {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={index} className="flex items-center justify-between my-1 space-x-2">
                            <span className="flex items-center text-sm text-slate-800">
                                <span className="mr-2">{star} star</span>
                            </span>
                            <div className="w-full h-3 rounded-full bg-slate-200">
                                <div
                                    className="h-3 bg-yellow-500 rounded-full"
                                    style={{
                                        width: `${(5 - star + 1) * 20}%`,
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm text-slate-800">
                                {(5 - star + 1) * 20}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <h1 className="mt-10 mb-6 text-2xl font-medium leading-relaxed tracking-wider uppercase text-slate-900">
                Customer Says
            </h1>
            <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-800">
                <div>
                    <span>Showing 1-5 of {reviews.length} results</span>
                </div>
                <div className="flex items-center space-x-3">
                    <span>Sort By: </span>
                    <span className="flex items-center px-3 py-1 transition-colors duration-300 ease-in-out border rounded-full cursor-pointer border-slate-500">
                        Recent Reviews <MdOutlineKeyboardArrowDown className="ml-2" />
                    </span>
                </div>
            </div>
            {/* Display Reviews */}
            <div>
                {reviews.map((review) => (
                    <div key={review.id} className="px-4 py-4 mt-4 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {/* Customer Profile */}
                                {review.user.profile_image ? (
                                    <img
                                        src={review.user.profile_image}
                                        alt="Customer Profile"
                                        className="object-cover border-2 rounded-full size-12 border-slate-700 border-opacity-30 backdrop-blur-md"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-12 h-12 bg-slate-600 bg-opacity-30 backdrop-blur-md  text-primary rounded-full text-lg border-slate-500 border-2 ">
                                        {review.user.name
                                            .split(' ')
                                            .map((name) => name.charAt(0))
                                            .slice(0, 2)
                                            .join('')}
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-slate-800">
                                        {review.user.name}
                                    </span>
                                    <span className="w-32 px-2 py-1 text-xs font-medium rounded-md bg-slate-600 bg-opacity-30 backdrop-blur-md text-primary">
                                        Verified Purchase
                                    </span>
                                </div>
                            </div>
                            {/* Date and Ratings */}
                            <div>
                                <span className="text-xs text-slate-800">
                                    {new Date(review.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                                <div className="flex items-center mt-2 space-x-1 text-xs text-yellow-500">
                                    {Array.from({ length: review.rate }, (_, index) => (
                                        <FaStar key={index} />
                                    ))}
                                    {review.rate % 1 !== 0 && <FaStarHalfAlt />}
                                    {Array.from({ length: 5 - Math.ceil(review.rate) }, (_, index) => (
                                        <FaRegStar key={index} />
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
        </div>
    );
};

export default ProductRatingReviews;
