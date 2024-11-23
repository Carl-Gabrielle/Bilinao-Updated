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

export default function AdminDashboard({ auth, sellerCount, customerCount, salesData = [] }) {
    const { user } = auth;

    const safeSalesData = salesData.filter(data => data?.seller && data?.total_net_sales !== undefined && data?.total_contribution !== undefined);

    const netSalesData = {
        labels: safeSalesData.length ? safeSalesData.map((data) => data.seller.name) : ["No Data"],
        datasets: [
            {
                label: "Net Sales",
                data: safeSalesData.length ? safeSalesData.map((data) => data.total_net_sales) : [0],
                backgroundColor: "rgba(75, 124, 15)",
                borderColor: '#ffffff',
                borderWidth: 1,
            },
        ],
    };

    const contributionData = {
        labels: safeSalesData.length ? safeSalesData.map((data) => data.seller.name) : ["No Data"],
        datasets: [
            {
                label: "Total Contribution",
                data: safeSalesData.length ? safeSalesData.map((data) => data.total_contribution) : [0],
                backgroundColor: "rgb(51 65 85)",
                borderColor: '#ffffff',
                borderWidth: 1,
            },
        ],
    };

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
                        {greeting},{" "}
                        <span className="font-semibold">{user.name}</span>
                    </h1>
                    <hr className="mt-4 border-gray-400 mb-5" />
                    <div className="w-full h-screen   ">
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
                                <h1 className="font-semibold">
                                    Registered Sellers
                                </h1>
                                <div className="bg-green-200 px-4 py-0.5 rounded-md"><span className="text-2xl font-semibold text-green-600">{sellerCount}</span></div>
                            </DashboardCard>
                            <DashboardCard >
                                <h1 className="font-semibold">
                                    Registered Customers
                                </h1>
                                <div className="bg-blue-200 px-4 py-0.5 rounded-md"><span className="text-2xl font-semibold text-blue-600">{customerCount}</span></div>
                            </DashboardCard>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                            <DashboardCard title="Net Sales by Seller">
                                <SalesMetricsChart data={netSalesData} title="Net Sales by Seller" />
                            </DashboardCard>
                            <DashboardCard title="Total Contribution by Seller">
                                <SalesMetricsChart data={contributionData} title="Total Contribution by Seller" />
                            </DashboardCard>
                        </div>
                    </div>
                </DivContainer>
            </div>
        </AuthenticatedLayout >
    );
}
