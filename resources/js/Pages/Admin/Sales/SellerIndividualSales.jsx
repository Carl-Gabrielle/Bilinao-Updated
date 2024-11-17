import DivContainer from "@/Components/DivContainer";
import { FaPesoSign } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const sellersData = [
    {
        name: "Seller 1",
        products: [
            { name: "Product A", price: 50, quantitySold: 10, status: "Paid" },
            { name: "Product B", price: 100, quantitySold: 5, status: "Pending" },
        ],
    },
];

const calculateCommission = (price, quantitySold) => {
    return price * quantitySold * 0.04;
};

export default function SellerIndividualSales({ auth }) {
    const { user } = auth;
    const { data, totalContribution } = usePage().props;
    console.log(data)
    const [processing, setProcessing] = useState(false);
    const sellerData = sellersData[0];
    const [products, setProducts] = useState(sellerData.products);
    const toggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'Paid' ? 'To Pay' : 'Paid';
        Inertia.post(`/sales-report/${id}/toggle-status`, { status: newStatus }, {
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <Link
                    href={route("admin.salesReport")}
                    className="flex items-center px-6 py-1 mb-5 text-sm font-semibold rounded-full bg-slate-100 w-36"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="w-full h-auto p-6 shadow-lg bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl">
                    <div className="p-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-primary">Sales Report of {data[0].seller.name}</h2>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Product Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Net Pay</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Quantity Sold</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Sustainability Contribution (4%)</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white divide-y divide-gray-200">
                                    {data.map((item, index) => (
                                        <tr key={index} className="text-xs transition duration-200 ease-in-out hover:bg-slate-50 whitespace-nowrap">
                                            <td className="px-6 py-4 font-medium text-gray-800">{item.order_items.product.name}</td>
                                            <td className="flex items-center px-6 py-4 text-gray-600">
                                                <FaPesoSign className="mr-1 text-gray-500" />
                                                {item.net_sales_amount}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.solds}</td>
                                            <td className="flex items-center px-6 py-4 text-gray-600">
                                                <FaPesoSign className="mr-1 text-green-500" />
                                                {item.contribution}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <span className={`py-1 px-3 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} `}>{item.status} </span>
                                            </td>
                                            <td className="py-4 px-7">
                                                <button
                                                    onClick={() => toggleStatus(item.id, item.status)}
                                                    className={`flex items-center justify-center border ${item.status === "Paid" ? "border-green-600 text-green-600" : "border-red-600 text-red-600"
                                                        } py-1 px-3 rounded-full`}
                                                >
                                                    {item.status === "To Pay" ? (
                                                        <>
                                                            <FaPesoSign className="mr-2" /> Mark Paid
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTimesCircle className="mr-2" /> Mark Unpaid
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-between p-6 font-bold text-gray-800 rounded-b-lg bg-slate-200">
                                <h3 className="text-gray-700 text-md">Total Sustainability Contribution:</h3>
                                <p className="flex items-center text-lg text-green-600">
                                    <FaPesoSign className="mr-1" />
                                    {totalContribution !== null && totalContribution.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
