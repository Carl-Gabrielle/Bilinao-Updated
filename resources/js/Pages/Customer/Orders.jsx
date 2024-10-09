import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import OrderStatus from "./OrderStatus";
import ToPay from "./ToPay";
import ToShip from "./ToShip";
import Pending from "./Pending";
import ToReceive from "./ToReceive";
import Received from "./Received";

const Orders = ({ auth }) => {
    const [activeStatus, setActiveStatus] = useState("Pending");

    const handleStatusClick = (status) => {
        setActiveStatus(status);
    };

    const renderOrderDetails = () => {
        switch (activeStatus) {
            case "Pending":
                return <Pending />;
            case "To Pay":
                return <ToPay />;
            case "To Ship":
                return <ToShip />;
            case "To Receive":
                return <ToReceive />;
            case "Received":
                return <Received />;
            default:
                return <Pending />;
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
                    <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                        <OrderStatus
                            title="Pending"
                            isActive={activeStatus === "Pending"}
                            onClick={() => handleStatusClick("Pending")}
                        />
                        <OrderStatus
                            title="To Pay"
                            isActive={activeStatus === "To Pay"}
                            onClick={() => handleStatusClick("To Pay")}
                        />
                        <OrderStatus
                            title="To Ship"
                            isActive={activeStatus === "To Ship"}
                            onClick={() => handleStatusClick("To Ship")}
                        />
                        <OrderStatus
                            title="To Receive"
                            isActive={activeStatus === "To Receive"}
                            onClick={() => handleStatusClick("To Receive")}
                        />
                        <OrderStatus
                            title="Received"
                            isActive={activeStatus === "Received"}
                            onClick={() => handleStatusClick("Received")}
                        />
                    </div>

                    <div className="bg-slate-50 bg-opacity-65 backdrop-blur-lg p-6 rounded-lg shadow-md text-slate-900">
                        {renderOrderDetails()}
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

export default Orders;
