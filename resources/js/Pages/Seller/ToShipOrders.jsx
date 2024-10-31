import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
export default function ToShipOrders({ auth = {},
    shippedOrders = {},
    success, }) {
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
            <Head title="To Ship Orders" />
            <div className="relative">
                {visibleSuccess && (
                    <div className="absolute top-0 right-0 mt-3 bg-gray-50 py-3 px-5 rounded-lg mb-5 flex items-center justify-center w-1/2 shadow-lg">
                        <div className="bg-green-500 p-1 rounded-full flex items-center justify-center">
                            <FaCheck className="text-white text-lg" />
                        </div>
                        <span className="ml-3 text-gray-700 font-medium">
                            {success}
                        </span>
                    </div>
                )}
                <div className="container mx-auto px-4 py-6">
                    <div className="px-7 py-8 ">
                        <div className="w-full ">
                            <h1 className="text-xl font-semibold text-gray-800 mb-0">
                                To Ship Orders
                            </h1>
                            <div className="w-full border mt-5 overflow-x-auto scroll-bar rounded-lg bg-slate-50 bg-opacity-65 backdrop-blur-lg ">
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
                                        {shippedOrders.data.length > 0 ? (
                                            shippedOrders.data.map((order, index) => (
                                                <tr key={order.id} className="border-b  text-xs font-medium">
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <div className="truncate max-w-[150px]">
                                                            {index +
                                                                1 +
                                                                (shippedOrders.current_page -
                                                                    1) *
                                                                shippedOrders.per_page}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        {order.name}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800 flex items-center">
                                                        <FaPesoSign className="mr-2" />
                                                        {order.amount}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <span className="bg-blue-200  text-blue-800 text-medium font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                                                            To Ship
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <Link href={route(
                                                            "seller.OrderDetails",
                                                            { id: order.id }
                                                        )}>
                                                            <button className="px-4 py-1 flex items-center  bg-slate-800 text-slate-50 rounded-md">
                                                                <AiOutlineEye className="mr-2" />
                                                                <span>View</span>
                                                            </button>{" "}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                            )
                                        ) : (
                                            < tr >
                                                <td
                                                    colSpan={5}
                                                    className="py-4 px-6 text-slate-800 text-center text-sm "
                                                >
                                                    No to ship  orders found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout >
    );
}
