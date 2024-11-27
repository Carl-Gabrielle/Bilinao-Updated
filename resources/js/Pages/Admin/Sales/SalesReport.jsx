import { useState } from "react";
import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import { FaPesoSign } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { CiMedal } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function SalesReport({ auth }) {
    const { user } = auth;
    const { monthlySalesReport, totalContributionForCurrentMonth } = usePage().props;
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const filteredReports = monthlySalesReport
        ?.filter((data) => {
            const reportMonth = new Date(data.created_at).getMonth() + 1;
            return reportMonth === selectedMonth;
        })
        .sort((a, b) => b.total_net_sales - a.total_net_sales) || [];
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <div className="w-full h-auto p-6 shadow-lg bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl printable-area">
                    <div className="p-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-primary">Monthly Sales Report</h2>
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
                                    className="flex items-center bg-green-600 rounded-md text-md text-white px-6 py-1"
                                >
                                    <IoPrintOutline className="mr-2" /> Print
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase text-nowrap">Top Sellers</th>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase  text-nowrap">Sellers</th>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase  text-nowrap">Net Sales</th>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase  text-nowrap">Quantity Sold</th>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase  text-nowrap">Revenue Share (4%)</th>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase  text-nowrap">Date</th>
                                        <th className="px-6 py-4  text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase  text-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white divide-y divide-gray-200">
                                    {filteredReports.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-primary">
                                                No data available for the selected month.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredReports.map((data, index) => (
                                            <tr key={index} className="text-xs transition duration-200 ease-in-out hover:bg-slate-50 whitespace-nowrap">
                                                <td className="px-6 py-4 flex items-center font-medium">
                                                    {index + 1 === 1 && (
                                                        <GoTrophy className="mr-2 text-yellow-500" size={20} />
                                                    )}
                                                    {index + 1 === 2 && (
                                                        <CiMedal className="mr-2 text-slate-500" size={20} />
                                                    )}
                                                    {index + 1 === 3 && (
                                                        <CiMedal className="mr-2 text-amber-900" size={20} />
                                                    )}
                                                    {index + 1 > 3 && <span className="mr-2">#{index + 1}</span>}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-primary">{data.seller.name}</td>
                                                <td className="flex items-center px-6 py-4 text-gray-600">
                                                    <FaPesoSign className="mr-1 text-gray-500" />
                                                    {Math.round(data.total_net_sales)}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{data.total_solds}</td>
                                                <td className="flex items-center px-6 py-4 text-gray-600">
                                                    <FaPesoSign className="mr-1 text-green-500" />
                                                    {Math.round(data.total_contribution)}
                                                </td>
                                                <th className="px-6 py-4 font-medium text-primary">
                                                    {new Date(data.created_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </th>
                                                <td className="py-4 px-7">
                                                    <Link href={route('admin.salesReportIndividual', { id: data.id })} className="flex items-center justify-center px-6 py-1 font-medium text-blue-500 rounded-full bg-blue-100">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="flex items-center  p-6 font-medium text-gray-800 ">
                                <h3 className="text-gray-700 text-sm font-semibold">Total Revenue Share:</h3>
                                <p className="flex items-center text-md text-green-600">
                                    <FaPesoSign className="mr-1" />
                                    {totalContributionForCurrentMonth}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout >
    );
}
