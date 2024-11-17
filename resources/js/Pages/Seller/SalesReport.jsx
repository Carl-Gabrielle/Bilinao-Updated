import SellerLayout from "@/Layouts/SellerLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaPesoSign } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";

export default function SalesReport({ auth }) {
    const { user } = auth;
    const { data, totalContribution } = usePage().props;

    return (
        <SellerLayout user={user}>
            <Head title="Sales Report" />
            <div className="px-6 py-4 printable-area">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales Report</h2>
                <div className="w-full h-auto p-6 shadow-lg bg-white rounded-lg">
                    <div className="flex  items-center justify-end mb-6">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center border border-primary rounded-md text-md text-primary px-3 py-0.5"
                        >
                            <IoPrintOutline className="mr-2" /> Print
                        </button>
                    </div>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Product Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Net Pay</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Quantity Sold</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Sustainability Contribution (4%)</th>
                                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm bg-white divide-y divide-gray-200">
                                {data.map((item, index) => (
                                    <tr key={index} className="text-xs hover:bg-gray-50  transition-colors duration-300 ease-in-out whitespace-nowrap">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            <IoPricetagsOutline className="inline-block mr-1" />
                                            {item.order_items.product.name}
                                        </td>
                                        <td className="flex items-center px-6 py-4 text-gray-600">
                                            <FaPesoSign className="mr-1 text-gray-500" />
                                            {item.net_sales_amount}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{item.solds}</td>
                                        <td className="flex items-center px-6 py-4 text-gray-600">
                                            <FaPesoSign className="mr-1 text-green-500" />
                                            {item.contribution}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`py-1 px-3 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between p-6 font-bold text-gray-800 rounded-b-lg bg-gray-100">
                            <h3 className="text-gray-700 text-md">Total Sustainability Contribution:</h3>
                            <p className="flex items-center text-lg text-green-600">
                                <FaPesoSign className="mr-1" />
                                {totalContribution !== null && totalContribution.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
