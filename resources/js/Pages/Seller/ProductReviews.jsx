import SellerLayout from "@/Layouts/SellerLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaPesoSign } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";
import { animateText } from '@/gsap';


const ProductReviews = ({ reviews, auth }) => {
    const { user } = auth;
    const { data, totalContribution } = usePage().props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            animateText();
        }
    }, [loading]);
    return (
        <SellerLayout user={user}>
            <Head title="Sales Report" />
            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border border-gray-200">Rating</th>
                                <th className="px-4 py-2 border border-gray-200">Review</th>
                                <th className="px-4 py-2 border border-gray-200">Sentiment</th>
                                <th className="px-4 py-2 border border-gray-200">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-4 py-2 border border-gray-200">{review.rate}</td>
                                    <td className="px-4 py-2 border border-gray-200">{review.description}</td>
                                    <td
                                        className={`px-4 py-2 border border-gray-200 ${review.sentiment === 'Positive'
                                            ? 'text-green-600'
                                            : review.sentiment === 'Negative'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                            }`}
                                    >
                                        {review.sentiment}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-200">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No reviews available for this product.</p>
                )}
            </div>
        </SellerLayout>
    );
};

export default ProductReviews;
