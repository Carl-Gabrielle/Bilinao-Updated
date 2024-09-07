import React, { useState } from 'react';
import { FaPesoSign } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

export default function ProductDetails({ product, auth,seller }) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]?.image_path || '');

    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100 pt-10">
                <Head title={`${product.name} Details`} />
                <main>
                    <div className="max-w-screen-xl mx-auto py-12 px-6">
                        <h2 className="text-3xl font-bold text-center mb-8">{product.name}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {selectedImage ? (
                                    <img
                                        src={`/storage/${selectedImage}`}
                                        alt={product.name}
                                        className="w-full h-96 object-cover"
                                    />
                                ) : (
                                    <p className="text-center text-gray-600 text-lg">No Images Available</p>
                                )}
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <p className="text-gray-800 font-bold text-2xl flex items-center"><FaPesoSign />{product.price}</p>
                                <p className="text-gray-500 mt-4 flex items-center"><IoStorefrontOutline className='mr-2' /> {product.seller.name}</p>
                                <p className="text-gray-600 mt-4">{product.description}</p>
                                <p className="text-gray-800 mt-4 font-bold">Category: {product.category.name}</p>
                            </div>
                        </div>
                        {product.images.length > 0 && (
                            <div className="flex overflow-x-auto space-x-4 mt-4">
                                {product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`relative w-24 h-24 cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                                            selectedImage === image.image_path ? 'border-lime-700' : 'border-transparent'
                                        } hover:border-gray-800`}
                                        onClick={() => setSelectedImage(image.image_path)}
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        {selectedImage === image.image_path && (
                                            <div className="absolute inset-0 rounded-lg pointer-events-none"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
}
