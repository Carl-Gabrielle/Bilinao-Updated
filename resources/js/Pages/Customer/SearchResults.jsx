import React from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { CgSearchFound } from "react-icons/cg";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import CustomerContainer from "@/Components/CustomerContainer";
const SearchResults = ({ products, auth, query }) => {
    const itemsFound = products.length;

    return (
        <>
            <CustomerLayout user={auth.user}>
                <Head title="Search Product" />
                <div className="min-h-screen pt-20 pb-1">
                    <Banner title="Shop Your Results" />
                    <CustomerContainer>
                        <div className="flex items-center space-x-3">
                            <hr className="w-28 border  border-slate-500 mb-6" />
                            <div className="flex items-center space-x-2">
                                <CgSearchFound className="mb-6 text-2xl text-slate-600" />
                                <h1 className=" font-bold text text-2xl mb-6 uppercase tracking-widest">
                                    Results Found for You
                                </h1>
                            </div>
                        </div>
                        <h1 className="text-2xl font-medium text-slate-900  tracking-wide mb-4">
                            Search Results for{" "}
                            <span className="font-semibold">"{query}"</span>
                        </h1>
                        <p className="text-lg mb-6">
                            {itemsFound} item{itemsFound !== 1 ? "s" : ""} found
                        </p>
                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={route("product.show", product.id)}
                                    >
                                        <div className="bg-white bg-opacity-50 backdrop-blur-md  rounded-2xl p-4">
                                            <img
                                                src={`/storage/${product.images[0].image_path}`}
                                                alt={product.name}
                                                className="w-full h-48 object-cover mb-4 rounded-lg"
                                            />
                                        </div>
                                        <div className=" text-xs p-3 flex items-center ">
                                            <div>
                                                <h3 className="pb-1 text-md font-semibold">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm">
                                                    <FaPesoSign className="inline-block mr-1" />
                                                    {product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p>No products found for "{query}".</p>
                        )}
                    </CustomerContainer>
                </div>
            </CustomerLayout>
        </>
    );
};

export default SearchResults;
