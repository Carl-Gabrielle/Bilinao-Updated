import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { LuTruck } from "react-icons/lu";
import { TbCurrencyPeso } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import Banner from "@/Components/Banner";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import ToPay from "./Topay";
import ToShip from "./ToShip";
import Pending from "./Pending";
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
                    <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                        <OrderStatus
                            title="Pending"
                            icon={<MdOutlinePendingActions size={16} />}
                            isActive={activeStatus === "Pending"}
                            onClick={() => handleStatusClick("Pending")}
                        />
                        <OrderStatus
                            title="To Pay"
                            icon={<TbCurrencyPeso size={16} />}
                            isActive={activeStatus === "To Pay"}
                            onClick={() => handleStatusClick("To Pay")}
                        />
                        <OrderStatus
                            title="To Ship"
                            icon={<LuTruck size={16} />}
                            isActive={activeStatus === "To Ship"}
                            onClick={() => handleStatusClick("To Ship")}
                        />
                        <OrderStatus
                            title="To  Receive"
                            icon={<FiBox size={16} />}
                            isActive={activeStatus === "To Receive"}
                            onClick={() => handleStatusClick("To Receive")}
                        />
                        <OrderStatus
                            title="Received"
                            icon={<FaRegCheckCircle size={16} />}
                            isActive={activeStatus === "Received"}
                            onClick={() => handleStatusClick("Received")}
                        />
                    </div>

                    <div className="bg-slate-50  bg-opacity-65 backdrop-blur-lg p-6 rounded-lg shadow-md text-slate-900">
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
            <span className="mr-1"> {icon}</span>
            <span className="mt-1 text-xs font-medium">{title}</span>
        </div>
    );
};

export default Orders;
