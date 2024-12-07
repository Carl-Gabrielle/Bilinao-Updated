import React, { useState } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Head, useForm, Link } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";

export default function Review({ auth, orderItem, success, error }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        product_id: orderItem.product.id,
        order_id: orderItem.id,
        rate: 0,
        description: "",
    });

    const [hover, setHover] = useState(0);

    const handleRating = (currentRating) => {
        setData("rate", currentRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("customer.storeReview.store"));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const imagePath = orderItem.product.images[0]?.image_path;
    const imageUrl = imagePath ? `/storage/${imagePath}` : "/path/to/default-image.jpg";

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Product Review" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="Product Review" />
                <CustomerContainer>
                    <Link href={route("customer.orders")} className="w-1/2">
                        <button className="px-4 py-2 mb-6 text-sm font-semibold rounded-full shadow-lg text-slate-800 bg-slate-100">
                            <MdOutlineKeyboardArrowLeft className="inline-block " />
                            Go back
                        </button>
                    </Link>
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <hr className="flex-grow border border-slate-800" />
                            <h1 className="font-bold text-2xl text-slate-800 uppercase tracking-widest">
                                Review Your Experience
                            </h1>
                            <hr className="flex-grow border border-slate-800" />
                        </div>
                        <div className="p-6 shadow-lg rounded-2xl bg-slate-50 bg-opacity-60 backdrop-blur-lg">
                            {success && <div className="mb-4 text-green-500">{success}</div>}
                            {error && <div className="mb-4 text-red-500">{error}</div>}

                            <div className="flex items-center mb-4 space-x-4">
                                <img
                                    src={imageUrl}
                                    alt={orderItem.product.name}
                                    className="object-cover rounded-md w-24 h-24 border-2 border-slate-500"
                                />
                                <span className="font-semibold text-md text-primary">
                                    {orderItem.product.name}
                                </span>
                            </div>
                            {/* Star Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                                {Array(5).fill(0).map((_, index) => {
                                    const currentRating = index + 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            size={30}
                                            className={`cursor-pointer ${currentRating <= (hover || data.rate)
                                                ? "text-yellow-400 transition duration-100 ease-in-out"
                                                : "text-gray-400"
                                                }`}
                                            onClick={() => handleRating(currentRating)}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(data.rate)}
                                        />
                                    );
                                })}
                            </div>
                            <textarea
                                className="mb-4 focus:outline-none focus:ring-0 border focus:border-slate-600 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                placeholder="Share your experience with this product..."
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <span className="mb-4 text-sm font-medium text-slate-500">0/200</span>
                            {errors.description && (
                                <div className="text-red-500 text-sm mb-4">{errors.description}</div>
                            )}
                            {errors.rate && (
                                <div className="text-red-500 text-sm mb-4">{errors.rate}</div>
                            )}
                            <button
                                className="w-full bg-slate-800 text-white py-2 rounded-2xl font-semibold mt-4"
                                onClick={handleSubmit}
                                disabled={processing}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
