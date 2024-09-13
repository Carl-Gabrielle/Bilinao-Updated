import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsBasket2 } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 z-0">
                        <div className="bg-white p-6 rounded-3xl flex flex-col  items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 ease-in-out transition-transform duration-300">
                            <div className="flex items-center justify-center bg-lime-100 rounded-full p-3 mb-4">
                                <MdProductionQuantityLimits className="text-lime-700 text-2xl" />
                            </div>
                            <span className="font-bold text-3xl text-gray-800">
                                125
                            </span>
                            <span className="font-medium text-sm text-gray-500 mt-2">
                                Total Products
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center bg-lime-100 rounded-full p-3 mb-4">
                                <FaRegUser className="text-lime-700 text-2xl" />
                            </div>
                            <span className="font-bold text-3xl text-gray-800">
                                56
                            </span>
                            <span className="font-medium text-sm text-gray-500 mt-2">
                                Total Sellers
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center bg-lime-100 rounded-full p-3 mb-4">
                                <BsBasket2 className="text-lime-700 text-2xl" />
                            </div>
                            <span className="font-bold text-3xl text-gray-800">
                                45
                            </span>
                            <span className="font-medium text-sm text-gray-500 mt-2">
                                Total Orders
                            </span>
                        </div>
                        <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center bg-lime-100 rounded-full p-3 mb-4">
                                <BiCategory className="text-lime-700 text-2xl" />
                            </div>
                            <span className="font-bold text-3xl text-gray-800">
                                4
                            </span>
                            <span className="font-medium text-sm text-gray-500 mt-2">
                                Total Category
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
