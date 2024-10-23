import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function RecentOrders({
    auth = {},
    recentOrders = {},
    success,
    totalOrdersCount = 0,
}) {
    // Accept recentOrders as an object
    const user = auth.user || {};
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setVisibleSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    return (
        <SellerLayout user={user}>
            <Head title="Recent Orders" />
            {visibleSuccess && (
                <div className="mt-3 bg-gray-50 py-3 px-5 rounded-lg mb-5 flex items-center justify-center w-1/2 ml-auto shadow-lg">
                    <div className="bg-green-500 p-1 rounded-full flex items-center justify-center">
                        {/* <FaCheck className="text-white text-lg" /> */}
                    </div>
                    <span className="ml-3 text-gray-700 font-medium">
                        {success}
                    </span>
                </div>
            )}
            <div className="container mx-auto px-4 py-6">
                <div className="px-7 py-8">
                    <div className="w-full">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-800 mb-0">
                                Recent Orders
                            </h1>
                            <span className="px-3 py-1 text-slate-50 bg-slate-800  text-sm font-medium rounded-md">
                                {totalOrdersCount}
                            </span>
                        </div>
                        <div className="w-full border mt-5 overflow-x-auto scroll-bar rounded-lg bg-slate-50 bg-opacity-65 backdrop-blur-lg">
                            <table className="min-w-full">
                                <thead className="bg-slate-50 border-b border-gray-200 text-xs uppercase">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            No.
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Customer Name
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Amount
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Status
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.data.length > 0 ? (
                                        recentOrders.data.map(
                                            (order, index) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-b text-xs font-medium"
                                                >
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <div className="truncate max-w-[150px]">
                                                            {recentOrders.current_page ===
                                                            1
                                                                ? index + 1
                                                                : (recentOrders.current_page -
                                                                      1) *
                                                                      recentOrders.per_page +
                                                                  index +
                                                                  1}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        {order.name}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800 flex items-center">
                                                        <FaPesoSign className="mr-1" />
                                                        {order.amount}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <span className="bg-red-200 text-red-800 text-medium font-semibold px-2 py-0.5 rounded-md">
                                                            {order.remarks ||
                                                                "Unknown"}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <Link
                                                            href={route(
                                                                "seller.OrderDetails",
                                                                { id: order.id }
                                                            )}
                                                        >
                                                            <button className="px-4 py-1 flex items-center bg-slate-800 text-slate-50 rounded-md">
                                                                <AiOutlineEye className="mr-2" />
                                                                <span>
                                                                    View
                                                                </span>
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-4 px-6 text-slate-800 text-center text-sm"
                                            >
                                                No recent orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Add the Pagination component below the table */}
                        <Pagination links={recentOrders.links} />
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
