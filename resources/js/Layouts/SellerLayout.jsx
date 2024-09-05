import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { BsBasket } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {  FaListAlt, FaSignOutAlt,FaRegUser } from 'react-icons/fa';
import { HiMenu, HiOutlineX, HiChevronDown } from 'react-icons/hi';

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
    const toggleDropdown = () => setShowDropdown(prev => !prev);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
        <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
        <aside className={`fixed inset-y-0 left-0 w-72 z-20 bg-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out sm:translate-x-0 z-40`}>
    <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 bg-white">
            <span className="text-xl font-bold">Logo</span>
            <button onClick={toggleSidebar} className="sm:hidden">
                <HiOutlineX className="h-6 w-6" />
            </button>
        </div>
        <nav className="flex flex-col px-6 py-8 space-y-4">
            {/* Branding */}
            <div className="mb-2">
                <h3 className="text-gray-600 text-sm font-normal uppercase tracking-wider">Bilinao</h3>
            </div>

            {/* Dashboard Link */}
            <NavLink
                href={route('seller.dashboard')}
                active={route().current('products.dashboard')}
                onClick={handleNavLinkClick}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    route().current('products.dashboard') ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                }`}
            >
                <div className="flex items-center space-x-3">
                    <MdOutlineDashboard
                        className={`size-4 ${
                            route().current('products.dashboard') ? 'text-white' : 'text-gray-600'
                        }`}
                    />
                    <span className="font-medium">Dashboard</span>
                </div>
                <MdOutlineKeyboardArrowRight
                    className={`size-5 ${
                        route().current('products.dashboard') ? 'text-white' : 'text-gray-600'
                    }`}
                />
            </NavLink>

            {/* Manage Products */}
            <div className="relative">
                <button
                    onClick={handleManageProductsClick}
                    className="flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100 w-full text-left"
                >
                    <span className='text-gray-700 text-sm font-medium flex items-center space-x-3'> <IoStorefrontOutline  className='size-4 mr-2'/>Manage Products</span>
                    <MdOutlineKeyboardArrowRight className={`size-5  text-gray-700 text-sm font-medium ${isManageProductsOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {isManageProductsOpen && (
                    <div className="ml-4 mt-2 space-y-2 ">
                        <NavLink
                            href={route('products.create')}
                            active={route().current('products.create')}
                            onClick={handleNavLinkClick}
                            className={`flex items-center justify-between px-4 py-3 w-full rounded-lg transition-colors ${
                                route().current('products.create') ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <IoMdAdd
                                    className={`size-4 ${
                                        route().current('products.create') ? 'text-white' : 'text-gray-600'
                                    }`}
                                />
                                <span className="font-medium">Add Products</span>
                            </div>
                            <MdOutlineKeyboardArrowRight
                                className={`size-5 ${
                                    route().current('products.create') ? 'text-white' : 'text-gray-600'
                                }`}
                            />
                        </NavLink>

                        <NavLink
                            href={route('products.index')}
                            active={route().current('products.index')}
                            onClick={handleNavLinkClick}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                                route().current('products.index') ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <BsBasket
                                    className={`size-4 ${
                                        route().current('products.index') ? 'text-white' : 'text-gray-600'
                                    }`}
                                />
                                <span className="font-medium">Show Products</span>
                            </div>
                            <MdOutlineKeyboardArrowRight
                                className={`size-5 ${
                                    route().current('products.index') ? 'text-white' : 'text-gray-600'
                                }`}
                            />
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Account Settings */}
            <div className="mb-2">
                <h3 className="text-gray-600 text-sm font-normal uppercase tracking-wider">Account Settings</h3>
            </div>

            <NavLink
                href={route('products.profile')}
                active={route().current('products.profile')}
                onClick={handleNavLinkClick}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    route().current('products.profile') ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                }`}
            >
                <div className="flex items-center space-x-3">
                    <FaRegUser
                        className={`size-4 ${
                            route().current('products.profile') ? 'text-white' : 'text-gray-600'
                        }`}
                    />
                    <span className="font-medium">Profile</span>
                </div>
                <MdOutlineKeyboardArrowRight
                    className={`size-5 ${
                        route().current('products.profile') ? 'text-white' : 'text-gray-600'
                    }`}
                />
            </NavLink>

            <NavLink
                href={route('logout')}
                method="post"
                as="button"
                className="flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center space-x-3">
                    <MdLogout className="size-4" />
                    <span className="font-medium">Log Out</span>
                </div>
            </NavLink>
        </nav>

    </div>
</aside>

            {/* Mobile Menu Button */}
            <div className="sm:hidden fixed top-4 left-4 z-50">
                <button onClick={toggleSidebar} className="p-2 bg-gray-800 text-white rounded-full">
                    <HiMenu className="h-6 w-6" />
                </button>
            </div>

            {/* Main Content */}
            <div className={`flex-1 p-0 sm:p-10 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'} sm:ml-64`}>
                {children}
            </div>
        </div>
    );
};

export default SellerLayout;
