import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { usePage } from '@inertiajs/react';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { LuTruck } from "react-icons/lu";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRoute } from "react-icons/fa6";
import { IoAnalyticsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaClock } from 'react-icons/fa';
import Logo from "../Pages/Illustrations/LOGO.png";
import { BsBasket } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaListAlt, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import NavLinkItem from "@/Pages/Seller/NavLinkItem";
import { HiMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";

const SellerLayout = ({ user, children }) => {
    const { orderCounts } = usePage().props;
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
    const isDashboardActive = route().current('seller.dashboard');
    const isRecentOrdersActive = route().current('seller.RecentOrders');
    const isProcessingOrdersActive = route().current('seller.ProcessingOrders');
    const isToShipOrdersActive = route().current('seller.toShipOrders');
    const isArrivingOrdersActive = route().current('seller.arrivingOrders');
    const isDeliveryOrdersActive = route().current('seller.deliveryOrders');
    const isCompletedOrdersActive = route().current('seller.completedOrders');
    const isSalesReportActive = route().current('seller.salesReport');
    const isProfileActive = route().current('seller.profile');
    const isAddProductActive = route().current('products.create');
    const isShowProductActive = route().current('products.index');
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
                            <NavLinkItem
                                to={route('seller.dashboard')}
                                label="Dashboard"
                                icon={MdOutlineDashboard}
                                isActive={isDashboardActive}
                                handleClick={handleNavLinkClick}
                            />
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
                                        <NavLinkItem
                                            to={route('seller.RecentOrders')}
                                            label="Recent Orders"
                                            icon={MdOutlinePendingActions}
                                            isActive={isRecentOrdersActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                        <NavLinkItem
                                            to={route('seller.ProcessingOrders')}
                                            label="Processing Orders"
                                            icon={FaHourglassHalf}
                                            isActive={isProcessingOrdersActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                        <NavLinkItem
                                            to={route('seller.toShipOrders')}
                                            label="To Ship Orders"
                                            icon={FaClock}
                                            isActive={isToShipOrdersActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                        <NavLinkItem
                                            to={route('seller.arrivingOrders')}
                                            label="Arriving Orders"
                                            icon={LuTruck}
                                            isActive={isArrivingOrdersActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                        <NavLinkItem
                                            to={route('seller.deliveryOrders')}
                                            label="Out for Delivery"
                                            icon={FaRoute}
                                            isActive={isDeliveryOrdersActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                        <NavLinkItem
                                            to={route('seller.completedOrders')}
                                            label="Completed Orders"
                                            icon={AiOutlineCheckCircle}
                                            isActive={isCompletedOrdersActive}
                                            handleClick={handleOrderLinkClick}
                                        />
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
                                        <NavLinkItem
                                            to={route('products.create')}
                                            label="Add Products"
                                            icon={IoMdAdd}
                                            isActive={isAddProductActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                        <NavLinkItem
                                            to={route('products.index')}
                                            label="Show Products"
                                            icon={BsBasket}
                                            isActive={isShowProductActive}
                                            handleClick={handleOrderLinkClick}
                                        />
                                    </div>
                                )}
                            </div>
                            <NavLinkItem
                                to={route('seller.salesReport')}
                                label="Sales Report"
                                icon={IoAnalyticsOutline}
                                isActive={isSalesReportActive}
                                handleClick={handleOrderLinkClick}
                            />
                            {/* Account Settings */}
                            <div className="mb-2">
                                <h3 className="text-gray-600 text-sm font-normal uppercase tracking-wider">
                                    Account Settings
                                </h3>
                            </div>
                            <NavLinkItem
                                to={route('seller.profile')}
                                label="Profile"
                                icon={FaRegUser}
                                isActive={isProfileActive}
                                handleClick={handleOrderLinkClick}
                            />
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
                    <div className="sm:hidden w-full z-20 bg-white h-16 fixed top-0 left-0 right-0 flex items-center justify-between px-4">
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
