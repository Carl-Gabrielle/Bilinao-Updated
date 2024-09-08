import React, { useState } from 'react';
import { FaPesoSign } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head,Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import CustomerContainer from '@/Components/CustomerContainer';

export default function ProductDetails({ product, auth, seller, relatedProducts = [] }) {
    const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.image_path || '');
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => setQuantity(quantity + 1);

    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100 pt-20">
                <Head title={`${product.name} Details`} />
                <main>
                    <CustomerContainer>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="mb-4 overflow-hidden ">
                                {selectedImage ? (
                                    <img
                                        src={`/storage/${selectedImage}`}
                                        alt={product.name}
                                        className="w-full h-96 object-cover rounded-3xl"
                                    />
                                ) : (
                                    <p className="text-center text-gray-600 text-lg">No Images Available</p>
                                )}
                            </div>
                            <div className="max-w-lg mx-auto flex flex-col items-start justify-center">
                                <p className="mt-5 text-green-500 text-xl font-bold mb-4">Category: {product.category.name}</p>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-Roboto text-gray-900 leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                                <p className="text-gray-500 flex items-center mb-4">
                                    <IoStorefrontOutline className="mr-2" />
                                    <span className="font-semibold">{product.seller.name}</span>
                                </p>
                                <div className="flex items-center text-green-600 font-bold text-xl mb-4">
                                    <FaPesoSign className="text-lg" />
                                    <span className="ml-1">{product.price}</span>
                                </div>
                                <div className='py-4 w-full flex flex-col sm:flex-row gap-4'>
                                    <div className='border-gray-400 border-2 shadow-md text-black px-10 py-2 rounded-md flex items-center justify-between'>
                                        <button onClick={handleDecrease} className='px-6 text-1xl'>-</button>
                                        <span className='px-9 text-gray-500'>{quantity}</span>
                                        <button onClick={handleIncrease} className='px-6'>+</button>
                                    </div>
                                    <button className="flex items-center justify-center w-full gap-4 px-4 py-2 mt-3 font-bold text-white transition-all duration-200 bg-green-500 rounded-lg shadow lg:mt-0 hover:bg-green-600">
                                        <LuShoppingCart /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails for product images */}
                        {product.images?.length > 0 && (
                            <div className="flex overflow-x-auto space-x-4 ">
                                {product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`relative w-24 h-24 cursor-pointer rounded-md border-2 transition-all duration-300 ${
                                            selectedImage === image.image_path ? 'border-green-500' : 'border-transparent'
                                        } hover:border-gray-800`}
                                        onClick={() => setSelectedImage(image.image_path)}
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
{relatedProducts && relatedProducts.length > 0 && (
    <div className='mt-20'>
        <h1 className='text-gray-800 font-semibold lg:text-2xl xl:text-3xl mb-6'>Related Products</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {relatedProducts.map((relatedProduct) => {
    const imagePath = relatedProduct.images?.[0]?.image_path;
    const imageUrl = imagePath ? `/storage/${imagePath}` : '/images/default-image.jpg';

    return (
        <Link key={relatedProduct.id} href={route('product.show', relatedProduct.id)}>
        <div  className="bg-white shadow-lg rounded-3xl overflow-hidden">
            <img
                src={imageUrl}
                alt={relatedProduct.name}
                className="size-64 object-cover cursor-pointer"
            />
            <div className="p-4">
                <h3 className="text-md font-normal mb-2">{relatedProduct.name}</h3>
                <p className="text-gray-800 font-bold">
                    <FaPesoSign className="inline-block text-lg mr-1" />
                    {relatedProduct.price}
                </p>
            </div>
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
