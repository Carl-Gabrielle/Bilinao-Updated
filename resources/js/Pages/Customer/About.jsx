import CustomerContainer from "@/Components/CustomerContainer";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { LiaHandHoldingHeartSolid, LiaPeopleCarrySolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import Banner from "@/Components/Banner";
import { MdOutlineRocket, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaKey, FaBox, FaClipboardList, FaChartLine } from "react-icons/fa";
import { Head, Link } from "@inertiajs/react";
import { FaUserAlt, FaShoppingCart, FaTruck, FaStar } from 'react-icons/fa'
export default function About({ auth }) {
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
                <Head title="About Us" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }
    return (
        <CustomerLayout user={auth.user}>
            <Head title="About Us" />
            <div className="min-h-screen   pt-20 pb-1 ">
                <Banner title="About Us" />
                <CustomerContainer>
                    <div className="flex flex-col items-center text-center space-y-6 px-4 sm:px-8 lg:px-16 py-10">
                        <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 uppercase tracking-wide">
                            Know Our Story
                        </h2>
                        <p className="text-lg leading-relaxed tracking-wide max-w-4xl text-slate-600">
                            Bili-Nao is a platform dedicated to connecting communities through the timeless artistry of handmade crafts. Our mission is to bring authentic, locally-crafted products to the forefront of global appreciation.
                            By serving as a bridge between artisans and audiences who value unique, culturally-rich creations, we strive to celebrate and sustain the traditions that make every piece a masterpiece.
                        </p>
                        <span className="items-center justify-end border border-slate-400 rounded-2xl text-slate-700  space-x-4 px-3 py-1 text-sm">Developed by<a href="https://carl-gabrielle.github.io/portfolio/?fbclid=IwAR28TXYma6rU8acfRjY4OfqBxHHxvakf3IQSweKolDF9jSFskmrYlusCFSE" target="_blank" className="text-primary font-medium"> Carl Gabrielle</a> </span>
                    </div>
                </CustomerContainer>
                <div className=" w-full h-auto mb-10 bg-slate-200 p-24">
                    <div className="max-w-4xl mx-auto  mb-4 ">
                        <h1 className="text-3xl text-center font-bold text-slate-800  uppercase tracking-wide">
                            What Drives Us
                        </h1>
                        <p className="text-lg text-center text-slate-600 tracking-wide leading-relaxed">Our work is fueled by a passion for cultural preservation, community empowerment, and forward-thinking innovation. At Bili-Nao, we prioritize:</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
                        <div className="p-10 bg-white tracking-wide  rounded-2xl   flex flex-col gap-3 items-center shadow-md ">
                            <LiaHandHoldingHeartSolid className="text-blue-500 size-10 " />
                            <span className="text-center text-slate-800  text-lg font-semibold">
                                Preserving Traditions
                            </span>
                            <p className="text-sm text-center text-slate-700">Safeguarding the artistry and stories behind traditional crafts.</p>
                        </div>
                        <div className="p-10 bg-white tracking-wide  rounded-2xl  flex flex-col gap-3 items-center shadow-md">
                            <LiaPeopleCarrySolid className="text-green-500  size-10" />
                            <span className="text-center text-slate-800  text-lg font-semibold">
                                Supporting Artisans
                            </span>
                            <p className="text-sm text-center text-slate-700">Empowering creators to showcase their talent and gain financial independence.</p>
                        </div>
                        <div className="p-10 bg-white  tracking-wide  rounded-2xl  flex flex-col gap-3 items-center shadow-md ">
                            <MdOutlineRocket className="text-purple-500 size-10 " />
                            <span className="text-center text-slate-800  text-lg font-semibold">
                                Successful Digital Business
                            </span>
                            <p className="text-sm text-center text-slate-700">Leveraging technology to combine the richness of tradition with the efficiency of modern commerce.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto mb-10 p-24">
                    <div className="max-w-4xl mx-auto mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-800 uppercase tracking-wide mb-4">
                            How does this platform work?
                        </h1>
                        <p className="text-lg text-slate-600 tracking-wide leading-relaxed">
                            This platform is built to simplify and enhance both the selling and shopping experiences.
                        </p>
                    </div>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out  transform hover:scale-105">
                            <span className="bg-blue-100 px-5 py-1 rounded-full font-medium text-blue-500 text-lg">
                                Seller
                            </span>
                            <p className="font-semibold text-2xl mt-4 text-primary">Ready to Sell? Here’s How!</p>
                            <p className="mt-4 text-slate-700 text-lg">
                                As a seller, you can easily upload products, manage orders, and track your sales directly from your dashboard.
                            </p>
                            <div className="bg-slate-50 rounded-2xl p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className=" px-4 py-4 rounded-md  font-medium">
                                    <FaKey className="text-yellow-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Get Your Admin-Provided Username </p>
                                    <p className="text-md text-slate-600"> Use the provided credentials to log in</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className=" px-4 py-4 rounded-md  font-medium">
                                    <FaBox className="text-green-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Display your Products </p>
                                    <p className="text-md text-slate-600"> Add your products to the platform with detailed descriptions, prices, and images to capture customer interest.</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className=" px-4 py-4 rounded-md  font-medium">
                                    <FaClipboardList className="text-blue-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Track and Handle Orders</p>
                                    <p className="text-md text-slate-600">View and process customer orders efficiently, ensuring timely delivery and customer satisfaction.</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className=" px-4 py-4 rounded-md  font-medium">
                                    <FaChartLine className="text-purple-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Monitor Revenue Trends</p>
                                    <p className="text-md text-slate-600">Track your sales performance with detailed analytics to optimize your product strategy and maximize profits.</p>
                                </div>
                            </div>
                            <Link href="/sellerLogin">
                                <button className="shop-button px-8 text-nowrap py-4 rounded-2xl text-white font-semibold flex items-center justify-center bg-slate-800">
                                    Get Started
                                    <MdOutlineKeyboardArrowRight className="ml-2" />
                                </button>
                            </Link>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105">
                            <span className="bg-green-100 px-5 py-1 rounded-full font-medium text-green-500 text-lg">
                                Customer
                            </span>
                            <p className="font-semibold text-2xl mt-4 text-primary">Set Up Your  Account in Minutes</p>
                            <p className="mt-4 text-slate-700 text-lg">
                                As a customer, browse through a wide variety of products, add them to your cart, and complete your purchase with ease.
                            </p>
                            <div className=" p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className=" border px-4 py-4 rounded-md  font-medium">
                                    <FaUserAlt className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Create your account </p>
                                    <p className="text-md text-slate-600"> Sign up with your email to unlock a world of shopping opportunities. It's quick and easy!</p>
                                </div>
                            </div>
                            <div className=" p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className="border px-4 py-4 rounded-md  font-medium">
                                    <FaShoppingCart className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Browse & purchase products </p>
                                    <p className="text-md text-slate-600">  Explore a wide variety of categories, find what you need, and add your favorites to the cart.</p>
                                </div>
                            </div>
                            <div className=" p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className="border px-4 py-4 rounded-md  font-medium">
                                    <FaTruck className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Track your Orders </p>
                                    <p className="text-md text-slate-600"> Stay updated on your order status and know exactly when your items will arrive.</p>
                                </div>
                            </div>
                            <div className=" p-5 mt-4 text-sm flex items-center sm:flex-row flex-col space-x-3 mb-4">
                                <div className=" border px-4 py-4 rounded-md  font-medium">
                                    <FaStar className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-primary font-semibold text-lg">Review & enjoy your orders </p>
                                    <p className="text-md text-slate-600"> Leave reviews, share your experiences, and enjoy the products you've purchased.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
