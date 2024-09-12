import React from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { Head, Link } from "@inertiajs/react";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";

export default function Categories({ auth, categories }) {
    const categoryData = categories?.data ?? [];

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Categories" />
            <div className="min-h-screen bg-gray-100 pt-20 pb-1">
                <div className="h-72 w-full bg-lime-700 mt-6 flex items-center justify-center rounded-b-3xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl text-white text-center">
                        Categories
                    </h2>
                </div>
                <CustomerContainer className="mt-32">
                    <h1 className="text-2xl font-medium">
                        Explore Our Categories
                    </h1>
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
                                                className="inline-flex items-center px-4 sm:px-6 py-2 rounded-lg text-white bg-lime-700"
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
