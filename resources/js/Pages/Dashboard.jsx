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
export default function AdminDashboard({ auth, sellerCount, customerCount }) {
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="min-h-screen  ">
                <DivContainer>
                    <h1 className="text-xl tracking-wider">
                        {greeting},{" "}
                        <span className="font-semibold">{user.name}</span>
                    </h1>
                    <hr className="mt-4 border-gray-400 mb-5" />
                    <div className="w-full h-screen   ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="w-full h-32 px-6 py-6 bg-slate-50 bg-opacity-80 backdrop-blur-lg  rounded-3xl shadow-md">
                                <h1 className="text-md font-medium hidden sm:block">
                                    Hi
                                    <span className="ml-1 font-semibold ">
                                        {user.name},
                                    </span>{" "}
                                </h1>
                                <h1 className="font-medium text-md">
                                    Welcome Back!
                                </h1>
                            </div>
                            <div className="w-full h-32 px-6 py-6 bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg flex items-center justify-between">
                                <div>
                                    <h1 className="font-medium text-md">
                                        Registered Sellers
                                    </h1>
                                    <p className="mt-2 text-4xl font-bold text-gray-900">
                                        {sellerCount}
                                    </p>
                                </div>
                                <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
                                    <HiOutlineShoppingBag className="size-6" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                            <div className="w-full h-32 px-6 py-6 bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg flex items-center justify-between">
                                <div>
                                    <h1 className="font-medium text-md">
                                        Registered Customers
                                    </h1>
                                    <p className="mt-2 text-4xl font-bold text-gray-900">
                                        {customerCount}
                                    </p>
                                </div>
                                <div className="bg-green-100 text-green-500 p-4 rounded-full">
                                    <HiOutlineUserGroup className="size-6" />
                                </div>
                            </div>
                            <div className="w-full h-32 px-6 py-6  bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-md">
                                {/* Total Sales Revenue */}
                                {/* Daily/Weekly/Monthly Sales Trends:  */}
                                <h1 className="font-medium text-md">
                                    Sales Metrics{" "}
                                </h1>
                            </div>
                        </div>
                    </div>
                </DivContainer>
            </div>
        </AuthenticatedLayout>
    );
}
