import React from "react";
import { Head } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import { usePage } from "@inertiajs/react";

const SellerDashboard = ({ productCount }) => {
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
    return (
        <SellerLayout user={user}>
            <Head title="Seller Dashboard" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-xl ">
                    {greeting},{" "}
                    <span className="font-semibold">{user.name}</span>
                </h1>
                <hr className="mt-4 border-slate-500" />
                <div className="grid grid-cols-2 lg:grid-cols-2 mt-5 gap-10">
                    <div className="bg-slate-200 w-full rounded-3xl p-5">
                        <div className="bg-slate-50 p-5 rounded-3xl">
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
                    </div>
                    <div className="bg-slate-200 w-full rounded-3xl p-5 shadow-lg">
                        <div className="bg-slate-50 p-5 rounded-3xl flex items-center justify-between ">
                            <h1 className=" font-semibold  ">Total Products</h1>
                            <span className="text-2xl font-semibold size-14   flex items-center justify-center">
                                {productCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
};

export default SellerDashboard;
