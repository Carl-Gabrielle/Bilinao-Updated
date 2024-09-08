import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Logo from '../Pages/Illustrations/LOGO.png'
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import SearchProduct from '@/Components/SearchProduct';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
                        <div className="min-h-screen bg-gray-100">
                                    <div className='w-full h-10  z-20 fixed   bg-black '>
                                                                <div className='flex justify-between items-center text-sm w-full h-full text-white max-w-6xl px-4 mx-auto'>
                                                                    
                                                                    <div className='flex items-center justify-center space-x-4 text-gray-500'>
                                                                    <span className=''>Follow Us</span>
                                                                    <div className="flex gap-4">
                                                                        <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                                                                        <FaFacebook size={18} />
                                                                        </a>
                                                                        <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                                                                        <FaInstagram size={18} />
                                                                        </a>
                                                                        <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                                                                        <FaTwitter size={18} />
                                                                        </a>
                                                                        <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400 transition duration-300">
                                                                        <FaYoutube size={18} />
                                                                        </a>
                                                                    </div>
                                                                    </div>
                                                                    <div>
                                                            <p className=' text-gray-500 text-sm flex items-center'>
                                                                <FaPhoneAlt className='mr-2' />
                                                                +1 (555) 123-4567
                                                            </p>
                                                            </div>
                                                                </div>
                                                            </div>
            <nav className="bg-white border-b border-gray-100 fixed w-full z-20 mt-10 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src={Logo} alt="Bilinao Logo" 
                                    className='size-10 '  style={{
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }} />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink  href={route('customer.index')}
                                active={route().current('customer.index')}>
                                    Home
                                </NavLink>
                                <NavLink >
                                    About Us
                                </NavLink>
                                <NavLink  >
                                    Shop
                                </NavLink>
                                <NavLink href='/categories' active={window.location.pathname === '/categories'} >
                                Categories
                            </NavLink>

                            </div>
                        </div>
                        <SearchProduct/>
                        <Link  className='cursor-pointer flex items-center mr-0 lg:mr-28 relative py-1 '>
                                                
                                                <FaCartShopping className="mr-4 text-2xl text-gray-900" />
                                                <span className="absolute top-3 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-lime-700 rounded-full">
                                                8
                                                </span>
                                            </Link>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                    <Dropdown.Link  href={route('customer.profile')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
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

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('customer.profile')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
            <Footer/>
        </div>
    );
}
