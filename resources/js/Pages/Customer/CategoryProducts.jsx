import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { FaPesoSign } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";
import FilterBar from "./FilterBar";

export default function CategoryProducts({ auth, products, category }) {
    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100 pt-20 pb-1 ">
                <Head title={`${category} Products`} />
                <main>
                    <Banner title={category} suffix="Products" />
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
                                            <div className="bg-gray-200 rounded-3xl relative mb-7 h-72 ">
                                                <div className="rounded-t-3xl  rounded-b-2xl  overflow-hidden flex flex-col  ">
                                                    <div className="absolute right-4 top-4 px-2 py-2 rounded-full text-lime-700 bg-white z-10">
                                                        <FaRegHeart />
                                                    </div>
                                                    {product.images.length >
                                                        0 && (
                                                        <img
                                                            src={`/storage/${product.images[0].image_path}`}
                                                            alt={product.name}
                                                            className="size-72  object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                                                        />
                                                    )}
                                                    <div className="text-xs px-4 py-4 flex items-center justify-between bg-lime-700 text-white w-full z-10 rounded-2xl absolute -bottom-8">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="font-medium">
                                                                {product.name}
                                                            </span>
                                                            <span className="font-normal  ">
                                                                <FaPesoSign className="inline-block mr-" />{" "}
                                                                {product.price}
                                                            </span>
                                                        </div>
                                                        <Link
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
                                                            <div className="bg-white px-3 py-3 rounded-full text-lime-700 ">
                                                                <GrCart
                                                                    size={15}
                                                                />
                                                            </div>
                                                        </Link>
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
