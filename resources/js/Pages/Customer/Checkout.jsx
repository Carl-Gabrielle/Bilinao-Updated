import React, { useState } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import { Head } from "@inertiajs/react";
import BillingInput from "@/Components/BillingInput";

export default function Checkout({ auth }) {
    const { user } = auth;

    const [billingDetails, setBillingDetails] = useState({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [id]: value,
        });
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Checkout" />
            <div className="min-h-screen  pt-20 pb-1 ">
                <Banner title="Shopping Cart" suffix="/Checkout" />
                <CustomerContainer className="mt-32">
                    <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide ">
                        Billing Details
                    </h1>
                    <div className="py-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-3 ">
                            <BillingInput
                                label="Name"
                                value={billingDetails.name}
                                onChange={handleInputChange}
                            />
                            <BillingInput
                                label="Phone Number"
                                value={billingDetails.phone}
                                onChange={handleInputChange}
                            />
                            <BillingInput
                                label="Address"
                                value={billingDetails.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full lg:w-96 rounded-2xl flex flex-col min-h-full">
                            <div className="py-4 px-6 bg-slate-700 text-white rounded-t-2xl">
                                <span className="uppercase text-xs flex-1">
                                    Order Summary
                                </span>
                            </div>
                            <div className="bg-white">
                                <span>Total</span>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
