import Banner from "@/Components/Banner";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, Link } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileIndex({ auth }) {
    const { user } = auth;
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
                <Head title="My Account" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }
    return (
        <CustomerLayout user={user}>
            <Head title="My Account" />
            <div className="min-h-screen  pt-20 pb-12">
                <Banner title="My Account" />
                <CustomerContainer>
                    <div className="max-w-5xl mx-auto  bg-slate-50 rounded-2xl shadow-xl p-10 ">
                        {/* Profile Header */}
                        <div className="flex items-center justify-between space-x-8 mb-10">
                            <div className="flex items-center">
                                {/* Profile Picture with border */}
                                <div className="w-32 h-32 rounded-full border-4 border-blue-600 overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg">
                                    <FaUserCircle size={128} />
                                </div>
                                {/* User Information */}
                                <div className="flex items-center flex-col text-left">
                                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
                                        {user.name}
                                    </h2>
                                    <p className="text-lg text-gray-600 mt-2">
                                        verified customer
                                    </p>
                                    <p className="text-lg text-gray-600 mt-2">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <Link href={route("customer.editProfile")}>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-300 focus:outline-none">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Account Info */}
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Account Information
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-gray-700">
                                        <strong>Name:</strong> {user.name}
                                    </li>
                                    <li className="text-gray-700">
                                        <strong>Email:</strong> {user.email}
                                    </li>
                                    <li className="text-gray-700">
                                        <strong>Phone:</strong>{" "}
                                        {user.phone_number}
                                    </li>
                                    <li className="text-gray-700">
                                        <strong>Joined:</strong>{" "}
                                        {new Date(user.created_at)
                                            .toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                            .replace(
                                                /(\w+)\s(\d+),\s*(\d+)/,
                                                "$1. $2, $3"
                                            )}
                                    </li>
                                </ul>
                            </div>

                            {/* Address Info */}
                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Shipping Address
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {user.address}
                                </p>
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="mt-12">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                Order History
                            </h3>
                            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500 shadow-sm">
                                {/* Placeholder for order history */}
                                You have no orders yet.
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
