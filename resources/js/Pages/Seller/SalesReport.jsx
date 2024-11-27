import SellerLayout from "@/Layouts/SellerLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaPesoSign } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";
import { animateText } from '@/gsap';
import { GoTrophy } from "react-icons/go";
import { CiMedal } from "react-icons/ci";

export default function SalesReport({ auth }) {
    const { user } = auth;
    const { data, totalContribution } = usePage().props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            animateText();
        }
    }, [loading]);

    const sortedData = [...data].sort((a, b) => b.solds - a.solds);

    return (
        <SellerLayout user={user}>
            <Head title="Sales Report" />
            <div className="px-6 py-4 printable-area">
                <div className="w-full h-auto p-6 shadow-lg bg-slate-50 rounded-3xl dashboard-card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">Daily Sales Report</h2>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center bg-green-600 rounded-md text-md text-white px-6 py-1"
                        >
                            <IoPrintOutline className="mr-2" /> Print
                        </button>
                    </div>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full rounded-lg">
                            <thead className="bg-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase text-nowrap">Top Products</th>
                                    <th className="px-6 py-4 text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase">Product Name</th>
                                    <th className="px-6 py-4 text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase text-nowrap">Net Pay</th>
                                    <th className="px-6 py-4 text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase text-nowrap">Quantity Sold</th>
                                    <th className="px-6 py-4 text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase text-nowrap">Revenue Share (4%)</th>
                                    <th className="px-6 py-4  text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase">Date</th>
                                    <th className="px-6 py-4 text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm bg-white divide-y divide-gray-200">
                                {sortedData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-gray-600">
                                            No sales data available at the moment.
                                        </td>
                                    </tr>
                                ) : (
                                    sortedData.map((item, index) => (
                                        <tr key={index} className="text-xs hover:bg-gray-50 transition-colors duration-300 ease-in-out whitespace-nowrap">
                                            <td className="px-6 py-4">
                                                {index + 1 === 1 && (
                                                    <GoTrophy className="mr-2 text-yellow-500" size={20} />
                                                )}
                                                {index + 1 === 2 && (
                                                    <CiMedal className="mr-2 text-slate-500" size={20} />
                                                )}
                                                {index + 1 === 3 && (
                                                    <CiMedal className="mr-2 text-amber-900" size={20} />
                                                )}
                                                {index + 1 > 3 && <span className="mr-2 font-medium">#{index + 1}</span>}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-primary">
                                                <IoPricetagsOutline className="inline-block mr-1" />
                                                {item.order_items.product.name}
                                            </td>
                                            <td className="flex items-center px-6 py-4 text-gray-600">
                                                <FaPesoSign className="mr-1 text-gray-500" />
                                                {Math.round(item.net_sales_amount)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.solds}</td>
                                            <td className="flex items-center px-6 py-4 text-gray-600">
                                                <FaPesoSign className="mr-1 text-green-500" />
                                                {Math.round(item.contribution)}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-primary">
                                                {new Date(item.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`py-1 px-3 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div className="flex items-center  p-6 font-medium text-gray-800">
                            <h3 className="text-gray-700 text-sm font-semibold">Total Revenue Share:</h3>
                            <p className="flex items-center text-md text-green-600">
                                <FaPesoSign className="mr-1 " />
                                {Math.round(totalContribution)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
