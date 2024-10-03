import React, { useState } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaPesoSign } from "react-icons/fa6";
import CustomerContainer from "@/Components/CustomerContainer";
import { Head, Link } from "@inertiajs/react";

export default function Wishlists({ auth, wishlists }) {
    const [wishlistsItems, setwishlistsItems] = useState(wishlists);
    return (
        <CustomerLayout user={auth.user}>
            <Head title="My Wishlists" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="My Wishlists" />
                <CustomerContainer>
                    <div className="flex items-center space-x-3">
                        <hr className="w-28 border border-slate-800 mb-6" />
                        <h1 className="font-bold text-2xl mb-6 text-slate-800 uppercase tracking-widest">
                            Your Saved Wishlists
                        </h1>
                    </div>
                    <div className=" p-5 shadow-lg rounded-2xl bg-slate-50  bg-opacity-60 backdrop-blur-lg  ">
                        {wishlistsItems.map((wishlists) => {
                            return (
                                <div
                                    key={wishlists.id}
                                    className="flex items-center border border-slate-400 p-3 rounded-lg mt-5"
                                >
                                    <img
                                        src={`/storage/${wishlists.product.images[0].image_path}`}
                                        alt={wishlists.product.name}
                                        className="sm:size-20 size-10 object-cover rounded"
                                    />
                                    <div className="flex-1 ml-4 text-xs text-slate-800 ">
                                        <h3 className="font-semibold">
                                            {wishlists.product.name}
                                        </h3>
                                        <p className="flex items-center">
                                            <FaPesoSign />
                                            {Number(
                                                wishlists.product.price
                                            ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                    <Link>
                                        <div className=" px-3 py-2 bg-slate-300 rounded-md text-sm flex items-center ">
                                            <MdOutlineAddShoppingCart className="size-4 mr-2" />
                                            <span>Add to cart</span>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
