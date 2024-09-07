import React from 'react';
import { FaPesoSign } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

export default function CategoryProducts({ auth, products, category }) {
    return (
        <CustomerLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100 pt-10">
                <Head title={`${category} Products`} />
                <main>
                    <div className="max-w-screen-xl mx-auto py-12 px-6">
                        <h2 className="text-3xl font-bold text-center mb-8">{category} Products</h2>
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.data.map((product) => (
                                    <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                        {product.images.length > 0 && (
                                            <Link href={route('product.show', product.id)}>
                                                <img
                                                    src={`/storage/${product.images[0].image_path}`}
                                                    alt={product.name}
                                                    className="w-full h-64 object-cover cursor-pointer"
                                                />
                                            </Link>
                                        )}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                                            <p className="text-gray-600">{product.description}</p>
                                            <p className="text-gray-800 font-bold flex items-center"><FaPesoSign />{product.price}</p>
                                            <p className="text-gray-500 mt-2 flex items-center"><IoStorefrontOutline className='mr-2' /> {product.seller.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 text-lg">No Products Found</p>
                        )}
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
}
