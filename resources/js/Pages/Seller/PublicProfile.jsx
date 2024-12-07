import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { FaPesoSign } from "react-icons/fa6";
import { IoStorefrontOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { GrMapLocation } from "react-icons/gr";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { FaRegFlag } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import CustomerContainer from "@/Components/CustomerContainer";
import Banner from "@/Components/Banner";

const PublicProfile = ({ seller, products, auth }) => {
    const [isReportModalVisible, setReportModalVisible] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [otherReason, setOtherReason] = useState("");

    const handleReportSubmit = () => {
        console.log("Reported for:", selectedReason);
        setReportModalVisible(false);
    };
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
                                    <div>
                                        <button
                                            onClick={() => setReportModalVisible(true)}
                                            className="bg-red-500 px-4 py-2 text-sm mt-4 flex items-center text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all"
                                        >
                                            <FaRegFlag className="mr-2 size-4" />
                                            Report Seller
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {isReportModalVisible && (
                                <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-slate-50 p-6 rounded-2xl shadow-lg w-full max-w-md">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            Why are you reporting this seller?
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Please select a reason below and provide additional details to help us understand the issue better.
                                        </p>
                                        <form>
                                            <div className="space-y-4 text-primary">
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="reportReason"
                                                            value="Fraudulent activity"
                                                            onChange={() => setSelectedReason("Fraudulent activity")}
                                                            className="mr-2 "
                                                        />
                                                        Fraudulent activity
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="reportReason"
                                                            value="Poor customer service"
                                                            onChange={() => setSelectedReason("Poor customer service")}
                                                            className="mr-2"
                                                        />
                                                        Poor customer service
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="reportReason"
                                                            value="Poor customer service"
                                                            onChange={() => setSelectedReason("Poor customer service")}
                                                            className="mr-2"
                                                        />
                                                        Incorrect Information
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="reportReason"
                                                            value="Poor customer service"
                                                            onChange={() => setSelectedReason("Poor customer service")}
                                                            className="mr-2"
                                                        />
                                                        Prohibited Content
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="reportReason"
                                                            value="Violates platform policies"
                                                            onChange={() => setSelectedReason("Violates platform policies")}
                                                            className="mr-2"
                                                        />
                                                        Violates platform policies
                                                    </label>
                                                </div>
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="otherReason">
                                                        Other (please specify)
                                                    </label>
                                                    <textarea
                                                        id="otherReason"
                                                        name="otherReason"
                                                        rows="4"
                                                        placeholder="Provide additional details..."
                                                        value={otherReason}
                                                        onChange={(e) => setOtherReason(e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                                    ></textarea>
                                                    <span className="text-xs text-primary">0/300</span>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setReportModalVisible(false)}
                                                    className="text-primary px-4 py-0.5 rounded-2xl transition duration-150"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleReportSubmit}
                                                    className="bg-blue-200 text-blue-600 px-4 py-0.5 rounded-md transition duration-150"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            <div className="mt-8">
                                <div className="bg-slate-50 shadow-lg rounded-2xl p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">
                                        Products by {seller.name}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="border border-slate-200 rounded-lg overflow-hidden relative"
                                                >
                                                    <Link href={`/product/${product.id}`} className="block">
                                                        <img
                                                            src={product.images?.[0]?.image_path
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
