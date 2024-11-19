import React from "react";
import { Head, Link } from "@inertiajs/react";
import { FaPesoSign } from "react-icons/fa6";
import { IoStorefrontOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { GrMapLocation } from "react-icons/gr";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { AiOutlineMessage } from "react-icons/ai";
import CustomerContainer from "@/Components/CustomerContainer";
import Banner from "@/Components/Banner";

const PublicProfile = ({ seller, products, auth }) => {
    return (
        <>
            <Head title={`${seller.name}'s Profile`} />
            <CustomerLayout user={auth.user}>
                <div className="min-h-screen bg-slate-300 pt-20 pb-12">
                    <Banner title={`${seller.name}'s Profile`} />
                    <CustomerContainer>
                        <div className="container mx-auto px-4 py-8">
                            <div className="bg-slate-50 shadow-lg rounded-2xl overflow-hidden">
                                <div className="flex flex-col md:flex-row items-center md:items-start justify-between p-8">
                                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
                                        <img
                                            src={seller.image_path || "/images/default-profile.png"}
                                            alt="Profile"
                                            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
                                        />
                                        <div className="text-center md:text-left mt-4 md:mt-0">
                                            <h1 className="text-2xl font-bold text-primary flex items-center">
                                                <IoStorefrontOutline className="mr-2" />
                                                {seller.name}
                                            </h1>
                                            <p className="text-gray-600 flex items-center mt-2">
                                                <MdOutlineMailOutline className="mr-2 text-gray-500" />
                                                {seller.email}
                                            </p>
                                            <p className="text-gray-600 flex items-center mt-2">
                                                <HiOutlineDevicePhoneMobile className="mr-2 text-gray-500" />
                                                {seller.contact_number || "Not provided"}
                                            </p>
                                            <p className="text-gray-600 flex items-center mt-2">
                                                <GrMapLocation className="mr-2 text-gray-500" />
                                                {seller.address || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="self-center mt-4 md:mt-0">
                                        <Link>
                                            <button className="bg-primary text-slate-50 px-4 py-1 rounded-2xl flex items-center">
                                                <AiOutlineMessage className="mr-2" />
                                                Message Seller
                                            </button>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="bg-slate-50 shadow-lg rounded-2xl  p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">
                                        Products by {seller.name}
                                    </h2>
                                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="border border-slate-200 rounded-lg overflow-hidden relative"
                                                >
                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="block"
                                                    >
                                                        <img
                                                            src={
                                                                product.images?.[0]?.image_path
                                                                    ? `/storage/${product.images[0].image_path}`
                                                                    : "/images/default-product.png"
                                                            }
                                                            alt={product.name}
                                                            className="w-full h-40 object-cover"
                                                        />
                                                    </Link>
                                                    <div className="p-4">
                                                        <h4 className="text-gray-800 font-semibold text-base">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-primary font-medium mt-2 flex items-center">
                                                            <FaPesoSign className="mr-1" />
                                                            {product.price}
                                                        </p>
                                                        {!product.is_published && (
                                                            <span className="text-red-500 text-xs mt-2">
                                                                This product is unpublished.
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">
                                                No products available from this seller.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomerContainer>
                </div>
            </CustomerLayout>
        </>
    );
};
export default PublicProfile;
