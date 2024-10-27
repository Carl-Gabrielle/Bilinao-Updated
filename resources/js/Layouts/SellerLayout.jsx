import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { LuTruck } from "react-icons/lu";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaClock } from 'react-icons/fa';
import Logo from "../Pages/Illustrations/LOGO.png";
import { BsBasket } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaListAlt, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { HiMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";

const SellerLayout = ({ user, children }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isManageOrdersOpen, setIsManageOrdersOpen] = useState(true);
    const [isManageProductsOpen, setIsManageProductsOpen] = useState(true);
    const handleManageOrdersClick = () => {
        setIsManageOrdersOpen(!isManageOrdersOpen);
    };

    const handleOrderLinkClick = () => {
        if (isManageOrdersOpen) {
            setIsManageOrdersOpen(true);
        }
    };

    const handleManageProductsClick = () => {
        setIsManageProductsOpen(!isManageProductsOpen);
    };

    const handleNavLinkClick = () => {
        if (isManageProductsOpen) {
            setIsManageProductsOpen(true);
        }
    };
    const toggleDropdown = () => setShowDropdown((prev) => !prev);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <>
            <div className="min-h-screen flex flex-col sm:flex-row bg-slate-300">
                <aside
                    className={`fixed inset-y-0 left-0 w-72 z-20  bg-slate-50 bg-opacity-55 backdrop-blur-lg transform ${sidebarOpen
                        ? "translate-x-0 "
                        : "-translate-x-full overflow-auto scroll-bar "
                        } transition-transform duration-300 ease-in-out sm:translate-x-0 z-40`}
                >
                    <div className="flex flex-col h-auto ">
                        <div className="flex items-center justify-between h-16 px-4 ">
                            <Link
                                href={route("seller.dashboard")}
                                className="flex items-center p-4 "
                            >
                                <div className="flex items-center justify-center space-x-4">
                                    <img
                                        src={Logo}
                                        alt="Bilinao Logo"
                                        className="w-1/2"
                                    />
                                </div>
                            </Link>
                            <button
                                onClick={toggleSidebar}
                                className="sm:hidden border text-lime-700 rounded-full size-10 flex items-center justify-center"
                            >
                                <HiOutlineX className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col px-6 py-8 space-y-4">
                            {/* Branding */}
                            <div className="mb-2">
                                <h3 className="text-gray-600 text-sm font-normal uppercase tracking-wider">
                                    Bilinao
                                </h3>
                            </div>
                            {/* Dashboard Link */}
                            <NavLink
                                href={route("seller.dashboard")}
                                active={route().current("seller.dashboard")}
                                onClick={handleNavLinkClick}
                                className={`flex items-center justify-between  rounded-lg transition-colors ${route().current("seller.dashboard")
                                    ? "bg-gray-800 "
                                    : "hover:bg-gray-100 0"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <MdOutlineDashboard
                                        className={`size-4 ${route().current("seller.dashboard")
                                            ? "text-slate-50"
                                            : "text-slate-800"
                                            }`}
                                    />
                                    <span>Dashboard</span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${route().current("seller.dashboard")
                                        ? "text-slate-50"
                                        : "text-slate-800"
                                        }`}
                                />
                            </NavLink>
                            {/* Manage Orders */}
                            <div className="relative">
                                <button
                                    onClick={handleManageOrdersClick}
                                    className="flex items-center justify-between px-4 py-2 mb-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 w-full text-left"
                                >
                                    <span className="flex items-center space-x-3">
                                        {" "}
                                        <HiOutlineClipboardList className="size-4 mr-2" />
                                        Manage Orders
                                    </span>
                                    <MdOutlineKeyboardArrowRight
                                        className={`size-5  text-slate-800 text-sm font-medium ${isManageOrdersOpen
                                            ? "rotate-90"
                                            : ""
                                            }`}
                                    />
                                </button>
                                {isManageOrdersOpen && (
                                    <div className="ml-4  space-y-2 ">
                                        <NavLink
                                            href={route("seller.RecentOrders")}
                                            active={route().current(
                                                "seller.RecentOrders"
                                            )}
                                            onClick={handleOrderLinkClick}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <MdOutlinePendingActions
                                                    className={`size-4 ${route().current(
                                                        "seller.RecentOrders"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>Recent Orders</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "seller.RecentOrders"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>

                                        <NavLink
                                            href={route("seller.processOrders")}
                                            active={route().current(
                                                "seller.processOrders"
                                            )}
                                            onClick={handleOrderLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "seller.processOrders"
                                            )
                                                ? "bg-gray-800 text-slate-800"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FaHourglassHalf
                                                    className={`size-4 ${route().current(
                                                        "seller.processOrders"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>On Process Orders</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "seller.processOrders"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>
                                        <NavLink
                                            href={route("seller.shippedOrders")}
                                            active={route().current(
                                                "seller.shippedOrders"
                                            )}
                                            onClick={handleOrderLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "seller.shippedOrders"
                                            )
                                                ? "bg-gray-800 text-slate-800"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FaClock
                                                    className={`size-4 ${route().current(
                                                        "seller.shippedOrders"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>To Ship Orders</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "seller.shippedOrders"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>
                                        {/* <NavLink
                                            href={route("seller.shippedOrders")}
                                            active={route().current(
                                                "seller.shippedOrders"
                                            )}
                                            onClick={handleOrderLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "seller.shippedOrders"
                                            )
                                                ? "bg-gray-800 text-slate-800"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FaClock
                                                    className={`size-4 ${route().current(
                                                        "seller.shippedOrders"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>Shipped Orders</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "seller.shippedOrders"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink> */}
                                        <NavLink
                                            href={route("seller.arrivedOrders")}
                                            active={route().current(
                                                "seller.arrivedOrders"
                                            )}
                                            onClick={handleOrderLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "seller.arrivedOrders"
                                            )
                                                ? "bg-gray-800 text-slate-800"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <LuTruck
                                                    className={`size-4 ${route().current(
                                                        "seller.arrivedOrders"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>Arrived Orders</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "seller.arrivedOrders"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>
                                        <NavLink
                                            href={route(
                                                "seller.completedOrders"
                                            )}
                                            active={route().current(
                                                "seller.completedOrders"
                                            )}
                                            onClick={handleOrderLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "seller.completedOrders"
                                            )
                                                ? "bg-gray-800 text-slate-800"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <AiOutlineCheckCircle
                                                    className={`size-4 ${route().current(
                                                        "seller.completedOrders"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>Completed Orders</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "seller.completedOrderss"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>
                                    </div>
                                )}
                            </div>

                            {/* Manage Products */}
                            <div className="relative">
                                <button
                                    onClick={handleManageProductsClick}
                                    className="flex items-center justify-between px-4 py-2 mb-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 w-full text-left"
                                >
                                    <span className="flex items-center space-x-3">
                                        {" "}
                                        <IoStorefrontOutline className="size-4 mr-2" />
                                        Manage Products
                                    </span>
                                    <MdOutlineKeyboardArrowRight
                                        className={`size-5  text-slate-800 text-sm font-medium ${isManageProductsOpen
                                            ? "rotate-90"
                                            : ""
                                            }`}
                                    />
                                </button>
                                {isManageProductsOpen && (
                                    <div className="ml-4  space-y-2 ">
                                        <NavLink
                                            href={route("products.create")}
                                            active={route().current(
                                                "products.create"
                                            )}
                                            onClick={handleNavLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "products.create"
                                            )
                                                ? "bg-lime-700 "
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <IoMdAdd
                                                    className={`size-4 ${route().current(
                                                        "products.create"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>Add Products</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "products.create"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>

                                        <NavLink
                                            href={route("products.index")}
                                            active={route().current(
                                                "products.index"
                                            )}
                                            onClick={handleNavLinkClick}
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${route().current(
                                                "products.index"
                                            )
                                                ? "bg-gray-800 text-slate-800"
                                                : "hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <BsBasket
                                                    className={`size-4 ${route().current(
                                                        "products.index"
                                                    )
                                                        ? "text-slate-50"
                                                        : "text-slate-800"
                                                        }`}
                                                />
                                                <span>Show Products</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${route().current(
                                                    "products.index"
                                                )
                                                    ? "text-slate-50"
                                                    : "text-slate-800"
                                                    }`}
                                            />
                                        </NavLink>
                                    </div>
                                )}
                            </div>

                            {/* Account Settings */}
                            <div className="mb-2">
                                <h3 className="text-gray-600 text-sm font-normal uppercase tracking-wider">
                                    Account Settings
                                </h3>
                            </div>
                            <NavLink
                                href={route("seller.profile")}
                                active={route().current("seller.profile")}
                                onClick={handleNavLinkClick}
                                className={`flex items-center justify-between  rounded-lg transition-colors ${route().current("seller.profile")
                                    ? "bg-gray-800 text-slate-800"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <FaRegUser
                                        className={`size-4 ${route().current("seller.profile")
                                            ? "text-slate-50"
                                            : "text-slate-800"
                                            }`}
                                    />
                                    <span>Profile</span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${route().current("seller.profile")
                                        ? "text-slate-50"
                                        : "text-slate-800"
                                        }`}
                                />
                            </NavLink>
                            <NavLink
                                href={route("seller.logout")}
                                active={route().current("seller.logout")}
                                onClick={handleNavLinkClick}
                                method="post"
                                as="button"
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${route().current("logout")
                                    ? "bg-gray-800 text-slate-800"
                                    : "hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <MdLogout
                                        className={`size-4 ${route().current("seller.logout")
                                            ? "text-slate-800"
                                            : "text-red-600"
                                            }`}
                                    />
                                    <span className=" text-red-600">
                                        Logout
                                    </span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${route().current("seller.logout")
                                        ? "text-slate-800"
                                        : "text-red-600"
                                        }`}
                                />
                            </NavLink>
                        </nav>
                    </div>
                </aside>

                {!sidebarOpen && (
                    <div className="sm:hidden w-full bg-white h-16 fixed top-0 left-0 right-0 flex items-center justify-between px-4">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className="p-2 text-slate-800 hover:bg-gray-800 rounded-full"
                            >
                                <HiMenu className="h-6 w-6" />
                            </button>
                        </div>
                        <Link href={route("seller.profile")}>
                            <div className="flex items-center text-xs  py-1 px-3 rounded-md hover:bg-gray-100">
                                <FaRegUser className="mr-2" />
                                <span>
                                    {" "}
                                    Hi,{" "}
                                    <span className="font-semibold">
                                        {user.name}
                                    </span>{" "}
                                </span>
                            </div>
                        </Link>
                    </div>
                )}
                {/* Main Content */}
                <div
                    className={`flex-1 p-0 sm:p-10 transition-all duration-300 overflow-x-hidden ${sidebarOpen ? "ml-0 " : "ml-0 mt-16 sm:mt-0"
                        } sm:ml-64`}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default SellerLayout;
