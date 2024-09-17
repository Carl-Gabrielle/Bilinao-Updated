import React, { useState } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import emptyImg from "../Illustrations/empty.png";
import { RiDeleteBinLine } from "react-icons/ri";
import Banner from "@/Components/Banner";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
import axios from "axios"; // Import axios if not already imported
import { IoClose } from "react-icons/io5";

export default function Carts({ auth, carts, cartCount }) {
    const [cartItems, setCartItems] = useState(carts);

    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(route("cart.update", id), { quantity });
            setCartItems(
                cartItems.map((cart) =>
                    cart.id === id ? { ...cart, quantity } : cart
                )
            );
        } catch (error) {
            console.error("Error updating quantity!", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(route("cart.destroy", id));
            setCartItems(cartItems.filter((cart) => cart.id !== id));
        } catch (error) {
            console.error("Error removing item from the cart!", error);
        }
    };

    // Increment and Decrement handlers
    const handleIncrement = (id) => {
        const updatedQuantity =
            cartItems.find((cart) => cart.id === id).quantity + 1;
        updateQuantity(id, updatedQuantity);
    };

    const handleDecrement = (id) => {
        const currentQuantity = cartItems.find(
            (cart) => cart.id === id
        ).quantity;
        if (currentQuantity > 1) {
            const updatedQuantity = currentQuantity - 1;
            updateQuantity(id, updatedQuantity);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (acc, cart) => acc + cart.product.price * cart.quantity,
            0
        );
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Carts" />
            <div className="min-h-screen  pt-20 pb-1">
                <Banner title="Shopping Cart" />
                <CustomerContainer className="mt-32 ">
                    <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide">
                        Your Cart{" "}
                        <span className="bg-slate-800 text-white px-4 rounded-md">
                            {cartCount}
                        </span>
                    </h1>
                    <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-2 shadow-lg rounded-2xl bg-white bg-opacity-30 backdrop-blur-xs ">
                            <div className="text-xs flex items-center justify-between py-5 px-4 sm:px-0  space-x-14 bg-slate-800 text-white rounded-t-2xl">
                                <span className="uppercase  flex-1 text-center">
                                    Product
                                </span>
                                <span className="uppercase  flex-1 text-center">
                                    Quantity
                                </span>
                                <span className="uppercase flex-1 text-center">
                                    Subtotal
                                </span>
                            </div>
                            {cartItems.length > 0 ? (
                                <div className="space-y-4 px-4 py-2">
                                    {cartItems.map((cart) => {
                                        const subtotal =
                                            cart.product.price * cart.quantity;
                                        return (
                                            <div
                                                key={cart.id}
                                                className="flex items-center border border-slate-400 p-2 rounded-lg mt-2"
                                            >
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        cart.product.id
                                                    )}
                                                    className="flex-shrink-0"
                                                >
                                                    <img
                                                        src={`/storage/${cart.product.images[0].image_path}`}
                                                        alt={cart.product.name}
                                                        className="sm:size-20 size-10 object-cover rounded"
                                                    />
                                                </Link>
                                                <div className="flex-1 ml-4 text-xs text-slate-800 ">
                                                    <h3 className="font-semibold">
                                                        {cart.product.name}
                                                    </h3>
                                                    <p className="flex items-center">
                                                        <FaPesoSign />
                                                        {cart.product.price}
                                                    </p>
                                                </div>
                                                <div className="flex-1 text-center text-xs">
                                                    <div className="flex items-center justify-center space-x-2 sm:space-x-8 bg-slate-300 py-1 sm:py-2 sm:px-3 px-1 rounded-full">
                                                        <button
                                                            onClick={() =>
                                                                handleDecrement(
                                                                    cart.id
                                                                )
                                                            }
                                                            className="sm:size-7 size-4 bg-slate-800 text-white flex items-center justify-center rounded-full"
                                                        >
                                                            -
                                                        </button>
                                                        <p className="text-gray-600">
                                                            {cart.quantity}
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                handleIncrement(
                                                                    cart.id
                                                                )
                                                            }
                                                            className="sm:size-7 size-4 bg-slate-800 text-white flex items-center justify-center rounded-full"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-right text-xs text-slate-800">
                                                    <p className="flex items-center justify-end">
                                                        <FaPesoSign />
                                                        {subtotal.toLocaleString(
                                                            undefined,
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(cart.id)
                                                    }
                                                    className="sm:ml-4 ml-2 hover:bg-slate-300 px-2 py-2 rounded-full transition-colors duration-300 ease-in-out border border-slate-400"
                                                >
                                                    <IoClose />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="my-5 flex flex-col items-center justify-between text-xs text-medium">
                                    <div className="flex flex-col items-center gap-2 justify-center">
                                        <p>No items in the cart</p>
                                        {/* <img
                                            className="w-40 h-32"
                                            src={emptyImg}
                                            alt="emptyIcon"
                                        /> */}
                                    </div>
                                    <div className="flex items-center justify-center pt-10">
                                        <Link href={route("customer.products")}>
                                            <button className="text-xs sm:self-start self-center px-8 py-3 rounded-full text-white font-semibold flex items-center bg-slate-800">
                                                Continue Shopping{" "}
                                                <HiMiniArrowLongRight className="ml-2" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Order Summary */}
                        <div className="w-full lg:w-96 rounded-2xl flex flex-col min-h-full">
                            <div className="py-4 px-6 bg-slate-800 text-white rounded-t-2xl">
                                <span className="uppercase text-xs flex-1">
                                    Order Summary
                                </span>
                            </div>
                            <div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs shadow-lg rounded-b-2xl h-72 flex flex-col">
                                <div className="pt-5 px-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-md">Subtotal</p>
                                        <p className="text-md font-semibold">
                                            &#8369;{" "}
                                            {calculateTotal().toLocaleString(
                                                undefined,
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 flex justify-between items-start font-semibold bg-slate-300 py-2">
                                    <p>Total</p>
                                    <p className="text-md font-semibold">
                                        &#8369;{" "}
                                        {calculateTotal().toLocaleString(
                                            undefined,
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </p>
                                </div>
                                {cartItems.length > 0 && (
                                    <div className="mt-auto p-6">
                                        <Link href={route("cart.checkout")}>
                                            <button className="w-full flex items-center justify-center rounded-full text-white font-semibold px-8 py-4 bg-slate-800">
                                                Proceed to Checkout{" "}
                                                <HiMiniArrowLongRight className="ml-2" />
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
