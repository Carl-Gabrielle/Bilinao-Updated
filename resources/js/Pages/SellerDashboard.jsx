import React from "react";
import { Head } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import { usePage } from "@inertiajs/react";

const SellerDashboard = () => {
    const { props } = usePage();
    const user = props.auth.user;

    return (
        <SellerLayout user={user}>
            <Head title="Seller Dashboard" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold">
                    Welcome to Your Dashboard
                </h1>
                <p className="mt-4">
                    Here you can manage your products, view sales, and more.
                </p>
            </div>
        </SellerLayout>
    );
};

export default SellerDashboard;
