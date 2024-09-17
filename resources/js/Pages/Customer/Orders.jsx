import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";

import {
    FaMoneyCheckAlt,
    FaCheckCircle,
    FaShippingFast,
    FaBoxOpen,
    FaUndoAlt,
} from "react-icons/fa";
import CustomerContainer from "@/Components/CustomerContainer";

const Orders = ({ auth }) => {
    const [activeStatus, setActiveStatus] = useState("To Pay");

    const handleStatusClick = (status) => {
        setActiveStatus(status);
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="My Orders" />
            <div className="min-h-screen  pt-20 pb-1">
                <Banner title="My Orders" />
                <CustomerContainer>
                    <div className="mb-6">
                        <p className="text-xs text-slate-900">
                            Below is a list of your current order statuses.
                            Click on each status to filter and view the
                            corresponding orders
                        </p>
                    </div>
                    <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 mb-8">
                        <OrderStatus
                            title="To Pay"
                            icon={<FaMoneyCheckAlt size={20} />}
                            isActive={activeStatus === "To Pay"}
                            onClick={() => handleStatusClick("To Pay")}
                        />
                        <OrderStatus
                            title="To Ship"
                            icon={<FaShippingFast size={20} />}
                            isActive={activeStatus === "To Ship"}
                            onClick={() => handleStatusClick("To Ship")}
                        />
                        <OrderStatus
                            title="To Receive"
                            icon={<FaBoxOpen size={20} />}
                            isActive={activeStatus === "To Receive"}
                            onClick={() => handleStatusClick("To Receive")}
                        />
                        <OrderStatus
                            title="Received"
                            icon={<FaCheckCircle size={20} />}
                            isActive={activeStatus === "Received"}
                            onClick={() => handleStatusClick("Received")}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-slate-900">
                        <p>
                            Your order details will appear here based on the
                            selected status.
                        </p>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

const OrderStatus = ({ title, icon, isActive, onClick }) => {
    return (
        <div
            className={`flex flex-col items-center text-center px-3 py-3 rounded-md cursor-pointer transition-colors duration-300 ${
                isActive
                    ? "bg-slate-800 text-white"
                    : "bg-white hover:bg-gray-200"
            }`}
            onClick={onClick}
        >
            {icon}
            <span className="mt-1 text-xs font-medium">{title}</span>
        </div>
    );
};

export default Orders;
