import React from "react";
import { Head, Link } from "@inertiajs/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { IoHomeOutline } from "react-icons/io5";
import CustomerContainer from "@/Components/CustomerContainer";

const PublicProfile = ({ seller, products, auth }) => {
    return (
        <>
            <Head title={`${seller.name}'s Profile`} />
            <CustomerLayout user={auth.user}>
                <CustomerContainer>
                    <div className="container mx-auto px-4 py-8 pt-10">
                        <div className="mb-5 lg:flex items-center space-x-4 hidden sm:block">
                            <Link href={route("customer.index")}>
                                <IoHomeOutline />
                            </Link>
                            <span>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                            <span className="text-gray-700 hover:underline">
                                Seller Profile
                            </span>
                        </div>

                        {/* Profile Section */}
                        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
                            {/* Cover Image */}
                            <div className="bg-lime-700 h-32"></div>
                            <div className="relative -mt-16 flex justify-center">
                                {/* Profile Image */}
                                <img
                                    src={
                                        seller.profile_photo_url ||
                                        "/images/default-profile.png"
                                    }
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                                />
                            </div>
                            <div className="text-center mt-4 py-4">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {seller.name}
                                </h1>
                                <p className="text-gray-500">
                                    {seller.username || "No username provided"}
                                </p>
                                <p className="text-md text-slate-800">
                                    {seller.email}
                                </p>
                                <div className="flex items-center justify-center mt-4 space-x-16">
                                    <div className="text-center">
                                        <span className="block text-xl font-medium">
                                            {products.length}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Products
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xl font-medium">
                                            0
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Followers
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xl font-medium">
                                            0
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Following
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mt-8 space-y-6">
                            <div className="bg-white shadow-md rounded-3xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                    About
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    {seller.about ||
                                        "No information provided about this seller."}
                                </p>
                            </div>

                            {/* Contact Information Section */}
                            <div className="bg-white shadow-md rounded-3xl p-6">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                    Contact Information
                                </h3>
                                <div className="space-y-2 mt-4">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Email:
                                        </span>{" "}
                                        {seller.email}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Phone:
                                        </span>{" "}
                                        {seller.contact_number ||
                                            "Not provided"}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Username:
                                        </span>{" "}
                                        @{seller.username || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Seller's Products Section */}
                            <div className="bg-white shadow-md rounded-3xl p-6">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                    Products by {seller.name}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="p-4 border rounded shadow-sm"
                                            >
                                                <Link
                                                    href={`/product/${product.id}`}
                                                >
                                                    <img
                                                        src={
                                                            product.images?.[0]
                                                                ?.image_path
                                                                ? `/storage/${product.images[0].image_path}`
                                                                : "/images/default-product.png"
                                                        }
                                                        alt={product.name}
                                                        className="w-full h-40 object-cover rounded-lg mb-2"
                                                    />
                                                    <h4 className="font-semibold text-gray-800">
                                                        {product.name}
                                                    </h4>
                                                </Link>
                                                <p className="text-gray-600 mt-1">
                                                    ${product.price}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">
                                            No products available from this
                                            seller.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </CustomerLayout>
        </>
    );
};

export default PublicProfile;
