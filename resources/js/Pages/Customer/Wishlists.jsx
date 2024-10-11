import React, { useState } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import Banner from "@/Components/Banner";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaPesoSign } from "react-icons/fa6";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { RiHeartAdd2Line } from "react-icons/ri";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import CustomerContainer from "@/Components/CustomerContainer";
import { Head, Link } from "@inertiajs/react";

export default function Wishlists({ auth, wishlists, product }) {
    const [wishlistsItems, setwishlistsItems] = useState(wishlists);

    const handleDelete = async (id) => {
        try {
            await axios.delete(route("wishItem.destroy", id));

            setwishlistsItems(wishlistsItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error removing item from the cart!", error);
        }
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="My Wishlists" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="My Wishlists" />
                <CustomerContainer>
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <hr className="flex-grow border border-slate-800" />
                            <h1 className="font-bold text-2xl text-slate-800 uppercase tracking-widest">
                                Your Saved Wishlists
                            </h1>
                            <hr className="flex-grow border border-slate-800" />
                        </div>
                        <div className="p-6 shadow-lg rounded-2xl bg-slate-50 bg-opacity-60 backdrop-blur-lg">
                            {wishlistsItems.length > 0 ? (
                                wishlistsItems.map((wishlists) => (
                                    <div
                                        key={wishlists.id}
                                        className="flex items-center border border-slate-400 p-2 rounded-lg  "
                                    >
                                        <Link
                                            href={route(
                                                "product.show",
                                                wishlists.product.id
                                            )}
                                        >
                                            <img
                                                src={`/storage/${wishlists.product.images[0].image_path}`}
                                                alt={wishlists.product.name}
                                                className="size-16 object-cover rounded-md"
                                            />
                                        </Link>
                                        <div className="flex-1 ml-4 text-sm text-slate-800">
                                            <h3 className="font-semibold text-md">
                                                {wishlists.product.name}
                                            </h3>
                                            <p className="flex items-center mt-1">
                                                <FaPesoSign />
                                                {Number(
                                                    wishlists.product.price
                                                ).toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-center gap-4">
                                            {wishlists.product && (
                                                <Link
                                                    preserveScroll
                                                    href={route("cart.store")}
                                                    method="post"
                                                    data={{
                                                        product_id:
                                                            wishlists.product
                                                                .id,
                                                        quantity: 1,
                                                    }}
                                                    className=" p-2 rounded-full bg-slate-300 transition-colors duration-200"
                                                >
                                                    <MdOutlineAddShoppingCart className="text-slate-800 size-4" />
                                                </Link>
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleDelete(wishlists.id)
                                                }
                                                className=" p-2 rounded-full hover:bg-slate-300 transition-colors duration-300 ease-in-out"
                                            >
                                                <RiDeleteBinLine className="text-slate-800 size-4 " />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center gap-2 justify-center">
                                    <h1 className="text-md font-medium text-slate-900 tracking-wide">
                                        You haven't saved any items yet.
                                    </h1>
                                    <h1 className="text-xs text-slate-600 text-center">
                                        It looks like your wishlist is waiting
                                        for some great finds. Start exploring
                                        now!
                                    </h1>
                                    <div className="bg-slate-300 p-3 rounded-full">
                                        <RiHeartAdd2Line className="size-6 text-slate-700" />
                                    </div>
                                    <div className="flex items-center justify-center pt-5 w-full">
                                        <Link href={route("customer.products")}>
                                            <button className="text-xs px-8 py-4 rounded-full text-slate-50 font-semibold flex items-center bg-slate-800  transition-colors duration-200">
                                                <HiMiniArrowLongLeft className="mr-2" />
                                                Discover More Favorites
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
