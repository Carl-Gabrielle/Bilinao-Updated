import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import { FaPesoSign } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

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

    const totalCommission = sellersData.reduce((total, seller) => {
        return total + seller.products.reduce((productTotal, product) => {
            return productTotal + calculateCommission(product.price, product.quantitySold);
        }, 0);
    }, 0);

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <div className="w-full h-auto p-6 bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg printable-area">
                    <div className="p-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-semibold text-xl text-primary">Sales Reports</h2>
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
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Seller</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity Sold</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sustainability Contribution (4%)</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {sellersData.map((seller, sellerIndex) => (
                                        seller.products.map((product, productIndex) => (
                                            <tr key={`${sellerIndex}-${productIndex}`} className="hover:bg-slate-50 transition duration-200 ease-in-out text-xs whitespace-nowrap">
                                                <td className="py-4 px-6 text-gray-800 font-medium">{seller.name}</td>
                                                <td className="py-4 px-6 text-gray-600">{product.name}</td>
                                                <td className="py-4 px-6 text-gray-600 flex items-center">
                                                    <FaPesoSign className="mr-1 text-gray-500" />
                                                    {product.price.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">{product.quantitySold}</td>
                                                <td className="py-4 px-6 text-gray-600 flex items-center">
                                                    <FaPesoSign className="mr-1 text-green-500" />
                                                    {calculateCommission(product.price, product.quantitySold).toFixed(2)}
                                                </td>
                                                <td className="py-4 px-7">
                                                    <Link href={route('admin.salesReportIndividual')} className="flex items-center justify-center font-medium bg-blue-50 text-blue-500 py-1 px-3 rounded-full">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-6 bg-slate-200 text-gray-800 font-bold rounded-b-lg flex justify-between items-center">
                                <h3 className="text-md text-gray-700">Total Sustainability Contribution:</h3>
                                <p className="text-lg flex items-center text-green-600">
                                    <FaPesoSign className="mr-1" />
                                    {totalCommission.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
