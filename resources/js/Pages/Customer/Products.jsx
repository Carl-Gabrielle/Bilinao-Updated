import React, { useState, useEffect } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { GrCart } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";
import Banner from "@/Components/Banner";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import FilterBar from "../../Components/FilterBar";

export default function Products({ products, auth, success }) {
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

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Products" />
            <div className="min-h-screen pt-20 pb-1 ">
                <Banner title="Products" />
                <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 pt-20 ">
                    <div className="flex items-center space-x-3">
                        <hr className="w-28 border  border-slate-500 mb-6" />
                        <h1 className=" font-bold text text-3xl mb-6 uppercase tracking-widest">
                            Explore our Products
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row ">
                    {/* Products Grid */}
                    <CustomerContainer className="flex-1">
                        {/* FILTER BAR */}
                        <div className="mb-6">
                            <FilterBar
                                count={filteredProducts.length}
                                onFilterChange={handleFilterChange}
                                onSortChange={handleSortChange}
                            />
                        </div>
                        {success && (
                            <div
                                id="toast"
                                className="fixed bottom-4 right-4 z-50"
                            >
                                <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3">
                                    <IoCheckmarkSharp className="text-white w-6 h-6" />
                                    <span className="text-sm font-medium">
                                        {success}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route("product.show", product.id)}
                                >
                                    <div className="bg-white bg-opacity-50 backdrop-blur-md  rounded-2xl p-4 flex space-x-2 shadow-lg">
                                        <img
                                            src={`/storage/${product.images[0].image_path}`}
                                            alt={product.name}
                                            className="w-full h-48 object-cover mb-4 rounded-lg"
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
                                                ).toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </p>
                                        </div>
                                        {product.stock > 0 ? (
                                            <Link
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
                                            <div className="bg-slate-100 text-xs  cursor-not-allowed  w-full sm:w-1/2  px-2 sm:py-2 py-1  rounded-full text-gray-600 text-center">
                                                Out of Stock
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Pagination links={products.links} />
                    </CustomerContainer>
                </div>
            </div>
        </CustomerLayout>
    );
}