import React from "react";
import { Head, usePage } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";

export default function SellerProfile() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <SellerLayout user={user}>
                <Head title="Seller Profile" />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
                        {/* Cover Image */}
                        <div className="bg-lime-700 h-32"></div>
                        <div className="relative -mt-16 flex justify-center">
                            {/* Profile Image */}
                            <img
                                src={
                                    user.profile_photo_url ||
                                    "/images/default-profile.png"
                                }
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                            />
                        </div>
                        <div className="text-center mt-4 py-4">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {user.name}
                            </h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="bg-white shadow-md rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                About
                            </h2>
                            <p className="text-gray-600 mt-2">
                                This is the seller's profile. Here you can find
                                all details about the seller, their offerings,
                                and more information.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                Contact Information
                            </h3>
                            <div className="space-y-2 mt-4">
                                <p className="text-gray-600">
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {user.email}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{" "}
                                    {user.contact_number || "Not provided"}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">
                                        Username:
                                    </span>{" "}
                                    {user.username || "Not provided"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SellerLayout>
        </>
    );
}
