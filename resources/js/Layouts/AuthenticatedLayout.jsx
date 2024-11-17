import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiMenuUnfold3Line2 } from "react-icons/ri";
import { IoAnalyticsOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
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
import SidebarItem from "@/Components/SidebarItem";
import SidebarLogoutItem from "@/Components/SidebarLogoutItem";

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
                    <article className=" px-2 py-1 rounded-md  hover:bg-slate-100 transition-colors duration-300 ease-in-out flex items-center">
                        <figure>
                            {/* <img className="border w-6 h-6  object-cover  mr-2 bg-slate-500 rounded-full" src="" alt="Profile Image" /> */}
                            <div className="flex items-center justify-center w-7 h-7 mr-2 bg-slate-600 bg-opacity-30 backdrop-blur-md  text-primary rounded-full text-lg border-slate-500 border-2 ">
                                {user.name
                                    .split(' ')
                                    .map((name) => name.charAt(0))
                                    .slice(0, 2)
                                    .join('')}
                            </div>
                        </figure>
                        <figcaption>
                            <h1 className="text-xs font-semibold hidden sm:block">
                                {user.name}
                            </h1>
                            <p className="text-xs font-normal text-slate-700">{user.email}</p>
                        </figcaption>
                    </article>
                </div>
            </div>
            {/* Sidebar */}
            <div
                className={`fixed top-24 left-5 hidden sm:block  bottom-0  sm:bottom-5 bg-slate-200    rounded-3xl text-gray-800 shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64 p-4" : "w-28 p-3"
                    }`}
            >
                <div className="flex flex-col justify-between h-full bg-slate-50 rounded-xl p-3">
                    <div >
                        {isSidebarOpen && (
                            <span className="text-gray-600 text-sm font-normal uppercase tracking-wider ">
                                Bilinao
                            </span>
                        )}
                        <div className="space-y-4 mt-2">
                            <AdminLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="rounded-lg transition-colors px-4 py-3"
                            >
                                <SidebarItem
                                    icon={IoHomeOutline}
                                    label="Dashboard"
                                    routeName="dashboard"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </AdminLink>
                            <AdminLink
                                href={route("category.index")}
                                active={route().current("category.index")}
                                className=" rounded-lg transition-colors px-4 py-3"
                            >
                                <SidebarItem
                                    icon={BiCategory}
                                    label="Category"
                                    routeName="category.index"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </AdminLink>
                            <AdminLink
                                href={route("seller.index")}
                                active={route().current("seller.index")}
                                className=" rounded-lg transition-colors px-4 py-3"
                            >
                                <SidebarItem
                                    icon={FaRegUser}
                                    label="Sellers"
                                    routeName="seller.index"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </AdminLink>
                            <AdminLink
                                href={route("shipping.index")}
                                active={route().current("shipping.index")}
                                className="rounded-lg transition-colors px-4 py-3"
                            >
                                <SidebarItem
                                    icon={LiaShippingFastSolid}
                                    label="Shipping Rates"
                                    routeName="shipping.index"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </AdminLink>
                            <AdminLink
                                href={route("admin.salesReport")}
                                active={route().current("admin.salesReport")}
                                className=" rounded-lg transition-colors px-4 py-3"
                            >
                                <SidebarItem
                                    icon={IoAnalyticsOutline}
                                    label="Sales Report"
                                    routeName="admin.salesReport"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </AdminLink>
                            {isSidebarOpen && (
                                <span className="text-gray-600 text-sm font-normal uppercase tracking-wider   ">
                                    Account Settings
                                </span>
                            )}
                            <AdminLink
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                                className=" rounded-lg transition-colors px-4 py-3"
                            >
                                <SidebarItem
                                    icon={RiUserSettingsLine}
                                    label="Settings"
                                    routeName="profile.edit"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </AdminLink>
                        </div>
                    </div>
                    <div className="mb-6">
                        <AdminLink
                            href={route("logout")}
                            method="post"
                            as="button"
                            active={route().current("logout")}
                            className=" rounded-lg transition-colors px-4 py-3"
                        >
                            <SidebarLogoutItem isSidebarOpen={isSidebarOpen} />
                        </AdminLink>
                    </div>
                </div>
            </div>
            <div
                className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "sm:ml-72 ml-0" : "ml-24"
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
        </div >
    );
}
