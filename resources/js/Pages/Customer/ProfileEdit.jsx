
{/* <div className="max-w-2xl mx-auto  bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-5 ">
<div className="flex items-center mb-4">
    <div className="bg-slate-100 mr-2 p-2 rounded-md inline-block">
        <FaRegUser />
    </div>
    <h1 className="text-xl  tracking-wide text-primary  ">Security</h1>
</div>
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        Current Password
    </label>
    <CustomerInput
        type="text"
        value={data.current_password}
        placeholder="Enter your current password"
        onChange={(e) => setData('current_password', e.target.value)}
    />
</div>
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        New Password
    </label>
    <CustomerInput
        type="text"
        value={data.password}
        placeholder="Enter your new password"
        onChange={(e) => setData('password', e.target.value)}
    />
</div>
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
        Confirm Password
    </label>
    <CustomerInput
        type="text"
        value={data.confirm_password}
        placeholder="Confirm new password"
        onChange={(e) => setData('confirm_password', e.target.value)}
    />
</div>
<button
    type="submit"
    className="px-5 py-2 bg-slate-800 text-white rounded-2xl text-center w-full"
>
    {processing
        ? "Updating Password..."
        : "Update Password"}
</button>
</div> */}

// current_password: '',
//     password: '',
//         password_confirmation: '',

<form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="relative flex items-center justify-center ">
        <label htmlFor="profile-picture" className="cursor-pointer">
            <img
                src={imageSrc}
                alt="Profile Image"
                className="w-32 h-32 mt-4 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg object-cover"
            />
            {/* Camera icon positioned inside the image */}
            <div className="absolute bottom-1 right-64 sm:block hidden  text-white bg-primary p-1 rounded-full">
                <IoCameraOutline />
            </div>
        </label>
        <input
            id="profile-picture"
            type="file"
            className="hidden" // Hide the input
            onChange={handleImageChange}
            accept="image/*"
        />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-4">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <CustomerInput
                type="text"
                value={user.name}
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
                Contact Number
            </label>
            <CustomerInput
                type="text"
                value={user.phone_number}
                onChange={(e) =>
                    setData("phone_number", e.target.value)
                }
            />
            {errors.contact_number && (
                <div className="text-red-600">
                    {errors.phone_number}
                </div>
            )}
        </div>
    </div>
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <input
            type="text"
            value={user.email}
            readOnly
            className="focus:outline-none focus:ring-0 border  focus:border-primary focus:border   py-2 px-4 w-full rounded-2xl  border-gray-500 bg-slate-300"
        />
        <label className="block text-sm  text-gray-700">
            Email cannot be changed
        </label>
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
import Banner from "@/Components/Banner";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { LuSettings2 } from "react-icons/lu";
import { IoCameraOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaUserCircle } from "react-icons/fa";
import CustomerInput from "@/Components/InformationInput";
import { Head, Link } from "@inertiajs/react";

export default function ProfileIndex({ auth }) {
    const { user } = auth;
    const [imageSrc, setImageSrc] = useState('/images/default-profile.png');
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a URL for the selected file
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setImageFile(file);
        }
    };
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: user.name || "",
            phone_number: user.phone_number || "",
            email: user.email || "",
            profile_photo_path: user.profile_photo_path || "",
            _method: "PUT",
        });
    function handleSubmit(e) {
        e.preventDefault();

        // Submit form data using multipart/form-data
        post(route("customer.updateProfile"), {
            forceFormData: true,
            onSuccess: () => {
                // Redirect to profile page after successful update
                window.location.href = route("customer.customerProfile");
            },
        });
    }
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
                    <div className=" mb-10 max-w-2xl mx-auto leading-8">
                        <div className="flex items-center">
                            <div className="bg-slate-200 mr-2 p-2 rounded-md">
                                <LuSettings2 />
                            </div>
                            <h1 className="text-2xl  tracking-wide text-primary ">Account Settings</h1>
                        </div>
                        <p className="text-primary">Manage your account settings and preferences</p>
                    </div>
                    <div className="max-w-2xl mx-auto  bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-5  mb-6">
                        <div className="flex items-center">
                            <div className="bg-slate-100 mr-2 p-2 rounded-md inline-block">
                                <FaRegUser />
                            </div>
                            <h1 className="text-xl  tracking-wide text-primary ">Profile</h1>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="relative flex items-center justify-center ">
                                <label htmlFor="profile-picture" className="cursor-pointer">
                                    <img
                                        src={imageSrc}
                                        alt="Profile Image"
                                        className="w-32 h-32 mt-4 rounded-full border-4 border-primary overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg object-cover"
                                    />
                                    {/* Camera icon positioned inside the image */}
                                    <div className="absolute bottom-1 right-64 sm:block hidden  text-white bg-primary p-1 rounded-full">
                                        <IoCameraOutline />
                                    </div>
                                </label>
                                <input
                                    id="profile-picture"
                                    type="file"
                                    className="hidden" // Hide the input
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <CustomerInput
                                        type="text"
                                        value={user.name}
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
                                        Contact Number
                                    </label>
                                    <CustomerInput
                                        type="text"
                                        value={user.phone_number}
                                        onChange={(e) =>
                                            setData("phone_number", e.target.value)
                                        }
                                    />
                                    {errors.contact_number && (
                                        <div className="text-red-600">
                                            {errors.phone_number}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={user.email}
                                    readOnly
                                    className="focus:outline-none focus:ring-0 border  focus:border-primary focus:border   py-2 px-4 w-full rounded-2xl  border-gray-500 bg-slate-300"
                                />
                                <label className="block text-sm  text-gray-700">
                                    Email cannot be changed
                                </label>
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
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
