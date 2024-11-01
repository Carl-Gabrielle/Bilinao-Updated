import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SellerInput from "@/Components/SellerInput";
export default function SellerProfileEdit({ seller }) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: seller.name || "",
            address: seller.address || "",
            contact_number: seller.contact_number || "",
            email: seller.email || "",
            image_path: seller.image_path || "",
            _method: "PUT",
        });
    function handleSubmit(e) {
        e.preventDefault();

        // Submit form data using multipart/form-data
        post(route("seller.storeProfile"), {
            forceFormData: true,
            onSuccess: () => {
                // Redirect to profile page after successful update
                window.location.href = route("seller.profile");
            },
        });
    }

    return (
        <SellerLayout user={seller}>
            <Head title="Edit Profile" />
            <div className="container mx-auto px-4 py-8">
                <Link
                    href={route("seller.profile")}
                    className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-1 rounded-full font-semibold"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="bg-slate-100 shadow-lg rounded-3xl p-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h2 className="text-2xl font-semibold mb-6">
                            Edit Profile
                        </h2>
                        <div className="mb-4">
                            <img
                                src={
                                    seller.image_path ||
                                    "/images/default-profile.png"
                                }
                                alt="Profile"
                                className="w-32 h-32 object-cover rounded-full border-4 border-slate-300 shadow-md mb-4"
                            />
                            <label className="block text-sm font-medium text-gray-700">
                                Profile Picture
                            </label>{" "}
                            <SellerInput
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        "profile_picture",
                                        e.target.files[0]
                                    )
                                }
                            />
                            {errors.profile_picture && (
                                <div className="text-red-600">
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
                                <SellerInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <div className="text-red-600">
                                        {errors.email}
                                    </div>
                                )}
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
