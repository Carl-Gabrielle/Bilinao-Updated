import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiMenuUnfold3Line2 } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../Pages/Illustrations/LOGO.png";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "@inertiajs/react";
import AdminLink from "@/Components/AdminLink";

export default function AuthenticatedLayout({ user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-slate-300">
            {/* NAVBAR */}
            <div className="h-14 bg-slate-50 bg-opacity-30 backdrop-blur-md shadow-md    z-10  fixed top-0 w-full flex items-center justify-between px-6">
                <img src={Logo} className="w-24" />
                <div className="max-w-6xl mx-auto px-6 w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="sm:ml-20 ml-0">
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-600 focus:outline-none hover:bg-gray-100 px-2 py-2 rounded-full transition-colors duration-300 ease-in-out"
                            >
                                <RxHamburgerMenu className="size-6" />
                            </button>
                        </div>
                    </div>
                    {/* <Link href={route("profile.edit")}> */}
                    <div className=" px-2 py-1 rounded-md  hover:bg-slate-200 transition-colors duration-300 ease-in-out flex items-center cursor-pointer">
                        <div className="border size-6   mr-2 bg-slate-800 rounded-full" />
                        <h1 className="text-sm font-medium hidden sm:block">
                            Hi,
                            <span className="ml-1 font-semibold ">
                                {user.name}
                            </span>{" "}
                        </h1>
                        <IoIosArrowDown className="ml-1" />
                    </div>
                    {/* </Link> */}
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-24 left-5 hidden sm:block  bottom-0  sm:bottom-5 bg-slate-200    rounded-3xl text-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "w-64 p-4" : "w-28 p-3"
                }`}
            >
                <div className="flex flex-col justify-between h-full bg-slate-50 rounded-xl p-3">
                    <div className="mt-6">
                        {isSidebarOpen && (
                            <span className="text-gray-600 text-sm font-normal uppercase tracking-wider ">
                                Bilinao
                            </span>
                        )}
                        <div className="space-y-4 mt-5">
                            <AdminLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="flex items-center justify-between rounded-lg transition-colors px-4 py-3"
                            >
                                <div className="flex items-center space-x-5">
                                    {!isSidebarOpen && (
                                        <div className="ml-1.5 ">
                                            <IoHomeOutline
                                                className={`w-5 h-5 ${
                                                    route().current("dashboard")
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                        </div>
                                    )}
                                    {isSidebarOpen && (
                                        <>
                                            <IoHomeOutline
                                                className={`w-5 h-5 ${
                                                    route().current("dashboard")
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                            <span>Dashboard</span>
                                        </>
                                    )}
                                </div>
                                {isSidebarOpen && (
                                    <MdOutlineKeyboardArrowRight
                                        className={`w-5 h-5 ${
                                            route().current("dashboard")
                                                ? "text-white"
                                                : "text-slate-900"
                                        }`}
                                    />
                                )}
                            </AdminLink>
                            <AdminLink
                                href={route("category.index")}
                                active={route().current("category.index")}
                                className="flex items-center justify-between rounded-lg transition-colors px-4 py-3"
                            >
                                <div className="flex items-center space-x-5">
                                    {!isSidebarOpen && (
                                        <div className="ml-1.5 ">
                                            <BiCategory
                                                className={`w-5 h-5 ${
                                                    route().current(
                                                        "category.index"
                                                    )
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                        </div>
                                    )}
                                    {isSidebarOpen && (
                                        <>
                                            <BiCategory
                                                className={`w-5 h-5 ${
                                                    route().current(
                                                        "category.index"
                                                    )
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                            <span>Category</span>
                                        </>
                                    )}
                                </div>
                                {isSidebarOpen && (
                                    <MdOutlineKeyboardArrowRight
                                        className={`w-5 h-5 ${
                                            route().current("category.index")
                                                ? "text-white"
                                                : "text-slate-900"
                                        }`}
                                    />
                                )}
                            </AdminLink>

                            <AdminLink
                                href={route("seller.index")}
                                active={route().current("seller.index")}
                                className="flex items-center justify-between rounded-lg transition-colors px-4 py-3"
                            >
                                <div className="flex items-center space-x-5">
                                    {!isSidebarOpen && (
                                        <div className="ml-1.5 ">
                                            <FaRegUser
                                                className={`w-5 h-5 ${
                                                    route().current(
                                                        "seller.index"
                                                    )
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                        </div>
                                    )}
                                    {isSidebarOpen && (
                                        <>
                                            <FaRegUser
                                                className={`w-5 h-5 ${
                                                    route().current(
                                                        "seller.index"
                                                    )
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                            <span>Sellers</span>
                                        </>
                                    )}
                                </div>
                                {isSidebarOpen && (
                                    <MdOutlineKeyboardArrowRight
                                        className={`w-5 h-5 font-semibold ${
                                            route().current("seller.index")
                                                ? "text-white"
                                                : "text-slate-900"
                                        }`}
                                    />
                                )}
                            </AdminLink>
                            <AdminLink
                                href={route("shipping.index")}
                                active={route().current("shipping.index")}
                                className="flex items-center justify-between rounded-lg transition-colors px-4 py-3"
                            >
                                <div className="flex items-center space-x-5">
                                    {!isSidebarOpen && (
                                        <div className="ml-1.5 ">
                                            <LiaShippingFastSolid
                                                className={`w-5 h-5 ${
                                                    route().current(
                                                        "shipping.index"
                                                    )
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                        </div>
                                    )}
                                    {isSidebarOpen && (
                                        <>
                                            <LiaShippingFastSolid
                                                className={`w-5 h-5 ${
                                                    route().current(
                                                        "shipping.index"
                                                    )
                                                        ? "text-white"
                                                        : "text-slate-900"
                                                }`}
                                            />
                                            <span>Shipping Rates</span>
                                        </>
                                    )}
                                </div>
                                {isSidebarOpen && (
                                    <MdOutlineKeyboardArrowRight
                                        className={`w-5 h-5 font-semibold ${
                                            route().current("shipping.index")
                                                ? "text-white"
                                                : "text-slate-900"
                                        }`}
                                    />
                                )}
                            </AdminLink>
                        </div>
                    </div>
                    <div className="mb-6">
                        <AdminLink
                            href={route("logout")}
                            method="post"
                            as="button"
                            active={route().current("logout")}
                            className="flex items-center justify-between rounded-lg transition-colors px-4 py-3"
                        >
                            <div className="flex items-center space-x-5">
                                {!isSidebarOpen && (
                                    <div className="ml-1.5">
                                        <LuLogOut
                                            className={`w-5 h-5 ${
                                                route().current("logout")
                                                    ? "text-white"
                                                    : "text-red-600"
                                            }`}
                                        />
                                    </div>
                                )}
                                {isSidebarOpen && (
                                    <>
                                        <LuLogOut
                                            className={`w-5 h-5 ${
                                                route().current("logout")
                                                    ? "text-white"
                                                    : "text-red-600"
                                            }`}
                                        />
                                        <span className=" text-red-600">
                                            Logout
                                        </span>
                                    </>
                                )}
                            </div>
                            {isSidebarOpen && (
                                <MdOutlineKeyboardArrowRight
                                    className={`w-5 h-5 ${
                                        route().current("logout")
                                            ? "text-white"
                                            : "text-red-600"
                                    }`}
                                />
                            )}
                        </AdminLink>
                    </div>
                </div>
            </div>
            <div
                className={`transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "sm:ml-72 ml-0" : "ml-24"
                }`}
            >
                {header && (
                    <header className="bg-white ">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="px-4  sm:px-6">{children}</main>
            </div>
        </div>
    );
}
