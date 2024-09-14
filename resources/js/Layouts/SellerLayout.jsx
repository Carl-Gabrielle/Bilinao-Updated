import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Logo from "../Pages/Illustrations/LOGO.png";
import { BsBasket } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaListAlt, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { HiMenu, HiOutlineX, HiChevronDown } from "react-icons/hi";
const SellerLayout = ({ user, children }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isManageProductsOpen, setIsManageProductsOpen] = useState(false);

    const handleManageProductsClick = () => {
        setIsManageProductsOpen(!isManageProductsOpen);
    };

    const handleNavLinkClick = () => {
        if (isManageProductsOpen) {
            setIsManageProductsOpen(false);
        }
    };
    const toggleDropdown = () => setShowDropdown((prev) => !prev);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <>
            {/* <div className='h-16 bg-white/30 border-b border-white/30 backdrop-blur-md shadow-lg z-20 w-full fixed'>
   </div> */}

            <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
                <aside
                    className={`fixed inset-y-0 left-0 w-72 z-20 bg-white transform ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out sm:translate-x-0 z-40`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between h-16 px-4 ">
                            <Link
                                href={route("seller.dashboard")}
                                className="flex items-center p-4 "
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={Logo}
                                        alt="Bilinao Logo"
                                        className="size-10 "
                                    />
                                    <span className="text-2xl font-extrabold text-lime-700 uppercase tracking-tight">
                                        Bilinao
                                    </span>
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
                                className={`flex items-center justify-between  rounded-lg transition-colors ${
                                    route().current("seller.dashboard")
                                        ? "bg-gray-800 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <MdOutlineDashboard
                                        className={`size-4 ${
                                            route().current("seller.dashboard")
                                                ? "text-white"
                                                : "text-slate-800"
                                        }`}
                                    />
                                    <span>Dashboard</span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${
                                        route().current("seller.dashboard")
                                            ? "text-white"
                                            : "text-slate-800"
                                    }`}
                                />
                            </NavLink>
                            {/* Orders Link */}
                            {/* <NavLink onClick={handleNavLinkClick}>
                                <div className="flex items-center space-x-3">
                                    <MdOutlineDashboard
                                        className={`size-4 ${
                                            route().current("seller.dashboard")
                                                ? "text-white"
                                                : "text-slate-800"
                                        }`}
                                    />
                                    <span>Manage Orders </span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${
                                        route().current("seller.dashboard")
                                            ? "text-white"
                                            : "text-slate-800"
                                    }`}
                                />
                            </NavLink> */}
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
                                        className={`size-5  text-slate-800 text-sm font-medium ${
                                            isManageProductsOpen
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
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${
                                                route().current(
                                                    "products.create"
                                                )
                                                    ? "bg-lime-700 text-white"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <IoMdAdd
                                                    className={`size-4 ${
                                                        route().current(
                                                            "products.create"
                                                        )
                                                            ? "text-white"
                                                            : "text-slate-800"
                                                    }`}
                                                />
                                                <span>Add Products</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${
                                                    route().current(
                                                        "products.create"
                                                    )
                                                        ? "text-white"
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
                                            className={`flex items-center justify-between px-4  w-full rounded-lg transition-colors ${
                                                route().current(
                                                    "products.index"
                                                )
                                                    ? "bg-gray-800 text-white"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <BsBasket
                                                    className={`size-4 ${
                                                        route().current(
                                                            "products.index"
                                                        )
                                                            ? "text-white"
                                                            : "text-slate-800"
                                                    }`}
                                                />
                                                <span>Show Products</span>
                                            </div>
                                            <MdOutlineKeyboardArrowRight
                                                className={`size-5 ${
                                                    route().current(
                                                        "products.index"
                                                    )
                                                        ? "text-white"
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
                                className={`flex items-center justify-between  rounded-lg transition-colors ${
                                    route().current("seller.profile")
                                        ? "bg-gray-800 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <FaRegUser
                                        className={`size-4 ${
                                            route().current("seller.profile")
                                                ? "text-white"
                                                : "text-slate-800"
                                        }`}
                                    />
                                    <span>Profile</span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${
                                        route().current("seller.profile")
                                            ? "text-white"
                                            : "text-slate-800"
                                    }`}
                                />
                            </NavLink>
                            <NavLink
                                href={route("logout")}
                                active={route().current("logout")}
                                onClick={handleNavLinkClick}
                                method="post"
                                as="button"
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                                    route().current("logout")
                                        ? "bg-gray-800 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <MdLogout
                                        className={`size-4 ${
                                            route().current("logout")
                                                ? "text-white"
                                                : "text-red-600"
                                        }`}
                                    />
                                    <span className=" text-red-600">
                                        Logout
                                    </span>
                                </div>
                                <MdOutlineKeyboardArrowRight
                                    className={`size-5 ${
                                        route().current("logout")
                                            ? "text-white"
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
                    className={`flex-1 p-0 sm:p-10 transition-all duration-300 overflow-x-hidden ${
                        sidebarOpen ? "ml-0 " : "ml-0 mt-16 sm:mt-0"
                    } sm:ml-64`}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default SellerLayout;
