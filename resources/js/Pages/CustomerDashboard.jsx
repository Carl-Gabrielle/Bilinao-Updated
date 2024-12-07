import { PiArrowRightBold } from "react-icons/pi";
import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import BgImage from "./Illustrations/bg_frame.png";
import { Head, Link } from "@inertiajs/react";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import CustomerLayout from "@/Layouts/CustomerLayout";
import ScrollTrigger from 'gsap/ScrollTrigger';
import Footer from "@/Components/Footer";
import { animateText } from '@/gsap';
import CustomerContainer from "@/Components/CustomerContainer";
export default function CustomerDashboard({ auth, category, products }) {
    const categoryData = category?.data ?? [];
    const productData = products?.data ?? [];
    const textRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
            animateText();
        }
    }, [loading]);

    if (loading) {
        return (
            <CustomerLayout user={auth.user}>
                <Head title="Home" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen  ">
                <Head title="Home" />
                <main>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="min-h-[650px] pt-24 relative sm:min-h-[630px] flex justify-center items-center ">
                            <div className="px-8">
                                <div className="flex flex-col justify-center gap-3 text-center sm:text-left px-6 py-4 rounded-3xl w-full order-2 sm:order-1">
                                    <p
                                        ref={textRef}
                                        className="animated-text   sm:w-2/3 w-full text-4xl tracking-wide text-slate-900 sm:text-6xl lg:text-7xl font-extrabold"
                                    >
                                        Embrace Local Artistry
                                    </p>
                                    <p className="title sm:w-2/3 w-full text-2xl tracking-wide bg-clip-text text-transparent sm:text-3xl lg:text-6xl bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Discover Unique, Handcrafted Treasures
                                    </p>
                                    <p className="subtitle text-base text-slate-900 font-normal sm:w-1/2 w-full">
                                        Discover the beauty of handcrafted creations, where every piece reflects passion and skill. Our local artisans create unique treasures that embody cultural richness, adding authentic charm and character to your space.
                                    </p>
                                    <div className="flex lg:items-start lg:flex-row flex-col gap-6">
                                        <Link href={route("customer.products")} className="w-full sm:w-auto">
                                            <button className="shop-button w-full sm:w-auto px-8 text-nowrap py-4 rounded-xl text-white font-semibold flex items-center justify-center bg-slate-800">
                                                Shop Now <HiMiniArrowLongRight className="ml-2" />
                                            </button>
                                        </Link>
                                        <Link href={route("customer.about")} className="w-full sm:w-auto">
                                            <button className="cta-button w-full sm:w-auto px-8 text-nowrap py-4 rounded-2xl text-primary font-semibold flex items-center justify-center border-2 border-primary">
                                                See How It Works
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="shop-categories -mb-20 sm:-mb-11 text-2xl text-center md:text-3xl lg:text-5xl uppercase font-extrabold text-slate-800">
                            Shop our{" "}
                            <span className="bg-slate-100 px-4 rounded-tr-3xl rounded-bl-3xl ">
                                Categories
                            </span>
                        </p>
                        <div className="w-full h-full rounded-3xl bg-slate-200 mt-4">
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
                                                className="category-card relative  bg-slate-50   rounded-3xl   w-full h-80 sm:h-80 md:h-96 xl:h-64 overflow-hidden transition-transform transform-gpu hover:scale-105 duration-700"
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
                                                        <p className="text-slate-900 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl mb-4 lg:mb-0 tracking-wide">
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
                            </div>
                        </div>
                        <div className="h-auto  ">
                            <CustomerContainer>
                                <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide">
                                    New Products
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                    {productData.length > 0 ? (
                                        productData.map((product) => (
                                            <div
                                                key={product.id}
                                                className=" bg-slate-50 bg-opacity-50 backdrop-blur-md rounded-3xl shadow-lg transition-transform transform-gpu hover:scale-105 duration-300"
                                            >
                                                <img
                                                    src={`/storage/${product.images[0].image_path}`}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover rounded-t-3xl"
                                                />
                                                <div className="p-4 ">
                                                    <div>
                                                        <h2 className="text-md font-bold text-slate-900 mt-2">
                                                            {product.name}
                                                        </h2>
                                                        <p className="text-gray-600 mt-1 text-xs">
                                                            {product.description.substring(
                                                                0,
                                                                100
                                                            )}
                                                            ...
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="inline-flex items-center mt-3 px-4 py-2 rounded-lg border border-slate-500"
                                                    >
                                                        <span className="mr-2 text-xs">
                                                            View Product
                                                        </span>
                                                        <PiArrowRightBold />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-600 col-span-full">
                                            No new products available
                                        </p>
                                    )}
                                </div>
                            </CustomerContainer>
                        </div>
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
}
