import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import { CiStar } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { GrMapLocation } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

export default function SellerProfile() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <SellerLayout user={user}>
                <Head title="Seller Profile" />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white shadow-lg rounded-3xl overflow-hidden backdrop-blur-lg relative">
                        {/* Cover Image Section */}
                        <div className="h-60 w-full bg-slate-800 flex items-center justify-center relative overflow-hidden">
                            {/* Main Title */}
                            <h2 className="text-center text-3xl md:text-4xl lg:text-5xl text-slate-100 font-bold z-10 tracking-wide">
                                Seller Profile
                            </h2>
                            {/* Star Icon Decorations */}
                            <CiStar className="hidden sm:block absolute top-16 left-28 text-white size-7 opacity-20" />
                            <CiStar className="hidden sm:block absolute top-20 left-60 text-white size-7 opacity-20" />
                            <CiStar className="hidden sm:block absolute top-16 right-28 text-white size-7 opacity-20" />
                            <CiStar className="hidden sm:block absolute top-20 right-60 text-white size-7 opacity-20" />

                            {/* Decorative Circles */}
                            <div className="absolute w-56 h-56 rounded-full border-2 border-white opacity-20 right-0 sm:-right-10 -top-10"></div>
                            <div className="absolute w-56 h-56 rounded-full border-2 border-white opacity-20 -bottom-10 -left-10"></div>

                            {/* Subtle Background Text */}
                            <h2 className="absolute top-10 text-center text-4xl md:text-5xl text-banner lg:text-7xl text-slate-100 font-medium opacity-5 transform translate-y-3 blur-xs tracking-widest">
                                Seller Profile
                            </h2>
                        </div>
                        {/* Profile Info Section */}
                        <div className="flex items-center px-8 py-7 w-full flex-col sm:flex-row">
                            {/* Profile Image */}
                            <div className="relative sm:mr-6  w-44">
                                <img
                                    alt="Profile"
                                    src={
                                        user.image_path
                                            ? `/storage/${user.image_path}`
                                            : "/path/to/default/profile/picture.jpg"
                                    }
                                    className="w-36 h-36 rounded-full object-cover border-4 border-slate-300 shadow-lg"
                                />
                            </div>
                            {/* Profile Details */}
                            <div className="flex flex-col sm:flex-row justify-between w-full mt-4 sm:mt-0 items-center">
                                <div className="space-y-2 text-slate-800">
                                    <h1 className="text-xl font-medium flex items-center">
                                        <IoStorefrontOutline className="mr-2 text-slate-800" />
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-500 text-sm flex items-center">
                                        <GrMapLocation className="mr-2 text-gray-500" />
                                        {user.address}
                                    </p>

                                    <p className="text-gray-500 text-sm flex items-center">
                                        <HiOutlineDevicePhoneMobile className="mr-2 text-gray-500" />
                                        {user.contact_number}
                                    </p>

                                    <p className="text-gray-500 text-sm flex items-center">
                                        <MdOutlineMailOutline className="mr-2 text-gray-500" />
                                        {user.email}
                                    </p>

                                    <p className="text-gray-500 text-sm flex items-center">
                                        <CiCalendar className="mr-2 text-gray-500" />
                                        <span className="mr-2">Joined: </span>
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
                                    </p>
                                </div>

                                {/* Edit Profile Button */}
                                <Link
                                    href={route("seller.profileEdit")}
                                    className="mt-6 sm:mt-0 sm:ml-6"
                                >
                                    <button className="px-5 py-3 text-sm font-semibold rounded-md bg-slate-800 text-slate-100 flex items-center">
                                        <LiaEditSolid className="mr-2" />
                                        Edit Profile
                                    </button>
                                </Link>
                            </div>
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
                    </div>
                </div>
            </SellerLayout>
        </>
    );
}
