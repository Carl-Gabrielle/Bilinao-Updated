import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import { FaPesoSign } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

const sellersData = [
    {
        name: "Seller 1",
        products: [
            { name: "Product A", price: 50, quantitySold: 10 },
            { name: "Product B", price: 100, quantitySold: 5 },
        ],
    },
    {
        name: "Seller 2",
        products: [
            { name: "Product C", price: 75, quantitySold: 8 },
            { name: "Product D", price: 200, quantitySold: 3 },
        ],
    },
];

const calculateCommission = (price, quantitySold) => {
    return price * quantitySold * 0.04;
};

export default function SalesReport({ auth }) {
    const { user } = auth;
    const { monthlySalesReport, totalContributionForCurrentMonth } = usePage().props;
    console.log(monthlySalesReport);

    const totalCommission = sellersData.reduce((total, seller) => {
        return total + seller.products.reduce((productTotal, product) => {
            return productTotal + calculateCommission(product.price, product.quantitySold);
        }, 0);
    }, 0);

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <div className="w-full h-auto p-6 shadow-lg bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl printable-area">
                    <div className="p-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-primary">Sales Reports</h2>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center border border-primary rounded-md text-md text-primary px-3 py-0.5"
                            >
                                <IoPrintOutline className="mr-2" /> Print
                            </button>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Seller</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Total Sales</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Quantity Sold</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Sustainability Contribution (4%)</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white divide-y divide-gray-200">
                                    {monthlySalesReport == null || monthlySalesReport.length == 0 ? (
                                        <>No data Yet.</>
                                    ) : (
                                        monthlySalesReport.map((data, index) => (
                                            <tr key={index} className="text-xs transition duration-200 ease-in-out hover:bg-slate-50 whitespace-nowrap">
                                                <td className="px-6 py-4 font-medium text-gray-800">{data.seller.name}</td>
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
                                                <td className="py-4 px-7">
                                                    <Link href={route('admin.salesReportIndividual', { id: data.id })} className="flex items-center justify-center px-3 py-1 font-medium text-blue-500 rounded-full bg-blue-50">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        )

                                        ))}
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
