import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";

import {
    FaMoneyCheckAlt,
    FaCheckCircle,
    FaShippingFast,
    FaBoxOpen,
} from "react-icons/fa";
import CustomerContainer from "@/Components/CustomerContainer";
import ToPay from "./Topay";
import ToShip from "./ToShip";
import ToReceive from "./ToReceive";
import Received from "./Received";

const Orders = ({ auth }) => {
    const [activeStatus, setActiveStatus] = useState("To Pay");

    const handleStatusClick = (status) => {
        setActiveStatus(status);
    };

    const renderOrderDetails = () => {
        switch (activeStatus) {
            case "To Pay":
                return <ToPay />;
            case "To Ship":
                return <ToShip />;
            case "To Receive":
                return <ToReceive />;
            case "Received":
                return <Received />;
            default:
                return <ToPay />;
        }
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="My Orders" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="My Orders" />
                <CustomerContainer>
                    <div className="mb-6">
                        <p className="text-xs text-slate-900">
                            Below is a list of your current order statuses.
                            Click on each status to filter and view the
                            corresponding orders.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <OrderStatus
                            title="To Pay"
                            icon={<FaMoneyCheckAlt size={16} />}
                            isActive={activeStatus === "To Pay"}
                            onClick={() => handleStatusClick("To Pay")}
                        />
                        <OrderStatus
                            title="To Ship"
                            icon={<FaShippingFast size={16} />}
                            isActive={activeStatus === "To Ship"}
                            onClick={() => handleStatusClick("To Ship")}
                        />
                        <OrderStatus
                            title="To Receive"
                            icon={<FaBoxOpen size={16} />}
                            isActive={activeStatus === "To Receive"}
                            onClick={() => handleStatusClick("To Receive")}
                        />
                        <OrderStatus
                            title="Received"
                            icon={<FaCheckCircle size={16} />}
                            isActive={activeStatus === "Received"}
                            onClick={() => handleStatusClick("Received")}
                        />
                    </div>

                    <div className="bg-slate-50  bg-opacity-60 backdrop-blur-lg p-6 rounded-lg shadow-md text-slate-900">
                        {renderOrderDetails()}
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

const OrderStatus = ({ title, icon, isActive, onClick }) => {
    return (
        <div
            className={`flex  justify-center items-center text-center  p-3 rounded-md cursor-pointer transition-colors duration-300 ${
                isActive
                    ? "bg-slate-800 text-white"
                    : "bg-slate-50  bg-opacity-60 backdrop-blur-lg hover:bg-slate-100"
            }`}
            onClick={onClick}
        >
            <span className="mr-2"> {icon}</span>
            <span className="mt-1 text-xs font-medium">{title}</span>
        </div>
    );
};

export default Orders;
