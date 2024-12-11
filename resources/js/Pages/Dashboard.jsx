import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsBasket2 } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdProductionQuantityLimits } from "react-icons/md";
import CustomerContainer from "@/Components/CustomerContainer";
import DivContainer from "@/Components/DivContainer";
import WelcomeImg from ".//Illustrations/welcomeImg.png";
import DashboardCard from "../Components/DashboardCard";
import SalesMetricsChart from "@/Components/SalesMetricsChart";
import { GoTrophy } from "react-icons/go";
import { FaPesoSign } from "react-icons/fa6";
import { CiMedal } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
export default function AdminDashboard({ auth, sellerCount, customerCount, salesData, topProducts }) {
    const { user } = auth;

    const getGreeting = () => {
        const hour = new Date().getHours();
        const greetings = [
            { range: [5, 12], message: "Good Morning" },
            { range: [12, 17], message: "Good Afternoon" },
            { range: [17, 21], message: "Good Evening" },
            { range: [21, 24], message: "Good Night" },
            { range: [0, 5], message: "Good Night" },
        ];
        return greetings.find(
            (greeting) => hour >= greeting.range[0] && hour < greeting.range[1]
        ).message;
    };

    const greeting = getGreeting();

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />
            <div className="min-h-screen">
                <DivContainer>
                    <h1 className="text-xl tracking-wider">
                        {greeting}, <span className="font-semibold">{user.name}</span>
                    </h1>
                    <hr className="mt-4 border-gray-400 mb-5" />
                    <div className="w-full h-screen">
                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                            <DashboardCard>
                                <div>
                                    <h1 className="text-md font-medium hidden sm:block">
                                        Hi
                                        <span className="ml-1 font-semibold ">
                                            {user.name},
                                        </span>{" "}
                                    </h1>
                                    <h1 className=" text-sm">
                                        Welcome Back to Admin Panel!
                                    </h1>
                                </div>
                                <img
                                    className="size-16 object-cover"
                                    src={WelcomeImg}
                                    alt="Welcome Img."
                                />
                            </DashboardCard>
                            <DashboardCard>
                                <h1 className="font-semibold">Registered Sellers</h1>
                                <div className="bg-green-200 px-4 py-0.5 rounded-md">
                                    <span className="text-2xl font-semibold text-green-600">{sellerCount}</span>
                                </div>
                            </DashboardCard>
                            <DashboardCard>
                                <h1 className="font-semibold">Registered Customers</h1>
                                <div className="bg-blue-200 px-4 py-0.5 rounded-md">
                                    <span className="text-2xl font-semibold text-blue-600">{customerCount}</span>
                                </div>
                            </DashboardCard>
                        </div>
                        {/* Top Sellers and Products */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                            {/* Top Sellers */}
                            <DashboardCard className=" flex flex-col">
                                <h1 className="font-semibold text-lg mb-4">Top Sellers of the Month</h1>
                                <table className="table-auto w-full text-sm text-left border-collapse">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-4 py-2 font-medium text-slate-500">Rank</th>
                                            <th className="px-4 py-2 font-medium text-gray-500">Seller</th>
                                            <th className="px-4 py-2 font-medium text-gray-500">Net Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesData.map((data, index) => (
                                            <tr
                                                key={data.seller_id}
                                                className={`border-b ${index % 2 === 0 ? "bg-transparent" : "bg-gray-50"
                                                    } hover:bg-gray-100 transition-colors duration-300 ease-in-out`}
                                            >
                                                <td className="px-4 py-2 flex items-center">
                                                    {index + 1 === 1 && (
                                                        <GoTrophy className="mr-2 text-yellow-500" size={20} />
                                                    )}
                                                    {index + 1 === 2 && (
                                                        <CiMedal className="mr-2 text-gray-500" size={20} />
                                                    )}
                                                    {index + 1 === 3 && (
                                                        <CiMedal className="mr-2 text-amber-700" size={20} />
                                                    )}
                                                    {index + 1 > 3 && (
                                                        <span className="mr-2 text-gray-600">#{index + 1}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-xs">
                                                    {data.seller ? data.seller.name : "Unknown Seller"}
                                                </td>
                                                <td className="px-4 py-2 flex items-center text-xs">
                                                    <FaPesoSign className="mr-1" />
                                                    {data.total_net_sales.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </DashboardCard>
                            {/* Top Products */}
                            <DashboardCard className="flex flex-col">
                                <h1 className="font-semibold">Top Products of the Month</h1>
                                <table className="table-auto w-full mt-4 text-sm text-left border-collapse">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-4 py-2 font-medium text-slate-500">Product</th>
                                            <th className="px-4 py-2 font-medium text-gray-500">Seller</th>
                                            <th className="px-4 py-2 font-medium text-gray-500">Sold</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topProducts.map((product, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-100">
                                                <td className="px-4 py-2 flex items-center"><IoPricetagsOutline className="mr-2" /> {product.product_name}</td>
                                                <td className="px-4 py-2">{product.seller_name}</td>
                                                <td className="px-4 py-2">{product.total_sold}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </DashboardCard>
                        </div>
                    </div>
                </DivContainer>
            </div >
        </AuthenticatedLayout >
    );
}
