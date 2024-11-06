import React, { useState } from "react";
import { LuTruck } from "react-icons/lu";
import { MdKeyboardArrowRight, MdKeyboardArrowDown, MdDoneAll, MdLocationOn } from "react-icons/md";
import { RiHandHeartFill } from "react-icons/ri";
import { FaHourglassHalf } from "react-icons/fa";

export default function ShipmentDetailsToggle({
    processingDate,
    pickedDate,
    shippedDate,
    arrivedDate,
    receivedDate,
    address,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsOpen((prev) => !prev);
            setIsLoading(false);
        }, 1000);
    };

    const formatDate = (date) => {
        if (!date) return null;
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString("en-Ph", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    };

    const getMunicipal = (address) => {
        if (!address) return "";
        const addressParts = address.split(",");
        return addressParts.length > 2 ? addressParts[2].trim() : address;
    };

    const getBarangay = (address) => {
        if (!address) return "";
        const addressParts = address.split(",");
        return addressParts.length > 3 ? addressParts[3].trim() : address;
    };

    const getCurrentStatus = () => {
        if (receivedDate) return "Package delivered";
        if (arrivedDate) return "Arrived at destination hub";
        if (shippedDate) return "In transit to destination";
        if (pickedDate) return "Picked and ready to ship";
        if (processingDate) return "Order processing underway";
        return "Status pending";
    };

    const steps = [
        {
            label: "Processing",
            date: processingDate,
            icon: FaHourglassHalf,
            color: "text-red-500 bg-red-100 px-3 py-0.5 rounded-2xl",
            status: "Awaiting fulfillment",
            content: "Your order is currently being processed and prepared for the next steps.",
        },
        {
            label: "Picked",
            date: pickedDate,
            icon: RiHandHeartFill,
            color: "text-yellow-500 bg-yellow-100 px-3 py-0.5 rounded-2xl",
            status: "Handled with care",
            content: "Your items have been picked and are now prepared for packing and shipment.",
        },
        {
            label: "Shipped",
            date: shippedDate,
            icon: LuTruck,
            color: "text-blue-500 bg-blue-100 px-3 py-0.5 rounded-2xl",
            status: "On the way",
            location: getMunicipal(address),
            showLocation: true,
            content: "Your order has shipped and is on its way",
        },
        {
            label: "Arrived",
            date: arrivedDate,
            icon: MdLocationOn,
            color: "text-purple-500 bg-purple-100 px-3 py-0.5 rounded-2xl",
            status: "Location",
            location: getBarangay(address),
            showLocation: true,
            content: "Your order has arrived ",
        },
        {
            label: "Received",
            date: receivedDate,
            icon: MdDoneAll,
            color: "text-green-500 bg-green-100 px-3 py-0.5 rounded-2xl",
            status: "Delivered to customer",
            content: "Your order has been successfully delivered and received.",
        },
    ];

    return (
        <div>
            <div
                className="w-full h-auto flex items-center justify-between space-x-4 border text-xs text-primary p-2 border-slate-400 rounded-lg mt-3 cursor-pointer"
                onClick={handleToggle}
            >
                <div className="flex items-center space-x-4">
                    <div>
                        <LuTruck size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span>
                            {new Date(processingDate).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <p>{isLoading ? "Processing..." : getCurrentStatus()}</p>
                    </div>
                </div>
                {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </div>

            {isLoading ? (
                <div className="mt-2 text-center text-slate-600">
                    <div className="flex justify-center items-center space-x-2">
                        <div className="w-3 h-3 border-2 border-t-2 border-gray-400 rounded-full animate-spin"></div>
                        <span className="text-sm">Loading shipment details...</span>
                    </div>
                </div>
            ) : isOpen ? (
                <div className="mt-8 p-4 rounded-2xl bg-slate-50 transition-all ease-in-out duration-300">
                    <h4 className="text-md font-medium text-primary mb-6">Shipment Tracking</h4>
                    <div className="relative pl-8 space-y-6 border-l-2 border-slate-300">
                        {steps.map((step, index) => (
                            step.date && (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="rounded-full bg-slate-100 p-2">
                                        <step.icon className="text-primary text-lg" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-sm font-semibold text-gray-900">{step.label}</span>
                                        <span className="block text-xs text-gray-600">{formatDate(step.date)}</span>
                                        <p className="text-xs text-gray-600">
                                            {step.content}
                                            {step.showLocation && step.location ? ` to ${step.location}` : ""}
                                        </p>
                                        <p className={`text-[0.6rem] whitespace-nowrap inline-block ${step.color}`}>{step.status}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
