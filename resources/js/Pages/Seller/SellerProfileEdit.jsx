import { Head, useForm, Link } from "@inertiajs/react";
import { FaRegUser } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import SellerLayout from "@/Layouts/SellerLayout";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SellerInput from "@/Components/SellerInput";
export default function SellerProfileEdit({ seller }) {
    const [previewImage, setPreviewImage] = useState(seller.image_path || "/images/default-profile.png");

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: seller.name || "",
        address: seller.address || "",
        contact_number: seller.contact_number || "",
        email: seller.email || "",
        image_path: seller.image_path || "",
        _method: "PUT",
    });

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setData("profile_picture", file);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("seller.storeProfile"), {
            forceFormData: true,
            onSuccess: () => {
                window.location.href = route("seller.profile");
            },
        });
    }

    return (
        <SellerLayout user={seller}>
            <Head title="Edit Profile" />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <Link
                    href={route("seller.profile")}
                    className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-1 rounded-full font-semibold"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="bg-slate-100 shadow-lg rounded-3xl p-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex items-center">
                            <div className="bg-slate-100 mr-2 p-2 rounded-md inline-block">
                                <FaRegUser />
                            </div>
                            <h2 className="text-lg font-medium text-primary">
                                Profile
                            </h2>
                        </div>
                        <div className="relative flex items-center justify-center mb-4 ">
                            <label htmlFor="profile-picture" className="cursor-pointer">
                                <img
                                    src={previewImage}
                                    alt="Profile Image"
                                    className="w-32 h-32 mt-4 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg object-cover"
                                />
                                <div className="absolute bottom-1 right-72 sm:block hidden text-white bg-primary p-1 rounded-full">
                                    <IoCameraOutline />
                                </div>
                            </label>
                            <input
                                id="profile-picture"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            {errors.profile_picture && (
                                <div className="text-red-600 text-sm mt-2">
                                    {errors.profile_picture}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                            <div className="mb-4 ">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <SellerInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <div className="text-red-600">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <SellerInput
                                    type="text"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                {errors.address && (
                                    <div className="text-red-600">
                                        {errors.address}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 ">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Contact Number
                                </label>
                                <SellerInput
                                    type="text"
                                    value={data.contact_number}
                                    onChange={(e) =>
                                        setData("contact_number", e.target.value)
                                    }
                                />
                                {errors.contact_number && (
                                    <div className="text-red-600">
                                        {errors.contact_number}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={data.email}
                                    readOnly
                                    className="focus:outline-none focus:ring-0 border  focus:border-primary focus:border   py-2 px-4 w-full rounded-2xl  border-gray-500 bg-slate-300"
                                />
                                <label className="block text-sm  text-gray-700">
                                    Email cannot be changed
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-slate-800 text-white rounded-2xl text-center w-full"
                        >
                            {processing
                                ? "Updating Profile..."
                                : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </SellerLayout>
    );
}
