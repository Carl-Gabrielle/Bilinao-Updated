import React, { useState, useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { FaRegCheckSquare } from "react-icons/fa";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import ProductLink from "@/Components/ProductLink";
import { FaStar, FaRegHeart, FaStarHalfAlt } from "react-icons/fa";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { FaPesoSign, FaRegStar, FaLink } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { GrCart } from "react-icons/gr";
import ProfileImg from "../Illustrations/profile.jpeg";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head, Link, router } from "@inertiajs/react";
import { IoCheckmarkSharp } from "react-icons/io5";
import CustomerLayout from "@/Layouts/CustomerLayout";
import CustomerContainer from "@/Components/CustomerContainer";
import Banner from "@/Components/Banner";
import { applyFloatingAnimation } from "../Animations/gsap";
export default function ProductDetails({
    product,
    auth,
    seller,
    relatedProducts = [],
    success,
}) {
    const { user } = auth;
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    const handleIncrease = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        } else {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        }
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0]?.image_path || ""
    );

    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const imageRef = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            applyFloatingAnimation(imageRef.current);
        }
    }, [selectedImage]);
    const [actionType, setActionType] = useState(null); // Tracks 'cart' or 'wishlist'

    // Function to handle adding to cart
    const handleAddToCart = async (productId) => {
        setActionType("cart");
    };

    // Function to handle adding to wishlist
    const handleAddToWishlist = async (productId) => {
        setActionType("wishlist");
    };

    const handleBuyNow = e => {
        const item = {
            product_id: product.id,
            quantity: quantity,
        };
        console.log('submitted', { items: [item] });

        router.get(route("show.checkout", { items: [item] }));
    }


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
                        <div id="toast" className="fixed bottom-0 z-50 w-full">
                            <div className="flex flex-col items-center justify-between gap-3 px-6 py-5 space-x-3 shadow-inner bg-slate-700 bg-opacity-60 backdrop-blur-lg sm:flex-row rounded-t-3xl">
                                <div className="flex items-center px-4 py-2 space-x-4 rounded-md bg-slate-100 bg-opacity-80 backdrop-blur-lg">
                                    <div className="flex items-center justify-center bg-green-500 rounded-full sm:size-6 size-4">
                                        <IoCheckmarkSharp className="text-slate-100" />
                                    </div>
                                    <span className="text-xs font-medium sm:text-sm">
                                        <span>{success}</span>
                                    </span>
                                </div>
                                <div>
                                    {/* Conditionally rendering the button based on actionType */}
                                    <Link
                                        href={route(
                                            actionType === "cart"
                                                ? "customer.carts"
                                                : "customer.myWishlists"
                                        )}
                                    >
                                        <button className="flex items-center px-6 py-2 text-sm font-medium rounded-full bg-slate-100 bg-opacity-80 backdrop-blur-lg">
                                            {actionType === "cart"
                                                ? "View Cart"
                                                : "View Wishlists"}
                                            <HiMiniArrowLongRight className="ml-2" />
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
                            <button className="px-4 py-2 mb-6 text-sm font-semibold rounded-full shadow-lg text-slate-800 bg-slate-100">
                                <MdOutlineKeyboardArrowLeft className="inline-block " />
                                Back to Product
                            </button>
                        </Link>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="flex items-center justify-center mb-4 overflow-hidden bg-opacity-50 shadow-md h-96 bg-slate-50 backdrop-blur-md rounded-3xl">
                                {selectedImage ? (
                                    <img
                                        ref={imageRef}
                                        src={`/storage/${selectedImage}`}
                                        alt={product?.name}
                                        className="object-cover rounded-md size-80"
                                    />
                                ) : (
                                    <p className="text-lg text-center text-gray-600">
                                        No Images Available
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col items-start justify-center max-w-lg mx-auto">
                                <p className="mt-5 mb-4 text-xl font-medium text-slate-800">
                                    Category: {product.category.name}
                                </p>
                                <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl font-Roboto">
                                    {product.name}
                                </h1>
                                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                    {product.description}
                                </p>
                                {product.stock > 0 ? (
                                    <span className="mb-5 text-sm font-medium text-slate-800">
                                        <span className="px-3 py-1 rounded-full shadow-inner text-emerald-100 bg-emerald-600">
                                            <FaRegCheckSquare className="inline-block mr-2" />
                                            In Stock
                                        </span>{" "}
                                        {product.stock} products
                                    </span>
                                ) : (
                                    <p className="mb-5 text-sm font-medium text-slate-800">
                                        <span className="px-3 py-1 text-red-100 bg-red-600 rounded-full shadow-inner">
                                            <MdOutlineRemoveShoppingCart className="inline-block mr-2" />
                                            Out of Stock
                                        </span>{" "}
                                        {product.stock} product
                                    </p>
                                )}
                                <div className="flex items-center mb-4 text-xl font-bold text-slate-800">
                                    <FaPesoSign className="text-lg" />
                                    <span className="ml-1">
                                        {product.price}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mb-6 space-x-4">
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <FaStar className="text-sm" />
                                        <FaStar className="text-sm" />
                                        <FaStar className="text-sm" />
                                        <FaStarHalfAlt className="text-sm" />
                                        <FaRegStar className="text-sm" />
                                    </div>
                                    <span className="text-sm text-gray-600">
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
                                            <p className="flex items-center text-slate-800 ">
                                                <IoStorefrontOutline className="mr-2" />
                                                <span className="font-semibold">
                                                    {product.seller.name}
                                                </span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                {product.stock > 0 && (
                                    <div className="flex items-center w-full space-x-4 ">
                                        <div className="flex items-center justify-between px-3 py-2 bg-opacity-50 rounded-full shadow-md bg-slate-50 backdrop-blur-md text-slate-800">
                                            <button
                                                onClick={handleDecrease}
                                                className="flex items-center justify-center text-sm text-white rounded-full bg-slate-800 size-6"
                                            >
                                                -
                                            </button>
                                            <span className="px-7">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={handleIncrease}
                                                className="flex items-center justify-center text-sm text-white rounded-full bg-slate-800 size-6"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {/* Popup Notification */}
                                        {showPopup && (
                                            <div className="z-10 fixed  bottom-5 right-5 bg-red-100 font-semibold text-red-800  px-2 py-0.5 text-md rounded-lg shadow-lg transition-opacity">
                                                You can't add more than{" "}
                                                {product.stock} items in stock.
                                            </div>
                                        )}
                                        <Link
                                            preserveScroll
                                            href={route(
                                                "customer.storeWishlists"
                                            )}
                                            method="post"
                                            data={{
                                                product_id: product.id,
                                            }}
                                            onClick={() =>
                                                handleAddToWishlist(product.id)
                                            }
                                        >
                                            <div className="p-2 border rounded-full shadow-md border-slate-500">
                                                <FaRegHeart />
                                            </div>
                                        </Link>
                                        <ProductLink
                                            productId={product.id}
                                            success={success}
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col w-full gap-4 py-4 sm:flex-row">
                                    {product.stock > 0 && (
                                        <>

                                            <button onClick={handleBuyNow} className="w-full gap-4 px-4 py-3 mt-3 text-sm font-medium border rounded-full shadow-md sm:w-52 text-slate-800 border-slate-500 lg:mt-0">
                                                Buy Now
                                            </button>

                                            <Link
                                                preserveScroll
                                                href={route("cart.store")}
                                                method="post"
                                                data={{
                                                    product_id: product.id,
                                                    quantity: quantity,
                                                }}
                                                onClick={() =>
                                                    handleAddToCart(product.id)
                                                }
                                            >
                                                <button className="w-full gap-4 px-4 py-3 mt-3 text-sm font-medium text-white rounded-full shadow-inner sm:w-52 bg-slate-800 lg:mt-0">
                                                    Add to Cart
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {product.images?.length > 0 && (
                            <div className="flex space-x-4 overflow-x-auto">
                                {product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`relative w-24 h-24 cursor-pointer rounded-md border-2 transition-all duration-300 ${selectedImage === image.image_path
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
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="h-full">
                            <h1 className="mt-16 mb-6 text-2xl font-medium leading-relaxed tracking-wider uppercase text-slate-900">
                                Product Ratings & Reviews
                            </h1>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Customer Reviews Section */}
                                <div className="col-span-1 pr-4 border-0 sm:border-r border-slate-400 ">
                                    <h1 className="text-xl font-semibold text-slate-900">
                                        Customer Reviews
                                    </h1>
                                    <div className="flex items-center mt-5 space-x-3">
                                        <div className="flex items-center space-x-1 text-lg text-yellow-500">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStarHalfAlt />
                                            <FaRegStar />
                                        </div>
                                        <span className="text-sm text-slate-800">
                                            4.7 out of 5
                                        </span>
                                    </div>
                                </div>
                                {/* Star Rating Distribution */}
                                <div className="flex flex-col justify-center col-span-2">
                                    {[5, 4, 3, 2, 1].map((star, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between my-1 space-x-2"
                                        >
                                            <span className="flex items-center text-sm text-slate-800">
                                                <span className="mr-2">
                                                    {" "}
                                                    {star}
                                                </span>{" "}
                                                star
                                            </span>
                                            {/* Progress Bar */}
                                            <div className="w-full h-3 rounded-full bg-slate-200">
                                                <div
                                                    className="h-3 bg-yellow-500 rounded-full"
                                                    style={{
                                                        width: `${(5 - star + 1) * 20
                                                            }%`,
                                                    }} // Example percentage
                                                ></div>
                                            </div>
                                            <span className="text-sm text-slate-800">
                                                {(5 - star + 1) * 20}%
                                            </span>{" "}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h1 className="mt-10 mb-6 text-2xl font-medium leading-relaxed tracking-wider uppercase text-slate-900">
                                Customer Says
                            </h1>
                            <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-800">
                                <div>
                                    <span>Showing 1-5 of 160 results</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span>Sort By: </span>
                                    <span className="flex items-center px-3 py-1 transition-colors duration-300 ease-in-out border rounded-full cursor-pointer border-slate-500">
                                        Recent Reviews{" "}
                                        <MdOutlineKeyboardArrowDown className="ml-2" />
                                    </span>
                                </div>
                            </div>
                            {/* CUSTOMER REVIEWS */}
                            <div className="px-4 py-4 mt-4 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {/* CUSTOMER PROFILE */}
                                        <img
                                            src={ProfileImg}
                                            alt="CustomerProfile"
                                            className="object-cover border-2 rounded-full size-12 border-slate-700 border-opacity-30 backdrop-blur-md"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-slate-800">
                                                {user.name}
                                            </span>
                                            <span className="w-32 px-2 py-1 text-xs font-medium rounded-md bg-slate-600 bg-opacity-30 backdrop-blur-md text-slate-800 ">
                                                Verified Purchase
                                            </span>
                                        </div>
                                    </div>
                                    {/*DATE AND RATINGS  */}
                                    <div>
                                        <span className="text-xs text-slate-800 ">
                                            November 28,2024
                                        </span>
                                        <div className="flex items-center mt-2 space-x-1 text-xs text-yellow-500">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStarHalfAlt />
                                            <FaRegStar />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 px-14">
                                    <h1 className="text-sm text-slate-800">
                                        I absolutely love this vase! It arrived
                                        in perfect condition and looks stunning
                                        in my living room. The craftsmanship is
                                        excellent, and it adds a beautiful touch
                                        to my home decor.
                                    </h1>
                                </div>
                                <hr className="mt-2 border-slate-300" />
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-3">
                                        {/* CUSTOMER PROFILE */}
                                        <img
                                            src={ProfileImg}
                                            alt="CustomerProfile"
                                            className="object-cover border-2 rounded-full size-12 border-slate-700 border-opacity-30 backdrop-blur-md"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-slate-800">
                                                John Legaspi
                                            </span>
                                            <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-700 bg-opacity-30 backdrop-blur-md text-slate-800 ">
                                                Verified Purchase
                                            </span>
                                        </div>
                                    </div>
                                    {/*DATE AND RATINGS  */}
                                    <div>
                                        <span className="text-xs text-slate-800 ">
                                            August 12,2024
                                        </span>
                                        <div className="flex items-center mt-2 space-x-1 text-xs text-yellow-500">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStarHalfAlt />
                                            <FaRegStar />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 px-14">
                                    <h1 className="text-sm text-slate-800">
                                        I absolutely love this vase! It arrived
                                        in perfect condition and looks stunning
                                        in my living room. The craftsmanship is
                                        excellent, and it adds a beautiful touch
                                        to my home decor.
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {relatedProducts.length > 0 && (
                            <div className="mt-20">
                                <h1 className="mb-6 text-2xl font-medium tracking-wide uppercase text-slate-900">
                                    Related Products
                                </h1>
                                <div className="grid grid-cols-2 gap-8 pb-10 lg:grid-cols-3 xl:grid-cols-4">
                                    {relatedProducts.map((relatedProduct) => (
                                        <Link
                                            key={relatedProduct.id}
                                            href={route(
                                                "product.show",
                                                relatedProduct.id
                                            )}
                                        >
                                            <div className="flex p-4 space-x-2 shadow-lg bg-slate-50 bg-opacity-30 backdrop-blur-md rounded-2xl">
                                                {relatedProduct.images &&
                                                    relatedProduct.images.length >
                                                    0 ? (
                                                    relatedProduct.images
                                                        .length === 1 ? (
                                                        <img
                                                            src={`/storage/${relatedProduct.images[0].image_path}`}
                                                            alt={`${relatedProduct.name} image 1`}
                                                            className="object-cover w-full h-48 mb-4 rounded-lg"
                                                        />
                                                    ) : (
                                                        <>
                                                            <img
                                                                src={`/storage/${relatedProduct.images[0].image_path}`}
                                                                alt={`${relatedProduct.name} image 1`}
                                                                className="object-cover w-1/2 h-48 mb-4 rounded-lg"
                                                            />
                                                            {relatedProduct
                                                                .images.length >
                                                                1 && (
                                                                    <img
                                                                        src={`/storage/${relatedProduct.images[1].image_path}`}
                                                                        alt={`${relatedProduct.name} image 2`}
                                                                        className="object-cover w-1/2 h-48 mb-4 rounded-lg"
                                                                    />
                                                                )}
                                                        </>
                                                    )
                                                ) : (
                                                    <p className="text-lg text-center text-gray-600">
                                                        No Images Available
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between p-3 text-xs ">
                                                <div>
                                                    <h3 className="pb-1 font-semibold text-md">
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
                                                        preserveScroll
                                                        href={route(
                                                            "cart.store"
                                                        )}
                                                        method="post"
                                                        data={{
                                                            product_id:
                                                                relatedProduct.id,
                                                            quantity: 1,
                                                        }}
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        <div className="px-3 py-3 text-white rounded-full bg-slate-800">
                                                            <GrCart size={15} />
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div className="w-full px-2 py-1 text-xs text-center text-gray-600 rounded-full cursor-not-allowed bg-slate-100 sm:w-1/2 sm:py-2">
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
        </CustomerLayout >
    );
}
