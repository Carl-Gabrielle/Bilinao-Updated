import React from "react";
import { PiArrowRightBold } from "react-icons/pi";
import BgImage from "./Illustrations/bg_frame.png";
import { Head, Link } from "@inertiajs/react";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Footer from "@/Components/Footer";
import CustomerContainer from "@/Components/CustomerContainer";
export default function CustomerDashboard({ auth, category }) {
    const categoryData = category?.data ?? [];
    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-50">
                <Head title="Home" />
                <main>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="min-h-[650px] pt-24 relative sm:min-h-[630px] flex justify-center items-center">
                            <div className="px-8">
                                <div className="flex flex-col justify-center gap-4 text-center sm:text-left px-6 py-6 rounded-3xl w-full order-2 sm:order-1">
                                    <p className="animated-text sm:w-2/3 w-full text-4xl tracking-wide text-slate-900 sm:text-6xl lg:text-7xl font-extrabold">
                                        Embrace Local Artistry
                                    </p>
                                    <p className="title sm:w-2/3 w-full text-2xl tracking-tight bg-clip-text text-transparent sm:text-3xl lg:text-5xl bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Discover Unique, Handcrafted Treasures
                                    </p>
                                    <p className="subtitle text-base text-slate-900 font-normal sm:w-1/2 w-full">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Qui veniam, itaque
                                        commodi reiciendis laborum dolor
                                        dignissimos sunt voluptatum error
                                        repellat!
                                    </p>
                                    <Link href="#">
                                        <button className="shop-button sm:self-start self-center px-8 py-3 rounded-md text-white font-semibold flex items-center bg-lime-700">
                                            Shop Now{" "}
                                            <HiMiniArrowLongRight className="ml-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <p className="-mb-20 sm:-mb-11 text-2xl text-center md:text-3xl lg:text-5xl uppercase font-extrabold text-slate-800">
                            Shop our{" "}
                            <span className="bg-yellow-200 px-4 rounded-tr-3xl rounded-bl-3xl">
                                Categories
                            </span>
                        </p>
                        <div className="w-full h-full rounded-t-3xl bg-white mt-4">
                            <div
                                className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 pt-20 py-12 mb-10"
                                style={{
                                    backgroundImage: `url(${BgImage})`,
                                    backgroundSize: "75%",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            >
                                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                                    {categoryData.length > 0 ? (
                                        categoryData.map((cat) => (
                                            <div
                                                key={cat.id}
                                                className="category-card relative  border  border-gray-400 rounded-3xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-md w-full h-80 sm:h-80 md:h-96 xl:h-64 overflow-hidden transition-transform transform-gpu hover:scale-105 duration-700"
                                            >
                                                <div className="absolute inset-0 flex flex-col lg:flex-row items-center lg:justify-start  ">
                                                    {cat.image_path && (
                                                        <img
                                                            className="w-full h-48 sm:h-60 lg:w-32 lg:h-32 xl:w-48 xl:h-full object-cover   mb-4 lg:mb-0"
                                                            src={cat.image_path}
                                                            alt={cat.name}
                                                        />
                                                    )}
                                                    <div className="flex flex-col justify-between items-center   lg:items-start w-full lg:w-auto lg:ml-6 lg:h-36">
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
                            </div>
                        </div>
                        <div className="h-screen py-12 px-12">
                            <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide ">
                                New Products
                            </h1>
                        </div>
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
}
