import React from "react";
import { Head, Link } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";

export default function CompletedOrder({ auth }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Order Completed " />
            <div className="min-h-screen  pt-20 pb-1  ">
                <Banner title="Order Completed" />
                <CustomerContainer className="mt-32">
                    <h1>Complete Order</h1>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
