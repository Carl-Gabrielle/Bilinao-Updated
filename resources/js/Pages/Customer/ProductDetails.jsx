import React, { useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
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
    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0]?.image_path || ""
    );
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => setQuantity(quantity + 1);

    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen  pt-20 pb-1">
                <Head title={`${product.name} Details`} />
                <Banner
                    title="Products/"
                    suffix={product.category.name}
                    prefix="/Product Details"
                />
                <main>
                    <CustomerContainer>
                        {success && (
                            <div
                                id="toast"
                                className="fixed bottom-4 right-4 z-50"
                            >
                                <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3">
                                    <IoCheckmarkSharp className="text-white w-6 h-6" />
                                    <span className="text-sm font-medium">
                                        {success}
                                    </span>
                                </div>
                            </div>
                        )}
                        <Link
                            href={route("customer.products")}
                            className="w-1/2"
                        >
                            <button className="mb-6 font-semibold text-primary  px-4 py-2 text-md">
                                <MdOutlineKeyboardArrowLeft className="inline-block text-lg mr-2 " />
                                Back to Product
                            </button>
                        </Link>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="mb-4 overflow-hidden  h-96">
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
                            <div className="max-w-lg mx-auto flex flex-col items-start justify-center ">
                                <p className="mt-5 text-primary text-xl font-bold mb-4">
                                    Category: {product.category.name}
                                </p>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-Roboto text-gray-900 leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {product.description}
                                </p>
                                <Link
                                    href={route("seller.public.profile", {
                                        seller: product.seller.id,
                                    })}
                                >
                                    <p className="text-slate-800 flex items-center mb-4">
                                        <IoStorefrontOutline className="mr-2" />
                                        <span className="font-semibold">
                                            {product.seller.name}
                                        </span>
                                    </p>
                                </Link>
                                {product.stock > 0 ? (
                                    <p className="text-slate-800 text-sm class-name mb-5 font-medium">
                                        {" "}
                                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-md">
                                            In Stock:
                                        </span>{" "}
                                        {product.stock} products
                                    </p>
                                ) : (
                                    <p className="text-slate-800 text-sm class-name mb-5 font-medium">
                                        {" "}
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-md">
                                            Out of Stock:
                                        </span>{" "}
                                        {product.stock} products
                                    </p>
                                )}
                                <div className="flex items-center text-primary font-bold text-xl mb-4">
                                    <FaPesoSign className="text-lg" />
                                    <span className="ml-1">
                                        {product.price}
                                    </span>
                                </div>
                                <div className="py-4 w-full flex flex-col sm:flex-row gap-4">
                                    <div className="border-gray-400 border-2 shadow-md text-black px-10 py-2 rounded-md flex items-center justify-between">
                                        <button
                                            onClick={handleDecrease}
                                            className="px-6 text-1xl"
                                        >
                                            -
                                        </button>
                                        <span className="px-9 text-gray-500">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={handleIncrease}
                                            className="px-6"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {product.stock > 0 ? (
                                        <Link
                                            href={route("cart.store")}
                                            method="post"
                                            data={{
                                                product_id: product.id,
                                                quantity: 1,
                                            }}
                                        >
                                            <button className="flex items-center justify-center sm:w-52 w-full gap-4 px-4 py-2 mt-3 font-bold text-white transition-all duration-200 bg-primary rounded-lg shadow lg:mt-0 ">
                                                <LuShoppingCart /> Add to Cart
                                            </button>
                                        </Link>
                                    ) : (
                                        <div className="flex items-center cursor-not-allowed justify-center sm:w-52 w-full gap-4 px-4 py-2 mt-3 text-xs text-gray-600  bg-gray-300 rounded-lg shadow lg:mt-0 ">
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
                            <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide mb-6 mt-10">
                                Product Ratings & Reviews
                            </h1>
                        </div>
                        {relatedProducts && relatedProducts.length > 0 && (
                            <div className="mt-20">
                                <h1 className="text-2xl font-medium text-slate-900 uppercase tracking-wide mb-6">
                                    Related Products
                                </h1>
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
                                    {relatedProducts.map((relatedProduct) => {
                                        return (
                                            <Link
                                                key={relatedProduct.id}
                                                href={route(
                                                    "product.show",
                                                    relatedProduct.id
                                                )}
                                            >
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <img
                                                        src={
                                                            relatedProduct
                                                                .images?.[0]
                                                                ?.image_path
                                                                ? `/storage/${relatedProduct.images[0].image_path}`
                                                                : "/storage/default-image.jpg"
                                                        }
                                                        alt={
                                                            relatedProduct.name
                                                        }
                                                        className="w-full h-48 object-cover mb-4 rounded-lg"
                                                    />
                                                </div>
                                                <div className="rounded-2xl text-xs p-3 flex items-center justify-between">
                                                    <div>
                                                        <h3 className="pb-1 text-md font-semibold">
                                                            {
                                                                relatedProduct.name
                                                            }
                                                        </h3>
                                                        <p className="text-sm">
                                                            <FaPesoSign className="inline-block mr-1" />
                                                            {
                                                                relatedProduct.price
                                                            }
                                                        </p>
                                                    </div>
                                                    {relatedProduct.stock >
                                                    0 ? (
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
                                                            <div className="bg-primary px-3 py-3 rounded-full text-white">
                                                                <GrCart
                                                                    size={15}
                                                                />
                                                            </div>
                                                        </Link>
                                                    ) : (
                                                        <div className="bg-gray-300 text-xs  cursor-not-allowed  w-full sm:w-1/2  px-2 sm:py-2 py-1  rounded-full text-gray-600 text-center">
                                                            Out of Stock
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CustomerContainer>
                </main>
            </div>
        </CustomerLayout>
    );
}
