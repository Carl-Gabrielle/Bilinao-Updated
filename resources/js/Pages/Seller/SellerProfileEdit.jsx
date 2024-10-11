import React from "react";
import { Head, useForm } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";

export default function SellerProfileEdit({ seller }) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: seller.name || "",
            address: seller.address || "",
            contact_number: seller.contact_number || "",
            email: seller.email || "",
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
                <div className="bg-white shadow-lg rounded-3xl p-6">
                    <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        "profile_picture",
                                        e.target.files[0]
                                    )
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.profile_picture && (
                                <div className="text-red-600">
                                    {errors.profile_picture}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.address && (
                                <div className="text-red-600">
                                    {errors.address}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                value={data.contact_number}
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.email && (
                                <div className="text-red-600">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}

                        <button
                            type="submit"
                            className="px-5 py-3 bg-slate-800 text-white rounded-md"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </SellerLayout>
    );
}
