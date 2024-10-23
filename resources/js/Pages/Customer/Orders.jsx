import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import OrderStatus from "./OrderStatus";
import ToPay from "./ToPay";
import ToShip from "./ToShip";
import ToReceive from "./ToReceive";
import Received from "./Received";

const Orders = ({ auth }) => {
    const [activeStatus, setActiveStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedStatus = localStorage.getItem("activeStatus");
        if (storedStatus) {
            setActiveStatus(storedStatus);
        } else {
            setActiveStatus("To Pay");
        }
        setLoading(false);
    }, []);

    const handleStatusClick = (status) => {
        setActiveStatus(status);
        // Store the active status in localStorage
        localStorage.setItem("activeStatus", status);
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
                return <Pending />;
        }
    };

    if (loading) {
        // Show loading spinner or placeholder while loading
        return (
            <CustomerLayout user={auth.user}>
                <Head title="My Orders" />
                <div className="min-h-screen pt-20 pb-1 flex justify-center items-center">
                    <div className="spinner">Loading...</div>{" "}
                    {/* Placeholder or spinner */}
                </div>
            </CustomerLayout>
        );
    }

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
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
