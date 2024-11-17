import { useState } from "react";
import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import { FaPesoSign } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function SalesReport({ auth }) {
    const { user } = auth;
    const { monthlySalesReport, totalContributionForCurrentMonth } = usePage().props;
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const filteredReports = monthlySalesReport?.filter((data) => {
        const reportMonth = new Date(data.created_at).getMonth() + 1;
        return reportMonth === selectedMonth;
    }) || [];

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <div className="w-full h-auto p-6 shadow-lg bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl printable-area">
                    <div className="p-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-primary">Sales Reports</h2>
                            <div className="flex items-center space-x-4">
                                <select
                                    className="border cursor-pointer border-primary rounded-md bg-transparent px-6 py-0.5 text-primary"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center border border-primary rounded-md text-md text-primary px-3 py-0.5"
                                >
                                    <IoPrintOutline className="mr-2" /> Print
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Sellers</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Total Sales</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Quantity Sold</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Sustainability Contribution (4%)</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white divide-y divide-gray-200">
                                    {filteredReports.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-primary">
                                                No data available for the selected month.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredReports.map((data, index) => (
                                            <tr key={index} className="text-xs transition duration-200 ease-in-out hover:bg-slate-50 whitespace-nowrap">
                                                <td className="px-6 py-4 font-medium text-primary">{data.seller.name}</td>
                                                <td className="flex items-center px-6 py-4 text-gray-600">
                                                    <FaPesoSign className="mr-1 text-gray-500" />
                                                    {data.total_net_sales.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.total_solds}
                                                </td>
                                                <td className="flex items-center px-6 py-4 text-gray-600">
                                                    <FaPesoSign className="mr-1 text-green-500" />
                                                    {data.total_contribution.toFixed(2)}
                                                </td>
                                                <th className="font-normal py-4 px-6 text-gray-600 uppercase">
                                                    {new Date(data.created_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </th>
                                                <td className="py-4 px-7">
                                                    <Link href={route('admin.salesReportIndividual', { id: data.id })} className="flex items-center justify-center px-3 py-1 font-medium text-blue-500 rounded-full bg-blue-100">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-between p-6 font-bold text-gray-800 rounded-b-lg bg-slate-200">
                                <h3 className="text-gray-700 text-md">Total Sustainability Contribution:</h3>
                                <p className="flex items-center text-lg text-green-600">
                                    <FaPesoSign className="mr-1" />
                                    {totalContributionForCurrentMonth}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}