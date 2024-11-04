import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import OrderStatus from "./OrderStatus";
import ToPay from "./ToPay";
import ToShip from "./ToShip";
import ToReceive from "./ToReceive";
import Received from "./Received";

const Orders = ({ auth, orders = [] }) => {
    const toPayOrders = orders.filter(order => order.remarks == 'to pay')
    const toShipOrders = orders.filter(order => order.remarks === 'paid'
        && order.order_items.some(
            item => item.processing_date !== null && item.shipped_date == null && item.shipped_date == null && item.delivered_date == null
        )
    );

    const toReceiveOrders = orders.filter(order => order.remarks === 'paid'
        && order.order_items.some(
            item => item.processing_date || item.shipped_date || item.shipped_date && item.delivered_date == null
        )
    );

    const receivedOrders = orders.filter(order => order.remarks === 'paid'
        && order.order_items.some(
            item => item.processing_date && item.shipped_date && item.shipped_date && item.delivered_date
        )
    ); orders.filter(order => order.status === 'Received');

    const [activeStatus, setActiveStatus] = useState(() => {
        return localStorage.getItem("activeStatus") || "To Pay";
    });

    const handleStatusClick = (status) => {
        setActiveStatus(status);
        localStorage.setItem("activeStatus", status);
    };



    const renderOrderDetails = () => {
        const orderComponents = {
            "To Pay": <ToPay toPay={toPayOrders} />,
            "To Ship": <ToShip toShipData={toShipOrders} />,
            "To Receive": <ToReceive toReceiveData={toReceiveOrders} />,
            "Received": <Received toReceivedData={receivedOrders} />,
        };
        return orderComponents[activeStatus] || <div>No orders found for this status.</div>;
    };

    const orderStatuses = ["To Pay", "To Ship", "To Receive", "Received"];
    // LOADING SPINNER
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <CustomerLayout user={auth.user}>
                <Head title="My Orders" />
                <LoadingSpinner />
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
                            Below is a list of your current order statuses. Click on each status to filter and view the corresponding orders.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {orderStatuses.map((status) => (
                            <OrderStatus
                                key={status}
                                title={status}
                                isActive={activeStatus === status}
                                onClick={() => handleStatusClick(status)}
                            />
                        ))}
                    </div>
                    <div className="p-6 rounded-lg shadow-md bg-slate-50 bg-opacity-65 backdrop-blur-lg text-slate-900">
                        {renderOrderDetails()}
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

export default Orders;
