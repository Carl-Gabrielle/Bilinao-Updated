import React, { useState, useEffect } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { Head, Link } from "@inertiajs/react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import { GiMagnifyingGlass } from "react-icons/gi";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";

export default function Categories({ auth, categories }) {
    const categoryData = categories?.data ?? [];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <CustomerLayout user={auth.user}>
                <Head title="Categories" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Categories" />
            <div className="min-h-screen  pt-20 pb-1  ">
                <Banner title="Categories" />
                <CustomerContainer className="mt-32">
                    <div className="flex items-center space-x-3">
                        <hr className="w-28 border  border-slate-500 mb-6" />
                        <div className="flex items-center space-x-2">
                            <GiMagnifyingGlass className="mb-6 text-2xl text-slate-600" />
                            <h1 className=" font-bold text text-2xl mb-6 uppercase tracking-widest">
                                Discover Curated Collections for You
                            </h1>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                        {categoryData.length > 0 ? (
                            categoryData.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="category-card relative border border-gray-400 rounded-3xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-md w-full h-80 sm:h-80 md:h-96 xl:h-64 overflow-hidden transition-transform transform-gpu hover:scale-105 duration-700"
                                >
                                    <div className="absolute inset-0 flex flex-col lg:flex-row items-center lg:justify-start">
                                        {cat.image_path && (
                                            <img
                                                className="w-full h-48 sm:h-60 lg:w-32 lg:h-32 xl:w-48 xl:h-full object-cover mb-4 lg:mb-0"
                                                src={cat.image_path}
                                                alt={cat.name}
                                            />
                                        )}
                                        <div className="flex flex-col justify-between items-center lg:items-start w-full lg:w-auto lg:ml-6 lg:h-36">
                                            <p className="text-slate-900 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl mb-4 lg:mb-0">
                                                {cat.name}
                                            </p>
                                            <Link
                                                href={`/category/${cat.id}/products`}
                                                className="inline-flex items-center px-4 sm:px-6 py-2 rounded-2xl text-white bg-slate-800"
                                            >
                                                <span className="mr-2">
                                                    View Products
                                                </span>
                                                <PiArrowRightBold />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600 col-span-full">
                                No categories available
                            </p>
                        )}
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
