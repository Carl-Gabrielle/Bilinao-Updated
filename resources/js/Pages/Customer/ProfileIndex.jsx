import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileIndex({ auth }) {
    const { user } = auth;

    return (
        <CustomerLayout user={user}>
            <Head title="Profile" />
            <div className="min-h-screen bg-gray-100 pt-20 pb-12">
                <Banner title="Profile" />
                <CustomerContainer>
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 ">
                        {/* Profile Header */}
                        <div className="flex items-center space-x-8 mb-10">
                            <div className="relative">
                                {/* Profile Picture with border */}
                                <div className="w-32 h-32 rounded-full border-4 border-blue-600 overflow-hidden flex justify-center items-center text-gray-500 bg-gray-200 shadow-lg">
                                    <FaUserCircle size={128} />
                                </div>
                                {/* Edit Profile Icon */}
                                <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 focus:outline-none shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15.232 5.232l3.536 3.536M9 11l5 5m0 0L6 20m5-5L7 17m-2 2v3h3m2-2l-2-2-1.5 1.5M18.828 4.586a2 2 0 00-2.828 0l-9 9a2 2 0 00-.586 1.414V21h2.586a2 2 0 001.414-.586l9-9a2 2 0 000-2.828z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* User Information */}
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
                                    {user.name}
                                </h2>
                                <p className="text-lg text-gray-600 mt-2">
                                    {user.email}
                                </p>
                            </div>
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
                                        {user.phone || "N/A"}
                                    </li>
                                    <li className="text-gray-700">
                                        <strong>Joined:</strong>{" "}
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </li>
                                </ul>
                            </div>

                            {/* Address Info */}
                            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Shipping Address
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {/* Placeholder for address */}
                                    1234 Street Name, City, Country, Zip Code
                                </p>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-300 focus:outline-none">
                                    Edit Address
                                </button>
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
