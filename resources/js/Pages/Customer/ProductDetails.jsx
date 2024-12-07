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
import ProductRatingReviews from "@/Components/ProductRatingReviews";
import ReportModal from "@/Components/ReportModal";
export default function ProductDetails({
    product,
    auth,
    seller,
    relatedProducts = [],
    success,
    reviews, averageRating,
    isProductPublished
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
    const [actionType, setActionType] = useState(null);

    const handleAddToCart = async (productId) => {
        setActionType("cart");
    };

    const handleAddToWishlist = async (productId) => {
        setActionType("wishlist");
    };

    const handleBuyNow = (e) => {
        const item = {
            product_id: product.id,
            quantity: quantity,
        };
        console.log("submitted", { items: [item] });
        router.get(route("show.checkout", { items: [item] }));
    };
    const [isReportModalVisible, setReportModalVisible] = useState(false);

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
                                {!isProductPublished && (
                                    <p className="mb-5 text-xs font-medium text-red-600">
                                        <span className="px-3 py-2 bg-red-100  rounded-2xl text-nowrap">
                                            This product is currently unavailable because it has been unpublished by the seller.
                                        </span>
                                    </p>
                                )}
                                <p className="mt-5 mb-4 text-xl font-medium text-slate-800">
                                    Category: {product.category.name}
                                </p>
                                <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl font-Roboto">
                                    {product.name}
                                </h1>
                                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                    {product.description}
                                </p>
                                <div className="flex items-center mb-4 space-x-4">
                                    {product.stock > 0 ? (
                                        <span className="text-sm font-medium text-slate-800">
                                            <span className="px-3 py-1 rounded-full shadow-inner text-emerald-100 bg-emerald-600">
                                                <FaRegCheckSquare className="inline-block mr-2" />
                                                In Stock
                                            </span>{" "}
                                            {product.stock} {product.stock > 1 ? "products" : "product"}
                                        </span>
                                    ) : (
                                        <p className="mb-5 text-sm font-medium text-slate-800">
                                            <span className="px-3 py-1 text-red-100 bg-red-600 rounded-full shadow-inner">
                                                <MdOutlineRemoveShoppingCart className="inline-block mr-2" />
                                                Out of Stock
                                            </span>{" "}
                                            No products available
                                        </p>
                                    )}
                                </div>
                                {isProductPublished && product.stock > 0 && (
                                    <div className="flex items-center w-full space-x-4 ">
                                        <div className="flex items-center justify-between px-3 py-2 bg-opacity-50 rounded-full shadow-md bg-slate-50 backdrop-blur-md text-slate-800">
                                            <button
                                                onClick={handleDecrease}
                                                className="flex items-center justify-center text-sm text-white rounded-full bg-slate-800 size-6"
                                            >
                                                -
                                            </button>
                                            <span className="px-7">
                                                {quantity > 0 ? quantity : 1}
                                            </span>
                                            <button
                                                onClick={handleIncrease}
                                                className="flex items-center justify-center text-sm text-white rounded-full bg-slate-800 size-6"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {/* Popup Notification */}
                                        {showPopup && product.stock > 0 && (
                                            <div className="z-10 fixed bottom-5 right-5 bg-red-100 font-semibold text-red-800 px-2 py-0.5 text-md rounded-lg shadow-lg transition-opacity">
                                                You can't add more than {product.stock} items in stock.
                                            </div>
                                        )}
                                        <Link
                                            preserveScroll
                                            href={route("customer.storeWishlists")}
                                            method="post"
                                            data={{
                                                product_id: product.id,
                                            }}
                                            onClick={() => handleAddToWishlist(product.id)}
                                        >
                                            <div className="p-2 border rounded-full shadow-md border-slate-500">
                                                <FaRegHeart />
                                            </div>
                                        </Link>
                                        <ProductLink productId={product.id} success={success} />
                                    </div>
                                )}
                                {isProductPublished && product.stock > 0 && (
                                    <>
                                        <div className="flex flex-col w-full gap-4 py-4 sm:flex-row">
                                            <button
                                                onClick={handleBuyNow}
                                                className="w-full gap-4 px-4 py-3 mt-3 text-sm font-medium border rounded-full shadow-md sm:w-52 text-primary border-slate-500 lg:mt-0"
                                            >
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
                                                onClick={() => handleAddToCart(product.id)}
                                            >
                                                <button className="w-full gap-4 px-4 py-3 mt-3 text-sm font-medium text-white rounded-full shadow-inner sm:w-52 bg-slate-800 lg:mt-0">
                                                    Add to Cart
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="flex items-center justify-between space-x-1 w-96   mb-4 ">
                                            <div className="flex items-center space-x-2 text-primary">
                                                <IoStorefrontOutline className="mr-2" />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">
                                                        {product.seller.name}
                                                    </span>
                                                    <span className="inline text-xs text-slate-500">Verified Seller</span>
                                                </div>
                                            </div>
                                            <Link
                                                href={route(
                                                    "seller.public.profile",
                                                    {
                                                        seller: product.seller.id,
                                                    }
                                                )}
                                            >
                                                <span className="text-sm  px-6 py-2 font-medium   bg-slate-50 backdrop-blur-md  shadow-md  rounded-md text-primary ">Visit Store</span>
                                            </Link>
                                        </div>
                                        {/* <button
                                            className="border-2 border-primary rounded-md px-6 py-2"
                                            onClick={() => setReportModalVisible(true)}
                                        >
                                            Report Item
                                        </button>
                                        <ReportModal
                                            productId={product.id}
                                            isReportModalVisible={isReportModalVisible}
                                            onClose={() => setReportModalVisible(false)}
                                        /> */}
                                    </>
                                )}
                            </div>
                        </div>
                        {product.images?.length > 0 && (
                            <div className="flex space-x-4 overflow-x-auto">
                                {product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`relative w-24 h-24 cursor-pointer rounded-md transition-all duration-300 ${selectedImage === image.image_path
                                            ? "border-green-500 border-2"
                                            : "border-slate-500 border"
                                            } hover:border-gray-800 border-2`}
                                        onClick={() =>
                                            setSelectedImage(image.image_path)
                                        }
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={product.name}
                                            className="object-cover w-full h-full rounded-md "
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* CUSTOMER REVIEWS */}
                        {reviews.length > 0 && (
                            <ProductRatingReviews
                                reviews={reviews}
                                averageRating={averageRating}
                            />
                        )}
                        {/* RELATED PRODUCTS */}
                        {
                            relatedProducts.length > 0 && (
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
                                                <div className="product-card flex p-4 space-x-2 shadow-lg bg-slate-50 bg-opacity-30 backdrop-blur-md rounded-2xl">
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
                            )
                        }
                    </CustomerContainer>
                </main>
            </div>
        </CustomerLayout >
    );
}
