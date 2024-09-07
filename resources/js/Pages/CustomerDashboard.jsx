import React from 'react';
import { Head, Link } from "@inertiajs/react";
import { HiMiniArrowLongRight } from 'react-icons/hi2';
import CustomerLayout from '@/Layouts/CustomerLayout';

export default function CustomerDashboard({ auth, category }) {
    const categoryData = category?.data ?? [];
    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100">
                <Head title="Customer Dashboard" />
                <main>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="min-h-[650px] pt-24 relative sm:min-h-[630px] flex justify-center items-center">
                            <div className="px-8">
                                <div className="flex flex-col justify-center gap-4 text-center sm:text-left px-6 py-6 rounded-3xl w-full order-2 sm:order-1">
                                    <p className="animated-text sm:w-2/3 w-full text-4xl tracking-wide text-gray-800 sm:text-6xl lg:text-7xl font-extrabold">
                                        Embrace Local Artistry
                                    </p>
                                    <p className="title sm:w-2/3 w-full text-2xl tracking-tight bg-clip-text text-transparent sm:text-3xl lg:text-5xl bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Discover Unique, Handcrafted Treasures
                                    </p>
                                    <p className="subtitle text-base text-gray-800 font-normal sm:w-1/2 w-full">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui veniam, itaque commodi reiciendis laborum dolor dignissimos sunt voluptatum error repellat!
                                    </p>
                                    <Link href="#">
                                        <button className="shop-button sm:self-start self-center px-8 py-3 rounded-md text-white font-semibold flex items-center bg-lime-700">
                                            Shop Now <HiMiniArrowLongRight className="ml-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="py-12 px-12">
                            <h2 className="text-3xl font-bold text-center mb-8">Shop Our Categories</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {categoryData && categoryData.length > 0 ? (
                            categoryData.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.id}/products`}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                                >
                                    {cat.image_path && (
                                        <img
                                            src={cat.image_path}
                                            alt={cat.name}
                                            className="w-full h-64 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800">{cat.name}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No categories available</p>
                        )}
                    </div>
                        </div>
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
}
