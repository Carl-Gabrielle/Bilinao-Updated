import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaPesoSign } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import FilterBar from "./FilterBar";

export default function CategoryProducts({ auth, products, category }) {
    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100 pt-20 pb-1">
                <Head title={`${category} Products`} />
                <main>
                    <div className="h-72 w-full bg-lime-700 mt-6 flex items-center justify-center rounded-b-3xl">
                        <h2 className=" text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-white text-center">
                            {category} Products
                        </h2>
                    </div>
                    <CustomerContainer>
                        {/* FILTER BAR  */}
                        <FilterBar count={products.data.length} />
                        {/* PRODUCTS */}
                        {products.data.length > 0 ? (
                            <>
                                <div className="grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {products.data.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route(
                                                "product.show",
                                                product.id
                                            )}
                                            className="w-full flex justify-center"
                                        >
                                            <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col items-center relative">
                                                <div className="absolute right-4 top-4 bg-white px-2 py-2 rounded-full">
                                                    <FaRegHeart />
                                                </div>
                                                {product.images.length > 0 && (
                                                    <img
                                                        src={`/storage/${product.images[0].image_path}`}
                                                        alt={product.name}
                                                        className="size-64 object-cover cursor-pointer"
                                                    />
                                                )}
                                                <div className="p-6 text-center">
                                                    <h3 className="text-md font-normal mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-gray-800 font-bold flex items-center justify-center space-x-1">
                                                        <FaPesoSign />
                                                        <span>
                                                            {product.price}
                                                        </span>
                                                    </p>
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
