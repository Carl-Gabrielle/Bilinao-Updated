    import { useState } from 'react';
    import {  FaUser } from 'react-icons/fa';
    import { RiMenuUnfold3Line2 } from "react-icons/ri";
    import Logo from '../Pages/Illustrations/LOGO.png'
    import { FaRegUser } from "react-icons/fa";
    import { LuLogOut } from "react-icons/lu";
    import { IoHomeOutline } from "react-icons/io5";
    import { BiCategory } from "react-icons/bi";
    import { MdMenuOpen } from "react-icons/md";
    import { MdOutlineKeyboardArrowRight } from "react-icons/md";
    import NavLink from '@/Components/NavLink';
    import { Link } from '@inertiajs/react';

    export default function AuthenticatedLayout({ user, header, children }) {
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);

        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        };

        return (
            <div className="min-h-screen bg-gray-100">
                {/* Sidebar */}
                <div className={`fixed top-0 hidden sm:block sm:top-5 left-0 sm:left-5 bottom-0 sm:bottom-5 bg-gradient-to-br from-white to-gray-50 rounded-3xl text-gray-800 shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72 px-6' : 'w-28 px-4'}`}>
        <div className="flex flex-col justify-between h-full">
            <div className="mt-6">
                {/* Burger Menu */}
                <div className="flex justify-between items-center mb-6">
                {isSidebarOpen && (
                    <img src={Logo} className='size-10'/>
                    )}
                    {!isSidebarOpen && (
                    <div className='ml-5'>
                    <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none hover:bg-gray-100 px-2 py-2 rounded-full transition-colors duration-300 ease-in-out">
                        <RiMenuUnfold3Line2 className="size-6" />
                    </button>
                        </div>
                    )}
                    {isSidebarOpen && (
                        <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none hover:bg-gray-100 px-2 py-2 rounded-full transition-colors duration-300 ease-in-out">
                        <MdMenuOpen className="size-6" />
                    </button>
                        )}
                </div>
                {/* User Info */}
                <NavLink href={route('profile.edit')} active={route().current('profile.edit')} className="flex items-center space-x-4 mb-6">
                    <div className='w-14 h-14 flex items-center justify-center rounded-full bg-gray-100'>
                        <img src="" alt="" className="w-12 h-12 rounded-full" />
                    </div>
                    {isSidebarOpen && (
                        <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className={`rounded-md px-4 py-1 mt-1 text-xs flex items-center justify-center ${
                                route().current('profile.edit') ? 'bg-white text-gray-800' : 'bg-blue-700 text-white'
                            }`}>
                                System
                            </span>
                        </div>
                    )}
                </NavLink>
                <div className="space-y-4">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className='flex items-center justify-between rounded-lg transition-colors px-4 py-3'
                    >
                        <div className="flex items-center space-x-3">
                        {!isSidebarOpen && (
                <div className="ml-3 ">
                    <IoHomeOutline
                        className={`w-5 h-5 ${
                            route().current('dashboard') ? 'text-white' : 'text-slate-900'
                        }`}
                    />
                </div>
            )}
                            {isSidebarOpen && (
                                <>
                                <IoHomeOutline
                        className={`w-5 h-5 ${
                            route().current('dashboard') ? 'text-white' : 'text-slate-900'
                        }`}
                    />
                                <span>Dashboard</span>
                                </>
                        )}
                        </div>
                        {isSidebarOpen && (
                        <MdOutlineKeyboardArrowRight
                            className={`w-5 h-5 ${
                                route().current('dashboard') ? 'text-white' : 'text-slate-900'
                            }`}
                        />
                    )}
                    </NavLink>
                    <NavLink
        href={route('category.index')}
        active={route().current('category.index')}
        className="flex items-center justify-between rounded-lg transition-colors px-4 py-3"
    >
        <div className="flex items-center space-x-3">
            {!isSidebarOpen && (
                <div className="ml-3 ">
                    <BiCategory
                        className={`w-5 h-5 ${
                            route().current('category.index') ? 'text-white' : 'text-slate-900'
                        }`}
                    />
                </div>
            )}
            {isSidebarOpen && (
                <>
                    <BiCategory
                        className={`w-5 h-5 ${
                            route().current('category.index') ? 'text-white' : 'text-slate-900'
                        }`}
                    />
                    <span >Category</span>
                </>
            )}
        </div>
        {isSidebarOpen && (
            <MdOutlineKeyboardArrowRight
                className={`w-5 h-5 ${
                    route().current('category.index') ? 'text-white' : 'text-slate-900'
                }`}
            />
        )}
    </NavLink>

                    <NavLink
                        href={route('seller.index')}
                        active={route().current('seller.index')}
                        className='flex items-center justify-between rounded-lg transition-colors px-4 py-3'
                    >
                        <div className="flex items-center space-x-3">
                        {!isSidebarOpen && (
                <div className="ml-3 ">
                    <FaRegUser
                        className={`w-5 h-5 ${
                            route().current('seller.index') ? 'text-white' : 'text-slate-900'
                        }`}
                    />
                </div>
            )}
                            {isSidebarOpen && (
                                <>
                                <FaRegUser
                        className={`w-5 h-5 ${
                            route().current('seller.index') ? 'text-white' : 'text-slate-900'
                        }`}
                    />
                                <span>Sellers</span>
                                </>
                        )}
                        </div>
                        {isSidebarOpen && (
                        <MdOutlineKeyboardArrowRight
                            className={`w-5 h-5 font-semibold ${
                                route().current('seller.index') ? 'text-white' : 'text-slate-900'
                            }`}
                        />
                    )}
                    </NavLink>
                </div>
            </div>
            <div className="mb-6">
                <NavLink
                    href={route('logout')}
                    method="post" as="button"
                    active={route().current('logout')}
                    className='flex items-center justify-between rounded-lg transition-colors px-4 py-3'
                >
                    <div className="flex items-center space-x-3">
                    {!isSidebarOpen && (
                        <div className="ml-3">
                        <LuLogOut
                            className={`w-5 h-5 ${
                                route().current('logout') ? 'text-white' : 'text-red-600'
                            }`}
                        />
                        </div>
                        )}
                        {isSidebarOpen && (
                            <>
                            <LuLogOut
                            className={`w-5 h-5 ${
                                route().current('logout') ? 'text-white' : 'text-red-600'
                            }`}
                        />
                        <span className=" text-red-600">Logout</span>
                        </>
                    )}
                    </div>
                    {isSidebarOpen && (
                    <MdOutlineKeyboardArrowRight
                        className={`w-5 h-5 ${
                            route().current('logout') ? 'text-white' : 'text-red-600'
                        }`}
                    />
                    )}
                </NavLink>
            </div>
        </div>
    </div>

                <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'sm:ml-72 ml-0' : 'ml-32'}`}>
                    {header && (
                        <header className="bg-white shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                        </header>
                    )}
                    <main className="px-6">{children}</main>
                </div>
            </div>
        );
    }
