import React from "react";
import Menu from "@/Components/Menu";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import SellerInput from "./SellerInput";

const Footer = () => {
    return (
        <div className="text-white bg-slate-900 rounded-t-3xl">
            <div className="mx-auto py-8 lg:py-12 px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="flex flex-col items-center md:items-start mb-6 lg:mb-0">
                        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                            Bilinao
                        </h2>
                        <div className="flex gap-4 mt-4">
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white"
                            >
                                <FaFacebook size={18} />
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-400 transition duration-300"
                            >
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">
                            About Us
                        </h3>
                        <Menu href="/about">About Us</Menu>
                        <Menu href="/about">Story</Menu>
                        <Menu href="/about">Contact Us</Menu>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">
                            Subscribe to our Newsletter
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Stay updated on new arrivals and exclusive offers!
                        </p>
                        <form className="flex w-full">
                            <SellerInput
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-black rounded-l-md border-r-0"
                            />
                            <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md "
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">
                            Information
                        </h3>
                        <Menu href={route("customer.faqs")}>FAQs</Menu>
                        <Menu href={route("customer.privacyPolicy")}>Privacy Policy</Menu>
                        <Menu href={route("customer.terms")}>Terms & Conditions</Menu>
                    </div>
                </div>
                <hr className="border-gray-400 mt-5" />
                <div className="text-center mt-8 text-sm lg:text-base text-gray-400">
                    © 2024 Bilinao. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Footer;
