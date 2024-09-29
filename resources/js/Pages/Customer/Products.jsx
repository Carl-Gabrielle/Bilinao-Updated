import React, { useState, useEffect } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { GrCart } from "react-icons/gr";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { HiMiniArrowLongRight } from "react-icons/hi2";

import { IoCheckmarkSharp } from "react-icons/io5";
import Banner from "@/Components/Banner";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import FilterBar from "../../Components/FilterBar";

export default function Products({ products, auth, success, category }) {
    const categoryData = category?.data ?? [];
    const [filteredProducts, setFilteredProducts] = useState(products.data);
    const [sortOption, setSortOption] = useState(null);
    const [availabilityFilter, setAvailabilityFilter] = useState(null);

    const handleSortChange = (sortOption) => {
        setSortOption(sortOption);
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === "availability") {
            setAvailabilityFilter(value);
        }
    };

    useEffect(() => {
        let sortedAndFilteredProducts = [...products.data];
        // Apply availability filter
        if (availabilityFilter) {
            if (availabilityFilter === "instock") {
                sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
                    (product) => product.stock > 0
                );
            } else if (availabilityFilter === "outstock") {
                sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
                    (product) => product.stock === 0
                );
            }
        }

        // Apply sorting
        if (sortOption === "price-asc") {
            sortedAndFilteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            sortedAndFilteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === "new-old") {
            sortedAndFilteredProducts.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        } else if (sortOption === "old-new") {
            sortedAndFilteredProducts.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
        }

        setFilteredProducts(sortedAndFilteredProducts);
    }, [sortOption, availabilityFilter, products.data]);

    // const [isOpen, setIsOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setIsOpen((prev) => !prev);
    // };
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Products" />
            <div className="min-h-screen pt-20 pb-1 ">
                <Banner title="Products" />
                <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 pt-20 ">
                    <div className="flex items-center space-x-3">
                        <hr className="w-28 border border-slate-800 mb-6" />
                        <h1 className="font-bold text-3xl mb-6 text-slate-800 uppercase tracking-widest">
                            Explore Our Products
                        </h1>
                    </div>
                </div>
                {isVisible && success && (
                    <div id="toast" className="fixed bottom-0  z-50 w-full">
                        <div className="bg-slate-700 bg-opacity-60 backdrop-blur-lg px-6 py-5  shadow-inner flex flex-col gap-3 sm:flex-row items-center justify-between space-x-3 rounded-t-3xl">
                            <div className="flex items-center space-x-4 bg-slate-100  bg-opacity-80 backdrop-blur-lg  py-2 px-4 rounded-md ">
                                <div className="sm:size-6  size-4 bg-green-500 flex items-center justify-center rounded-full">
                                    <IoCheckmarkSharp className="text-slate-100  " />
                                </div>
                                <span className="sm:text-sm text-xs font-medium  ">
                                    <span>{success}</span>
                                </span>
                            </div>
                            <div>
                                <Link href={route("customer.carts")}>
                                    <button className="bg-slate-100 text-sm   bg-opacity-80 backdrop-blur-lg flex items-center   font-medium  px-6  py-2 rounded-full">
                                        View Cart
                                        <HiMiniArrowLongRight className=" ml-2" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <CustomerContainer>
                    <div className="flex flex-col lg:flex-row ">
                        {/* Category Filter */}
                        <div className="flex-1">
                            <div className="p-6 w-64 bg-slate-50 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-md transition-all duration-300">
                                <div className="text-md font-semibold text-slate-700 flex items-center justify-between cursor-pointer">
                                    <h1>Category</h1>
                                </div>
                                {categoryData.length > 0 ? (
                                    categoryData.map((category) => (
                                        <div className="mt-4 space-y-2">
                                            <label className="text-xs inline-flex items-center border border-slate-500 rounded-full px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors duration-200">
                                                <input
                                                    type="radio"
                                                    className="hidden peer"
                                                    name="category"
                                                />
                                                <div className="size-4 mr-2 rounded-full border-2 border-slate-500 bg-slate-50 peer-checked:bg-slate-800 peer-checked:border-transparent"></div>
                                                <span>{category.name}</span>
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600 col-span-full">
                                        No categories available
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Products Grid */}
                        {/* FILTER BAR */}
                        <div className="flex-3">
                            <div className="mb-6">
                                <FilterBar
                                    count={filteredProducts.length}
                                    onFilterChange={handleFilterChange}
                                    onSortChange={handleSortChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={route("product.show", product.id)}
                                    >
                                        <div className="bg-slate-50 bg-opacity-50 backdrop-blur-md rounded-2xl p-4 flex space-x-2 shadow-lg relative">
                                            <img
                                                src={`/storage/${product.images[0].image_path}`}
                                                alt={product.name}
                                                className="w-full h-48 object-cover mb-4 rounded-lg "
                                            />
                                        </div>

                                        <div className=" text-xs p-3 flex items-center justify-between">
                                            <div>
                                                <h3 className="pb-1 text-md font-semibold">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm">
                                                    <FaPesoSign className="inline-block mr-1" />
                                                    {Number(
                                                        product.price
                                                    ).toLocaleString("en-PH", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </p>
                                            </div>
                                            {product.stock > 0 ? (
                                                <Link
                                                    preserveScroll
                                                    href={route("cart.store")}
                                                    method="post"
                                                    data={{
                                                        product_id: product.id,
                                                        quantity: 1,
                                                    }}
                                                >
                                                    <div className="bg-slate-800 px-3 py-3 rounded-full text-white">
                                                        <GrCart size={15} />
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div className="bg-slate-100 text-xs  cursor-not-allowed  w-full sm:w-1/2  px-2 sm:py-2 py-1  rounded-full text-slate-600 text-center">
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Pagination links={products.links} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wider leading-relaxed mb-6 mt-10">
                            Categories
                        </h1>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
