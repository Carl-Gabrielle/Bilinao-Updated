import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";
import { FiBox } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

const icons = {
    Pending: <MdOutlinePendingActions size={16} />,
    "To Pay": <TbCurrencyPeso size={16} />,
    "To Ship": <LuTruck size={16} />,
    "To Receive": <FiBox size={16} />,
    Received: <FaRegCheckCircle size={16} />,
};

const OrderStatus = ({ title, isActive, onClick, count = 1 }) => {
    return (
        <div
            className={`flex justify-center items-center text-center p-3 rounded-md cursor-pointer transition-colors duration-300 relative ${
                isActive
                    ? "bg-slate-800 text-white"
                    : "bg-slate-50 bg-opacity-60 backdrop-blur-lg hover:bg-slate-100"
            }`}
            onClick={onClick}
        >
            <span className="mr-1">{icons[title]}</span>
            <span className="mt-1 text-xs font-medium">{title}</span>

            {/* Notification badge */}
            {count > 0 && (
                <span className="absolute -top-2 -right-2 text-xs text-red-700 bg-red-300 rounded-full w-5 h-5 flex justify-center items-center font-bold">
                    {count}
                </span>
            )}
        </div>
    );
};

export default OrderStatus;
