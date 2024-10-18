import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import { Head } from "@inertiajs/react";
import { HiBell } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { MdMoreVert } from "react-icons/md";
import { RiVerifiedBadgeLine } from "react-icons/ri";

export default function Notifications({ auth, notifications = [] }) {
    const userName = auth?.name || "Guest";
    const [filter, setFilter] = useState("all");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleNotificationClick = (notificationId) => {
        Inertia.patch(
            `/notifications/${notificationId}/read`,
            {},
            {
                onSuccess: (page) => {
                    console.log("Notification marked as read");
                },
                onError: (error) => {
                    console.error("Error marking notification as read:", error);
                },
            }
        );
    };

    const markAllAsRead = () => {
        notifications.forEach((notification) => {
            if (notification.status === "unread") {
                handleNotificationClick(notification.id);
            }
        });
        setShowDropdown(false); // Close the dropdown after marking all as read
    };

    const filteredNotifications = notifications.filter((notification) => {
        if (filter === "unread") {
            return notification.status === "unread";
        }
        return true; // For "all", return all notifications
    });

    return (
        <CustomerLayout user={auth || {}}>
            <Head title="Notifications" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="Notifications" />
                <CustomerContainer>
                    <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
                        <div className="bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-3xl p-6 text-sm h-96 ">
                            <div className=" overflow-x-auto scroll-bar h-full px-6">
                                <div className="px-2 py-2 flex items-center justify-between mb-2 ">
                                    <h1 className="text-lg text-primary font-semibold text-slate">
                                        Notifications
                                    </h1>
                                    <div className="bg-primary text-white px-3 rounded-md py-1">
                                        <span>
                                            {filteredNotifications.length} new
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-4">
                                        <span
                                            onClick={() => setFilter("all")}
                                            className={`border px-3 py-0.5 rounded-full cursor-pointer ${
                                                filter === "all"
                                                    ? "bg-primary text-white"
                                                    : "border-slate-300"
                                            }`}
                                        >
                                            All
                                        </span>
                                        <span
                                            onClick={() => setFilter("unread")}
                                            className={`border px-3 py-0.5 rounded-full cursor-pointer ${
                                                filter === "unread"
                                                    ? "bg-primary text-white"
                                                    : "border-slate-300"
                                            }`}
                                        >
                                            Unread
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <MdMoreVert
                                            className="size-4 text-slate-600 cursor-pointer"
                                            onClick={() =>
                                                setShowDropdown(!showDropdown)
                                            }
                                        />
                                        {showDropdown && (
                                            <div className="absolute right-0 mt-2 w-48 bg-slate-50 rounded-md shadow-lg z-10">
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors duration-300 ease-in-out"
                                                >
                                                    Mark All as Read
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ul className="space-y-4 ">
                                    {filteredNotifications.length > 0 ? (
                                        filteredNotifications.map(
                                            (notification) => (
                                                <li
                                                    key={notification.id}
                                                    className={`rounded-lg p-4 ${
                                                        notification.status ===
                                                        "unread"
                                                            ? "bg-slate-50 border-0 font-semibold"
                                                            : "border border-slate-300"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <p
                                                                className={`text-md font-medium text-primary ${
                                                                    notification.status ===
                                                                    "unread"
                                                                        ? "font-semibold"
                                                                        : "text-primary"
                                                                }`}
                                                                onClick={() =>
                                                                    handleNotificationClick(
                                                                        notification.id
                                                                    )
                                                                } // Make the message clickable as well
                                                            >
                                                                <div className="flex items-center ">
                                                                    <RiVerifiedBadgeLine className="mr-1" />
                                                                    {
                                                                        notification.message
                                                                    }
                                                                </div>
                                                            </p>
                                                            <span className="text-gray-500 text-xs">
                                                                {new Date(
                                                                    notification.updated_at
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                                ,{" "}
                                                                {new Date(
                                                                    notification.updated_at
                                                                ).toLocaleTimeString(
                                                                    "en-US",
                                                                    {
                                                                        hour: "numeric",
                                                                        minute: "numeric",
                                                                        hour12: true,
                                                                    }
                                                                )}
                                                            </span>
                                                        </div>
                                                        {notification.status ===
                                                            "unread" && (
                                                            <button
                                                                onClick={() =>
                                                                    handleNotificationClick(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="ml-4 bg-slate-500 bg-opacity-30 backdrop-blur-md text-primary font-medium flex items-center px-2 py-1 rounded"
                                                            >
                                                                <HiCheck className="mr-1" />
                                                                Mark as Read
                                                            </button>
                                                        )}
                                                    </div>
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <div className="flex flex-col items-center justify-center mt-8">
                                            <HiBell className="text-slate-500 text-3xl " />
                                            <p className="mt-2 text-gray-600">
                                                No notifications at this time.
                                            </p>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
