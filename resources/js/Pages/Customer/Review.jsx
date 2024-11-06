import React, { useState } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaStar } from "react-icons/fa";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";
export default function Review({ auth, products }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = () => {
        // Submit review logic here
        console.log({ rating, review });
    };

    return (
        <>
            <CustomerLayout user={auth.user}>
                <Head title="Product Review" />
                <div className="min-h-screen pt-20 pb-1">
                    <Banner title="Product Review" />
                    <CustomerContainer>
                        <div className="max-w-2xl mx-auto px-4">
                            <div className="flex items-center space-x-3 mb-6">
                                <hr className="flex-grow border border-slate-800" />
                                <h1 className="font-bold text-2xl text-slate-800 uppercase tracking-widest">
                                    Review Your Experience
                                </h1>
                                <hr className="flex-grow border border-slate-800" />
                            </div>
                            <div className="p-6 shadow-lg rounded-2xl bg-slate-50 bg-opacity-60 backdrop-blur-lg">
                                <div className="flex items-center mb-4">
                                    <img
                                        src="path-to-product-image"
                                        alt="Product Image"
                                        className="w-20 h-20 border mr-4"
                                    />
                                    <span className="font-semibold text-md text-slate-800">
                                        Product Name
                                    </span>
                                </div>
                                {/* Star Rating */}
                                <div className="flex items-center space-x-2 mb-4">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, index) => {
                                            const currentRating = index + 1;
                                            return (
                                                <FaStar
                                                    key={index}
                                                    size={30}
                                                    className={`cursor-pointer ${currentRating <=
                                                        (hover || rating)
                                                        ? "text-yellow-400 transition duration-100 ease-in-out"
                                                        : "text-gray-400"
                                                        }`}
                                                    onClick={() =>
                                                        setRating(currentRating)
                                                    }
                                                    onMouseEnter={() =>
                                                        setHover(currentRating)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHover(rating)
                                                    }
                                                />
                                            );
                                        })}
                                </div>

                                {/* Review Text Area */}
                                <textarea
                                    className="mb-4 focus:outline-none focus:ring-0 border focus:border-slate-600 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                    placeholder="Share your experience with this product..."
                                    rows={5}
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                {/* Submit Button */}
                                <button
                                    className="w-full bg-slate-800 text-white py-2 rounded-2xl font-semibold "
                                    onClick={handleSubmit}
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </CustomerContainer>
                </div>
            </CustomerLayout>
        </>
    );
}
