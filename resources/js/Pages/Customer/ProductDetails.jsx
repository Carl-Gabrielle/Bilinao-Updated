import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { FaStar, FaRegHeart, FaStarHalfAlt } from "react-icons/fa";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { FaPesoSign, FaRegStar } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head, Link } from "@inertiajs/react";
import { IoCheckmarkSharp } from "react-icons/io5";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import Banner from "@/Components/Banner";

export default function ProductDetails({
    product,
    auth,
    seller,
    relatedProducts = [],
    success,
}) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0]?.image_path || ""
    );
    const handleBuyNow = () => {
        axios
            .post(route("cart.buyNow"), {
                product_id: product.id,
                quantity: quantity,
            })
            .then((response) => {
                if (response.data.redirect) {
                    Inertia.visit(response.data.redirect);
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error adding the product to the cart:",
                    error
                );
            });
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
            <div className="min-h-screen pt-20 pb-1">
                <Head title={`${product.name} Details`} />
                <Banner
                    title="Products/"
                    suffix={product.category.name}
                    prefix="/Product Details"
                />
                <main>
                    {isVisible && success && (
                        <div id="toast" className="fixed bottom-0  z-50 w-full">
                            <div className="bg-slate-700 bg-opacity-60 backdrop-blur-lg px-6 py-5  shadow-inner flex flex-col gap-3 sm:flex-row items-center justify-between space-x-3 rounded-t-3xl">
                                <div className="flex items-center space-x-4 bg-slate-100  bg-opacity-80 backdrop-blur-lg  py-2 px-4 rounded-md ">
                                    <div className="sm:size-6  size-4 bg-green-500 flex items-center justify-center rounded-full">
                                        <IoCheckmarkSharp className="text-slate-100  " />
                                    </div>
                                    <span className="sm:text-sm text-xs font-semibold  ">
                                        <span className="font-medium space-x-1">
                                            Product
                                        </span>
                                        <span> "{product.name}" </span>
                                        <span className="font-medium">
                                            {success}
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <Link href={route("customer.carts")}>
                                        <button className="bg-slate-100 text-sm   bg-opacity-80 backdrop-blur-lg flex items-center   font-medium  px-6  py-2 rounded-full">
                                            View Cart
                                            <HiMiniArrowLongRight className=" ml-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <CustomerContainer>
                        <Link
                            href={route("customer.products")}
                            className="w-1/2"
                        >
                            <button className="mb-6 font-semibold text-slate-800 bg-slate-100 rounded-full px-4 py-2 text-sm shadow-lg">
                                <MdOutlineKeyboardArrowLeft className="inline-block  " />
                                Back to Product
                            </button>
                        </Link>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="mb-4 overflow-hidden h-96">
                                {selectedImage ? (
                                    <img
                                        src={`/storage/${selectedImage}`}
                                        alt={product.name}
                                        className="w-full h-96 object-cover rounded-3xl"
                                    />
                                ) : (
                                    <p className="text-center text-gray-600 text-lg">
                                        No Images Available
                                    </p>
                                )}
                            </div>
                            <div className="max-w-lg mx-auto flex flex-col items-start justify-center">
                                <p className="mt-5 text-slate-800 text-xl font-bold mb-4">
                                    Category: {product.category.name}
                                </p>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-Roboto text-gray-900 leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {product.description}
                                </p>

                                {product.stock > 0 ? (
                                    <p className="text-slate-800 text-sm mb-5 font-medium">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md">
                                            In Stock:
                                        </span>{" "}
                                        {product.stock} products
                                    </p>
                                ) : (
                                    <p className="text-slate-800 text-xs mb-5 font-medium">
                                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-md shadow-md">
                                            Out of Stock:
                                        </span>{" "}
                                        {product.stock} products
                                    </p>
                                )}
                                <div className="flex items-center text-slate-800 font-bold text-xl mb-4">
                                    <FaPesoSign className="text-lg" />
                                    <span className="ml-1">
                                        {product.price}
                                    </span>
                                </div>
                                <div className="mb-6 flex items-center justify-between space-x-4">
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <FaStar className="text-sm" />
                                        <FaStar className="text-sm" />
                                        <FaStar className="text-sm" />
                                        <FaStarHalfAlt className="text-sm" />
                                        <FaRegStar className="text-sm" />
                                    </div>

                                    <span className="text-gray-600 text-sm">
                                        140 reviews | 431 sold
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <Link
                                            href={route(
                                                "seller.public.profile",
                                                {
                                                    seller: product.seller.id,
                                                }
                                            )}
                                        >
                                            <p className="text-slate-800 flex items-center ">
                                                <IoStorefrontOutline className="mr-2" />
                                                <span className="font-semibold">
                                                    {product.seller.name}
                                                </span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="border-slate-500 border shadow-md text-slate-800 px-3 py-2 rounded-full flex items-center justify-between">
                                    <button
                                        onClick={handleDecrease}
                                        className="text-sm bg-slate-800 text-white size-6 flex items-center justify-center rounded-full"
                                    >
                                        -
                                    </button>
                                    <span className="px-7">{quantity}</span>
                                    <button
                                        onClick={handleIncrease}
                                        className="text-sm bg-slate-800 text-white size-6 flex items-center justify-center rounded-full"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="py-4 w-full flex flex-col sm:flex-row gap-4">
                                    {product.stock > 0 && (
                                        <button
                                            onClick={handleBuyNow}
                                            className="  sm:w-52 w-full gap-4 px-4 py-3 mt-3 font-medium text-sm  text-slate-800 transition-all duration-200 bg-slate-50 rounded-full shadow lg:mt-0 "
                                        >
                                            Buy Now
                                        </button>
                                    )}

                                    {product.stock > 0 ? (
                                        <Link
                                            href={route("cart.store")}
                                            method="post"
                                            data={{
                                                product_id: product.id,
                                                quantity: quantity,
                                            }}
                                        >
                                            <button className=" sm:w-52 w-full gap-4 px-4 py-3 mt-3 font-medium text-sm  text-white transition-all duration-200 bg-slate-800 rounded-full shadow lg:mt-0">
                                                Add to Cart
                                            </button>
                                        </Link>
                                    ) : (
                                        <div className="flex items-center cursor-not-allowed justify-center sm:w-52 w-full gap-4 px-4 py-3 mt-3 text-xs font-medium bg-red-50 text-red-600 rounded-full shadow-md lg:mt-0">
                                            <span>Out of Stock</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {product.images?.length > 0 && (
                            <div className="flex overflow-x-auto space-x-4">
                                {product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`relative w-24 h-24 cursor-pointer rounded-md border-2 transition-all duration-300 ${
                                            selectedImage === image.image_path
                                                ? "border-green-500"
                                                : "border-transparent"
                                        } hover:border-gray-800`}
                                        onClick={() =>
                                            setSelectedImage(image.image_path)
                                        }
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="h-screen">
                            <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide mb-6 mt-16">
                                Product Ratings & Reviews
                            </h1>
                            <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide mb-6 mt-16">
                                Customer Says
                            </h1>
                        </div>
                        {relatedProducts.length > 0 && (
                            <div className="mt-20">
                                <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide mb-6">
                                    Related Products
                                </h1>
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
                                    {relatedProducts.map((relatedProduct) => (
                                        <Link
                                            key={relatedProduct.id}
                                            href={route(
                                                "product.show",
                                                relatedProduct.id
                                            )}
                                        >
                                            <div className="bg-white bg-opacity-30 backdrop-blur-md  rounded-2xl p-4 flex space-x-2 shadow-lg">
                                                {relatedProduct.images &&
                                                relatedProduct.images.length >
                                                    0 ? (
                                                    relatedProduct.images
                                                        .length === 1 ? (
                                                        <img
                                                            src={`/storage/${relatedProduct.images[0].image_path}`}
                                                            alt={`${relatedProduct.name} image 1`}
                                                            className="w-full h-48 object-cover mb-4 rounded-lg"
                                                        />
                                                    ) : (
                                                        <>
                                                            <img
                                                                src={`/storage/${relatedProduct.images[0].image_path}`}
                                                                alt={`${relatedProduct.name} image 1`}
                                                                className="w-1/2 h-48 object-cover mb-4 rounded-lg"
                                                            />
                                                            {relatedProduct
                                                                .images.length >
                                                                1 && (
                                                                <img
                                                                    src={`/storage/${relatedProduct.images[1].image_path}`}
                                                                    alt={`${relatedProduct.name} image 2`}
                                                                    className="w-1/2 h-48 object-cover mb-4 rounded-lg"
                                                                />
                                                            )}
                                                        </>
                                                    )
                                                ) : (
                                                    <p className="text-center text-gray-600 text-lg">
                                                        No Images Available
                                                    </p>
                                                )}
                                            </div>

                                            <div className=" text-xs p-3 flex items-center justify-between">
                                                <div>
                                                    <h3 className="pb-1 text-md font-semibold">
                                                        {relatedProduct.name}
                                                    </h3>
                                                    <p className="text-sm">
                                                        <FaPesoSign className="inline-block mr-1" />
                                                        {Number(
                                                            relatedProduct.price
                                                        ).toLocaleString(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                                {relatedProduct.stock > 0 ? (
                                                    <Link
                                                        href={route(
                                                            "cart.store"
                                                        )}
                                                        method="post"
                                                        data={{
                                                            product_id:
                                                                relatedProduct.id,
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
                            </div>
                        )}
                    </CustomerContainer>
                </main>
            </div>
        </CustomerLayout>
    );
}
