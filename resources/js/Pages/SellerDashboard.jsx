import React from "react";
import { Head } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import { usePage } from "@inertiajs/react";
import WelcomeImg from ".//Illustrations/welcomeImg.png";
import DashboardCard from "@/Components/DashboardCard";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const SellerDashboard = ({ productCount, orderCount }) => {
    const { props } = usePage();
    const user = props.auth.user;

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

    const orderStatusCounts = {
        recent: 10,
        processing: 15,
        toShip: 5,
        arriving: 8,
        outForDelivery: 3,
        completed: 20,
    };

    const barChartData = {
        labels: ['Recent', 'Processing', 'To Ship', 'Arriving', 'Out for Delivery', 'Completed'],
        datasets: [
            {
                label: 'Orders by Status',
                data: [
                    orderStatusCounts.recent,
                    orderStatusCounts.processing,
                    orderStatusCounts.toShip,
                    orderStatusCounts.arriving,
                    orderStatusCounts.outForDelivery,
                    orderStatusCounts.completed,
                ],
                backgroundColor: 'rgb(77 124 15)',
                borderColor: '#ffffff',
                borderWidth: 1,
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                label: 'Order Completion',
                data: [orderStatusCounts.completed, orderCount - orderStatusCounts.completed],
                backgroundColor: ['rgb(21 128 61)', 'rgb(51 65 85)'],
                borderColor: '#ffffff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <SellerLayout user={user}>
            <Head title="Seller Dashboard" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-xl">
                    {greeting},{" "}
                    <span className="font-semibold">{user.name}</span>
                </h1>
                <hr className="mt-4 border-slate-500" />
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                    <DashboardCard>
                        <div>
                            <h1>
                                Hi,
                                <span className="font-semibold">
                                    {" "}
                                    {user.name}
                                </span>
                            </h1>
                            <h1 className="text-sm mt-2">
                                Welcome Back to Seller Center!
                            </h1>
                        </div>
                        <img
                            className="size-16 object-cover"
                            src={WelcomeImg}
                            alt="Welcome Img."
                        />
                    </DashboardCard>
                    <DashboardCard>
                        <h1 className="font-semibold">Total Products</h1>
                        <div className="bg-green-200 px-4 py-0.5 rounded-md"><span className="text-2xl font-semibold text-green-600">{productCount}</span></div>
                    </DashboardCard>
                    <DashboardCard>
                        <h1 className="font-semibold">Total Orders</h1>
                        <div className="bg-blue-200 px-4 py-0.5 rounded-md"><span className="text-2xl font-semibold text-blue-600">{orderCount}</span></div>
                    </DashboardCard>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-10">
                    <DashboardCard>
                        <div className="w-full h-full">
                            <h1 className="font-medium text-md">Order Status Distribution</h1>
                            <div className="flex justify-center ">
                                <div className="w-auto max-w-lg h-[200px]">
                                    <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                    <DashboardCard>
                        <div className="w-full h-full">
                            <h1 className="font-medium text-md ">Order Completion Status</h1>
                            <div className="flex justify-center ">
                                <div className="w-full max-w-lg h-[200px]">
                                    <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div >
        </SellerLayout >
    );
};

export default SellerDashboard;
