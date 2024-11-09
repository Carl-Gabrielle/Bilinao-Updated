import DivContainer from "@/Components/DivContainer";
import { FaPesoSign } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
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

    const sellerData = sellersData[0];

    const totalCommission = sellerData.products.reduce((total, product) => {
        return total + calculateCommission(product.price, product.quantitySold);
    }, 0);

    const [products, setProducts] = useState(sellerData.products);

    const toggleStatus = (index) => {
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[index].status = updatedProducts[index].status === "Paid" ? "Pending" : "Paid";
            return updatedProducts;
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <Link
                    href={route("admin.salesReport")}
                    className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-1 rounded-full font-semibold"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="w-full h-auto p-6 bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg">
                    <div className="p-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-semibold text-xl text-primary">Sales Report of {sellerData.name}</h2>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity Sold</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sustainability Contribution (4%)</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {products.map((product, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition duration-200 ease-in-out text-xs whitespace-nowrap">
                                            <td className="py-4 px-6 text-gray-800 font-medium">{product.name}</td>
                                            <td className="py-4 px-6 text-gray-600 flex items-center">
                                                <FaPesoSign className="mr-1 text-gray-500" />
                                                {product.price.toFixed(2)}
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{product.quantitySold}</td>
                                            <td className="py-4 px-6 text-gray-600 flex items-center">
                                                <FaPesoSign className="mr-1 text-green-500" />
                                                {calculateCommission(product.price, product.quantitySold).toFixed(2)}
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{product.status}</td>
                                            <td className="py-4 px-7">
                                                <button
                                                    onClick={() => toggleStatus(index)}
                                                    className={`flex items-center justify-center border ${product.status === "Paid" ? "border-green-600 text-green-600" : "border-red-600 text-red-600"
                                                        } py-1 px-3 rounded-full`}
                                                >
                                                    {product.status === "Paid" ? "Mark Unpaid" : "Mark Paid"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-6 bg-slate-200 text-gray-800 font-bold rounded-b-lg flex justify-between items-center">
                                <h3 className="text-md text-gray-700">Total Sustainability Contribution:</h3>
                                <p className="text-lg flex items-center text-green-600">
                                    <FaPesoSign className="mr-1" />
                                    {/* {totalCommission.toFixed(2)} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
