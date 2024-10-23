import React, { useState } from "react";
import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import emptyImg from "../Illustrations/empty.png";
import { RiDeleteBinLine } from "react-icons/ri";
import Banner from "@/Components/Banner";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import CustomCheckbox from "@/Components/CustomCheckbox";

export default function Carts({ auth, carts, cartCount }) {
    const [cartItems, setCartItems] = useState(carts);
    const [checkedItemIds, setCheckedItemIds] = useState([]);
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
            // Clear checked item if deleted
            if (checkedItemId === id) {
                setCheckedItemId(null);
            }
        } catch (error) {
            console.error("Error removing item from the cart!", error);
        }
    };

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

    // MANAGING SELECTED ITEMS

    const handleChange = (id, qty, cartId) => {
        const isItemChecked = checkedItemIds.some(
            (item) => item.product_id === id
        );

        if (isItemChecked) {
            setCheckedItemIds(
                checkedItemIds.filter((item) => item.product_id !== id)
            );
        } else {
            setCheckedItemIds([
                ...checkedItemIds,
                { product_id: id, quantity: qty, cart_id: cartId },
            ]);
        }
    };

    const handleCheckout = () => {
        console.log("submitted", { items: checkedItemIds });
        router.get(
            route("show.checkout", { items: checkedItemIds, from_cart: true })
        );
    };

    return (
        <CustomerLayout user={auth.user}>
            <Head title="Carts" />
            <div className="min-h-screen pt-20 pb-1">
                <Banner title="Shopping Cart" />
                <CustomerContainer className="mt-32 ">
                    <div className="flex items-center space-x-3">
                        <hr className="mb-6 border w-28 border-slate-800" />
                        <h1 className="mb-6 text-2xl font-bold tracking-widest uppercase text-slate-800">
                            Cart Lists
                        </h1>
                    </div>
                    <h1 className="text-2xl font-medium tracking-wide uppercase text-slate-900">
                        Your Cart{" "}
                        <span className="px-4 text-white rounded-md bg-slate-800">
                            {cartCount}
                        </span>
                    </h1>
                    <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-3">
                        <div className="col-span-2 shadow-lg rounded-2xl bg-slate-50 bg-opacity-60 backdrop-blur-lg">
                            <div className="flex items-center justify-between px-4 py-5 text-xs text-white sm:px-0 space-x-14 bg-slate-800 rounded-t-2xl">
                                <span className="flex-1 text-center uppercase">
                                    Product
                                </span>
                                <span className="flex-1 text-center uppercase">
                                    Quantity
                                </span>
                                <span className="flex-1 text-center uppercase">
                                    Subtotal
                                </span>
                            </div>
                            {cartItems.length > 0 ? (
                                <div className="px-4 py-2 space-y-4">
                                    {cartItems.map((cart) => {
                                        const subtotal =
                                            cart.product.price * cart.quantity;
                                        return (
                                            <div
                                                key={cart.id}
                                                className="p-2 mt-2 border rounded-lg border-slate-400"
                                            >
                                                <Link
                                                    href={route(
                                                        "seller.public.profile",
                                                        {
                                                            seller: cart.product
                                                                .seller.id,
                                                        }
                                                    )}
                                                >
                                                    <span className="text-xs inline-flex items-center text-slate-700 font-medium hover:text-slate-900 border bg-slate-300 shadow-inner px-2 py-0.5 rounded-full  transition-colors duration-200 ease-in-out">
                                                        <IoStorefrontOutline className="mr-2" />
                                                        {
                                                            cart.product.seller
                                                                .name
                                                        }
                                                        <MdKeyboardArrowRight />
                                                    </span>
                                                </Link>

                                                <div className="flex items-center mt-2">
                                                    <CustomCheckbox
                                                        isChecked={checkedItemIds.some(
                                                            (item) =>
                                                                item.product_id ===
                                                                cart.product.id
                                                        )}
                                                        onChange={() =>
                                                            handleChange(
                                                                cart.product.id,
                                                                cart.quantity,
                                                                cart.id
                                                            )
                                                        }
                                                    />
                                                    <Link
                                                        href={route(
                                                            "product.show",
                                                            cart.product.id
                                                        )}
                                                        className="flex-shrink-0"
                                                    >
                                                        <img
                                                            src={`/storage/${cart.product.images[0].image_path}`}
                                                            alt={
                                                                cart.product
                                                                    .name
                                                            }
                                                            className="object-cover rounded sm:size-16 size-10"
                                                        />
                                                    </Link>
                                                    <div className="flex-1 ml-4 text-xs text-slate-800 ">
                                                        <h3 className="font-semibold">
                                                            {cart.product.name}
                                                        </h3>
                                                        <p className="flex items-center">
                                                            <FaPesoSign />
                                                            {Number(
                                                                cart.product
                                                                    .price
                                                            ).toLocaleString(
                                                                "en-US",
                                                                {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex-1 text-xs text-center">
                                                        <div className="flex items-center justify-center px-1 py-1 space-x-2 rounded-full sm:space-x-8 bg-slate-300 sm:py-2 sm:px-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleDecrement(
                                                                        cart.id
                                                                    )
                                                                }
                                                                className="flex items-center justify-center text-white rounded-full sm:size-7 size-4 bg-slate-800"
                                                            >
                                                                -
                                                            </button>
                                                            <p className="text-slate-800">
                                                                {cart.quantity}
                                                            </p>
                                                            <button
                                                                onClick={() =>
                                                                    handleIncrement(
                                                                        cart.id
                                                                    )
                                                                }
                                                                className="flex items-center justify-center text-white rounded-full sm:size-7 size-4 bg-slate-800"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-xs text-right text-slate-800">
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
                                                            handleDelete(
                                                                cart.id
                                                            )
                                                        }
                                                        className="px-1 py-1 ml-2 transition-colors duration-300 ease-in-out border rounded-full sm:ml-4 hover:bg-slate-200 sm:px-2 sm:py-2 border-slate-400"
                                                    >
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-between my-5 text-sm text-medium ">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <h1 className="font-medium tracking-wide text-md text-slate-900">
                                            Your cart is empty
                                        </h1>
                                        <h1 className="text-xs text-slate-600 ">
                                            Looks like you haven't added any
                                            products to your cart yet.
                                        </h1>
                                        <div className="p-3 rounded-full bg-slate-300">
                                            <MdOutlineAddShoppingCart className="size-6 text-slate-700 " />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center w-full pt-5">
                                        <Link href={route("customer.products")}>
                                            <button className="flex items-center self-center px-8 py-4 text-xs font-semibold text-white rounded-full sm:self-start bg-slate-800">
                                                <HiMiniArrowLongLeft className="mr-2" />
                                                Continue Shopping{" "}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Order Summary */}
                        <div className="flex flex-col w-full min-h-full lg:w-96 rounded-2xl">
                            <div className="px-6 py-4 text-white bg-slate-800 rounded-t-2xl">
                                <span className="flex-1 text-xs uppercase">
                                    Order Summary (FRONTEND ONLY)
                                </span>
                            </div>
                            <div className="flex flex-col text-sm shadow-lg bg-slate-50 bg-opacity-60 backdrop-blur-lg rounded-b-2xl h-72">
                                <div className="px-6 pt-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <p>Subtotal</p>
                                        <p>&#8369; 10</p>
                                    </div>
                                </div>
                                <div className="flex items-start justify-between px-6 py-2 font-semibold bg-slate-300">
                                    <p className="uppercase">Total</p>
                                    <p className="font-semibold ">
                                        &#8369; 325{" "}
                                    </p>
                                </div>
                                {cartItems.length > 0 && (
                                    <div className="p-6 mt-auto">
                                        <button
                                            onClick={handleCheckout}
                                            className={`flex items-center justify-center w-full px-8 py-4 font-semibold text-white rounded-full ${
                                                checkedItemIds.length === 0
                                                    ? "bg-slate-300 cursor-not-allowed"
                                                    : "bg-slate-800"
                                            }`}
                                            disabled={
                                                checkedItemIds.length === 0
                                            }
                                        >
                                            {checkedItemIds.length === 0
                                                ? "Please Select a Product"
                                                : "Proceed To Checkout"}{" "}
                                            <HiMiniArrowLongRight className="ml-2" />
                                        </button>
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
