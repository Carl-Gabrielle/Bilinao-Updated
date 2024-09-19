import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";
import Logo from "../Pages/Illustrations/LOGO.png";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import SearchProduct from "@/Components/SearchProduct";
import CustomerLink from "@/Components/CustomerLink";

export default function AuthenticatedLayout({ user, header, children }) {
    const { cartCount } = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="min-h-screen  bg-slate-300 ">
            <div className="w-full h-10  z-30 fixed  bg-slate-900  ">
                <div className="flex justify-between items-center text-sm w-full h-full text-white max-w-6xl px-4 mx-auto">
                    <div className="flex items-center justify-center space-x-4 text-white">
                        <span className="">Follow Us</span>
                        <div className="flex gap-4">
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook size={18} />
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <p className=" text-white  text-sm flex items-center">
                            <FaPhoneAlt className="mr-2" />
                            +1 (555) 123-4567
                        </p>
                    </div>
                </div>
            </div>
            <nav className="bg-slate-300 bg-opacity-60 backdrop-blur-lg  fixed w-full z-30 mt-10 shadow-md  border-b border-slate-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center ">
                        {/* Logo Section */}
                        <div className="flex items-center ">
                            {/* <Link href="/customer" className="shrink-0">
                                <img
                                    src={Logo}
                                    alt="Bilinao Logo"
                                    className="h-10 "
                                    style={{
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                />
                            </Link> */}
                            {/* Nav Links */}
                            <div className="hidden sm:flex space-x-8 sm:ms-10 ">
                                <CustomerLink
                                    href={route("customer.index")}
                                    active={route().current("customer.index")}
                                >
                                    Home
                                </CustomerLink>
                                <CustomerLink
                                    href={route("customer.about")}
                                    active={route().current("customer.about")}
                                >
                                    About Us
                                </CustomerLink>
                                <CustomerLink
                                    href={route("customer.products")}
                                    active={route().current(
                                        "customer.products"
                                    )}
                                >
                                    Products
                                </CustomerLink>
                                <CustomerLink
                                    href={route("customer.categories")}
                                    active={route().current(
                                        "customer.categories"
                                    )}
                                >
                                    Categories
                                </CustomerLink>
                            </div>
                        </div>
                        {/* Search and Icons */}
                        <div className="flex items-center space-x-6">
                            <SearchProduct />
                            <div className="relative flex items-center ">
                                {/* Cart Icon */}
                                <Link
                                    href={route("customer.carts")}
                                    className="relative flex items-center text-slate-900 cursor-pointer hover:text-slate-50  hover:bg-slate-800  px-2 py-2 rounded-full transition-colors duration-300 ease-in-out"
                                >
                                    <GrCart className="size-5  font-extrabold    " />
                                    {cartCount > 0 && (
                                        <span className="absolute left-6 -top-1 -right-5 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-slate-800 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="relative ml-2 flex items-center  text-slate-900 cursor-pointer hover:text-slate-50  hover:bg-slate-800 px-2 py-2 rounded-full transition-colors duration-300 ease-in-out">
                                            <MdNotificationsNone className="size-5 " />
                                            <span className="absolute left-5 -top-1 -right-5 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-slate-800 rounded-full">
                                                8
                                            </span>
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div className="px-2 py-2 flex items-center justify-between">
                                            <h1 className="text-md font-semibold text-slate">
                                                Notifications
                                            </h1>
                                            <div className="bg-slate-800 text-white px-3 rounded-md py-1">
                                                <span>3 new</span>
                                            </div>
                                        </div>
                                        <ul className="mt-2 divide-y divide-gray-200">
                                            <li className="px-3 py-2 hover:bg-gray-100 transition-colors duration-300 ease-in-out rounded-md">
                                                <p className="text-sm font-semibold">
                                                    Order #12345 has been
                                                    shipped!
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    2 hours ago
                                                </span>
                                            </li>
                                            <li className="px-3 py-2 hover:bg-gray-100  transition-colors duration-300 ease-in-out rounded-md">
                                                <p className="text-sm font-semibold">
                                                    Your refund request for
                                                    Order #67890 has been
                                                    processed.
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    1 day ago
                                                </span>
                                            </li>
                                            <li className="px-3 py-2 hover:bg-gray-100   transition-colors duration-300 ease-in-out rounded-md">
                                                <p className="text-sm font-semibold">
                                                    Order #98765 has been
                                                    delivered. Enjoy your new
                                                    items!
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    5 days ago
                                                </span>
                                            </li>
                                        </ul>
                                        <div className="mt-2 text-center">
                                            <a
                                                href="#"
                                                className="text-sm font-semibold text-blue-500 hover:underline"
                                            >
                                                View all notifications
                                            </a>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            {/* Profile Dropdown */}
                            <div className="hidden sm:flex items-center space-x-4 border-l">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="ml-2 flex items-center justify-center px-3 py-2 border border-transparent text-xs whitespace-nowrap font-medium rounded-md text-slate-900 bg-slate-100 hover:bg-slate-50  focus:outline-none transition-colors duration-150 ease-in-out "
                                        >
                                            <FaRegUser className="mr-2" />
                                            <span>
                                                {" "}
                                                Hi,{" "}
                                                <span className="font-semibold">
                                                    {user.name}
                                                </span>{" "}
                                            </span>
                                            <svg
                                                className="ml-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <h1 className="text-md font-semibold text-slate mb-2 ">
                                            User Profile
                                        </h1>
                                        <span className="text-md text-slate-900 ">
                                            {user.name}
                                        </span>
                                        <p className="text-slate-500 text-xs flex items-center gap-1 mt-1 mb-3 ">
                                            <MdOutlineEmail />
                                            {user.email}
                                        </p>
                                        <hr className="my-2" />
                                        <Dropdown.Link
                                            href="/customerProfile"
                                            className="hover:bg-gray-100 transition-colors duration-300 ease-in-out rounded-md"
                                        >
                                            My Account
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("customer.orders")}
                                            className="hover:bg-gray-100 transition-colors duration-300 ease-in-out mb-2 rounded-md"
                                        >
                                            My Orders
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="bg-slate-800 text-white flex items-center  justify-center rounded-md "
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            {/* Mobile Hamburger Menu */}
                            <div className="flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            !showingNavigationDropdown
                                        )
                                    }
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none transition"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "block"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "block"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink>Dashboard</ResponsiveNavLink>
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}
            <main>{children}</main>
            <Footer />
        </div>
    );
}
