import React, { useState, useEffect } from "react";
import { GrCart } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { FaPesoSign, FaRegStar } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
import { FaStar, FaRegHeart, FaStarHalfAlt } from "react-icons/fa";
import Pagination from "@/Components/Pagination";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";
import FilterBar from "../../Components/FilterBar";

export default function CategoryProducts({
    auth,
    products,
    category,
    success,
}) {
    const [sortedProducts, setSortedProducts] = useState(products.data);
    const [sortOption, setSortOption] = useState(null);
    const [availabilityFilter, setAvailabilityFilter] = useState(null);

    useEffect(() => {
        let filteredAndSortedProducts = [...products.data];

        // Apply availability filter
        if (availabilityFilter) {
            if (availabilityFilter === "instock") {
                filteredAndSortedProducts = filteredAndSortedProducts.filter(
                    (product) => product.stock > 0
                );
            } else if (availabilityFilter === "outstock") {
                filteredAndSortedProducts = filteredAndSortedProducts.filter(
                    (product) => product.stock === 0
                );
            }
        }

        // Apply sorting
        if (sortOption === "price-asc") {
            filteredAndSortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            filteredAndSortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === "new-old") {
            filteredAndSortedProducts.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        } else if (sortOption === "old-new") {
            filteredAndSortedProducts.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
        }

        setSortedProducts(filteredAndSortedProducts);
    }, [sortOption, availabilityFilter, products.data]);

    const handleSortChange = (sortOption) => {
        setSortOption(sortOption);
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === "availability") {
            setAvailabilityFilter(value);
        }
    };
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
            <div className="min-h-screen bg-slate-200 pt-20 pb-1">
                <Head title={`${category} Products`} />
                <main>
                    <Banner title={category} suffix="Products" />
                    {isVisible && success && (
                        <div id="toast" className="fixed bottom-0 z-50 w-full">
                            <div className="bg-slate-700 bg-opacity-60 backdrop-blur-lg px-6 py-5 shadow-inner flex flex-col gap-3 sm:flex-row items-center justify-between space-x-3 rounded-t-3xl">
                                <div className="flex items-center space-x-4 bg-slate-100 bg-opacity-80 backdrop-blur-lg py-2 px-4 rounded-md">
                                    <div className="sm:size-6 size-4 bg-green-500 flex items-center justify-center rounded-full">
                                        <IoCheckmarkSharp className="text-slate-100  " />
                                    </div>
                                    <span className="sm:text-sm text-xs font-semibold">
                                        <span className="font-medium space-x-1">
                                            {success}{" "}
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <Link href={route("customer.carts")}>
                                        <button className="bg-slate-100 text-sm bg-opacity-80 backdrop-blur-lg flex items-center font-medium px-6 py-2 rounded-full">
                                            View Cart
                                            <HiMiniArrowLongRight className=" ml-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <CustomerContainer>
                        {/* FILTER BAR */}
                        <FilterBar
                            count={sortedProducts.length}
                            onSortChange={handleSortChange}
                            onFilterChange={handleFilterChange}
                        />
                        {/* PRODUCTS */}
                        {sortedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {sortedProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route(
                                                "product.show",
                                                product.id
                                            )}
                                            className="w-full flex justify-center"
                                        >
                                            <div className="bg-gray-200 rounded-3xl relative mb-7 h-72">
                                                <div className="rounded-t-3xl rounded-b-2xl overflow-hidden flex flex-col">
                                                    <div className="absolute right-4 top-4 px-2 py-2 rounded-full text-slate-800 bg-white bg-opacity-50 backdrop-blur-lg z-10">
                                                        <FaRegHeart />
                                                    </div>
                                                    {product.images.length >
                                                        0 && (
                                                        <img
                                                            src={`/storage/${product.images[0].image_path}`}
                                                            alt={product.name}
                                                            className="size-72 object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                                                        />
                                                    )}
                                                    <div className="text-xs px-4 py-4 flex items-center justify-between bg-slate-300 bg-opacity-50 backdrop-blur-md text-slate-800 w-full z-10 rounded-2xl absolute -bottom-8">
                                                        <div className="flex flex-col gap-1 ">
                                                            <span className="font-semibold">
                                                                {product.name}
                                                            </span>
                                                            <span className="font-medium text-nowrap">
                                                                <FaPesoSign className="inline-block mr-" />{" "}
                                                                {product.price}
                                                            </span>
                                                            <div className="flex items-center space-x-1 text-yellow-500">
                                                                <FaStar className="text-xs" />
                                                                <FaStar className="text-xs" />
                                                                <FaStar className="text-xs" />
                                                                <FaStarHalfAlt className="text-xs" />
                                                                <FaRegStar className="text-xs" />
                                                            </div>
                                                        </div>
                                                        {product.stock > 0 ? (
                                                            <Link
                                                                preserveScroll
                                                                href={route(
                                                                    "cart.store"
                                                                )}
                                                                method="post"
                                                                data={{
                                                                    product_id:
                                                                        product.id,
                                                                    quantity: 1,
                                                                }}
                                                            >
                                                                <div className="bg-slate-800 px-3 py-3 rounded-full text-slate-100 cursor-pointer">
                                                                    <GrCart
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                </div>
                                                            </Link>
                                                        ) : (
                                                            <div className="bg-slate-100 text-xs  cursor-not-allowed  w-full sm:w-1/2  px-2 sm:py-2 py-1  rounded-full text-slate-600 shadow-md text-center">
                                                                Out of Stock
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Pagination links={products.links} />
                            </>
                        ) : (
                            <p className="text-center text-gray-600 text-lg mt-12">
                                No Products Found
                            </p>
                        )}
                    </CustomerContainer>
                </main>
            </div>
        </CustomerLayout>
    );
}
