import React, { useState } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import emptyImg from "../Illustrations/empty.png";
import { RiDeleteBinLine } from "react-icons/ri";
import Banner from "@/Components/Banner";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";

export default function Carts({ auth, carts, cartCount }) {
    const [cartItems, setCartItems] = useState(carts);

    const updateQuantity = (id, quantity) => {
        setCartItems(
            cartItems.map((cart) =>
                cart.product.id === id ? { ...cart, quantity } : cart
            )
        );
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(route("cart.destroy", id));
            setCartItems(cartItems.filter((cart) => cart.product.id !== id));
        } catch (error) {
            console.error(
                "There was an error removing the item from the cart!",
                error
            );
        }
    };
    const handleIncrement = (id) => {
        const updatedCart = cartItems.map((cart) =>
            cart.product.id === id
                ? { ...cart, quantity: cart.quantity + 1 }
                : cart
        );
        setCartItems(updatedCart);
        updateQuantity(
            id,
            cartItems.find((cart) => cart.product.id === id).quantity + 1
        );
    };

    const handleDecrement = (id) => {
        const updatedCart = cartItems.map((cart) =>
            cart.product.id === id && cart.quantity > 1
                ? { ...cart, quantity: cart.quantity - 1 }
                : cart
        );
        setCartItems(updatedCart);
        updateQuantity(
            id,
            Math.max(
                cartItems.find((cart) => cart.product.id === id).quantity - 1,
                1
            )
        );
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Carts" />
            <div className="min-h-screen bg-gray-100 pt-20 pb-1">
                <Banner title="Carts" />
                <CustomerContainer className="mt-32">
                    <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide">
                        Your Cart{" "}
                        <span className="bg-lime-700 text-white px-4 rounded-md">
                            {cartCount}
                        </span>
                    </h1>
                    <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-2 shadow-lg rounded-2xl bg-white">
                            <div className="flex items-center justify-between py-5 px-4 sm:px-0  space-x-14 bg-lime-700 text-white rounded-t-2xl">
                                <span className="uppercase text-xs flex-1 text-center">
                                    Product
                                </span>
                                <span className="uppercase text-xs flex-1 text-center">
                                    Quantity
                                </span>
                                <span className="uppercase text-xs flex-1 text-center">
                                    Subtotal
                                </span>
                            </div>
                            {cartItems.length > 0 ? (
                                <div className="space-y-4 px-4 py-2">
                                    {cartItems.map((cart) => {
                                        const subtotal =
                                            cart.product.price * cart.quantity;
                                        const imageUrl =
                                            cart.product.images &&
                                            cart.product.images.length > 0
                                                ? `/storage/${cart.product.images[0].image_path}`
                                                : "/path/to/default/image.jpg";
                                        return (
                                            <div
                                                key={cart.product.id}
                                                className="flex items-center border p-2 rounded-lg mt-2"
                                            >
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        cart.product.id
                                                    )}
                                                    className="flex-shrink-0"
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={cart.product.name}
                                                        className="sm:size-20 size-10 object-cover rounded"
                                                    />
                                                </Link>
                                                <div className="flex-1 ml-4 text-xs text-slate-800 ">
                                                    <h3 className="font-semibold  ">
                                                        {cart.product.name}
                                                    </h3>
                                                    <p className=" flex items-center">
                                                        <FaPesoSign />
                                                        {cart.product.price}
                                                    </p>
                                                </div>
                                                <div className="flex-1 text-center text-xs">
                                                    <div className="flex items-center justify-center  space-x-2 sm:space-x-8 bg-slate-100 py-1 sm:py-2 sm:px-3 px-1  rounded-full">
                                                        <button
                                                            onClick={() =>
                                                                handleDecrement(
                                                                    cart.product
                                                                        .id
                                                                )
                                                            }
                                                            className="sm:size-7  size-4 bg-lime-700 text-white flex items-center justify-center rounded-full"
                                                        >
                                                            -
                                                        </button>
                                                        <p className="text-gray-600">
                                                            {cart.quantity}
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                handleIncrement(
                                                                    cart.product
                                                                        .id
                                                                )
                                                            }
                                                            className="sm:size-7  size-4 bg-lime-700 text-white flex items-center justify-center rounded-full"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-right  text-xs text-slate-800">
                                                    <p className=" flex items-center justify-end">
                                                        <FaPesoSign />
                                                        {subtotal.toFixed(2)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            cart.product.id
                                                        )
                                                    }
                                                    className="sm:ml-4 ml-2 hover:bg-slate-100 px-2 py-2 rounded-full transition-colors duration-300 ease-in-out"
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <>
                                    <div className="my-5  flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center gap-2 justify-center">
                                            <p>No items in the cart</p>
                                            <img
                                                className="w-40 h-32"
                                                src={emptyImg}
                                                alt="emptyIcon"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center pt-10">
                                            <Link
                                                href={route(
                                                    "customer.products"
                                                )}
                                            >
                                                <button className=" sm:self-start self-center px-8 py-3 rounded-full text-white font-semibold flex items-center bg-lime-700">
                                                    Continue Shopping{" "}
                                                    <HiMiniArrowLongRight className="ml-2" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-full lg:w-96 rounded-2xl flex flex-col min-h-full">
                            <div className="py-4 px-6 bg-lime-700 text-white rounded-t-2xl">
                                <span className="uppercase text-xs flex-1">
                                    Order Summary
                                </span>
                            </div>
                        </div>
                    </div>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
