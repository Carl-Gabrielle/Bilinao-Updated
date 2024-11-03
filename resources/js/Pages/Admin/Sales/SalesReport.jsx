import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import { FaPesoSign } from "react-icons/fa6";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

// Sample data
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

// Commission calculation function
const calculateCommission = (price, quantitySold) => {
    return (price * quantitySold) * 0.04;
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
                <div className="w-full h-auto">
                    <div className="bg-slate-50 bg-opacity-80  backdrop-blur-lg     overflow-hidden shadow-sm rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-medium text-xl text-gray-800 leading-tight">Sales Reports</h2>
                        </div>
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full border border-gray-300 rounded-lg">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Seller</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity Sold</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sustainability Contribution (4%)</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {sellersData.map((seller, sellerIndex) => (
                                        seller.products.map((product, productIndex) => (
                                            <tr key={`${sellerIndex}-${productIndex}`} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                                                <td className="py-2 px-4 text-gray-800">{seller.name}</td>
                                                <td className="py-2 px-4  text-gray-600">{product.name}</td>
                                                <td className="py-2 px-4  text-gray-600 flex items-center">
                                                    <FaPesoSign className="mr-1" />
                                                    {product.price.toFixed(2)}
                                                </td>
                                                <td className="py-2 px-4 text-gray-600">{product.quantitySold}</td>
                                                <td className="py-2 px-4  text-gray-600 flex items-center">
                                                    <FaPesoSign />
                                                    {calculateCommission(product.price, product.quantitySold).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 bg-gray-100 text-gray-800  font-semibold rounded-b-lg flex justify-between items-center">
                                <h3 className=" text-lg">Total Sales:</h3>
                                <p className="text-xl flex items-center">
                                    <FaPesoSign />
                                    {totalCommission.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout >
    );
}
