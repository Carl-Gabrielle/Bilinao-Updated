import React, { useState } from 'react';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import { RxUpdate } from "react-icons/rx";
import { LuAsterisk } from "react-icons/lu";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { IoClose } from "react-icons/io5";
import SellerLayout from '@/Layouts/SellerLayout';
import Label from '@/Components/Label';
import SectionHeader from '@/Components/SectionHeader';
import SellerInput from '@/Components/SellerInput';

export default function ProductEdit() {
    const { props } = usePage();
    const product = props.product;
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        images: product.images || [], 
        _method: 'PUT'
    });
    const [newImages, setNewImages] = useState([]);

    const handleImageChange = (index, event) => {
        const newImagesArray = [...data.images];
        newImagesArray[index].image_path = event.target.value; 
        setData('images', newImagesArray);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = data.images.filter((_, i) => i !== index);
        setData('images', updatedImages);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData('images', [...data.images, { image_path: reader.result }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id), {
            onSuccess: () => {
                // Handle success
            },
            onError: () => {
                // Handle errors
            },
        });
    };

    return (
        <SellerLayout user={props.auth.user}>
            <Head title="Edit Product" />
            <div className="container mx-auto px-4 py-6">
                <Link href={route('products.index')} className='mb-5 px-6 py-2 w-36 font-bold flex items-center'>
                    <MdOutlineKeyboardArrowLeft className="mr-2" /> Go Back
                </Link>
                <div className='px-10 py-8 bg-white rounded-3xl'>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='flex items-center justify-between'>
                            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex text-sm items-center px-6 py-3 bg-lime-700 text-white font-semibold rounded-md shadow-lg"
                            >
                                <RxUpdate className='mr-2' /> Update Product
                            </button>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
                            <div className='w-full col-span-2 border px-6 py-4 rounded-3xl'>
                                <div className="mb-4">
                                    <SectionHeader text="Product Information" />
                                    <label htmlFor="title" className="text-gray-700 text-sm font-medium flex items-center">
                                        <LuAsterisk className='ml-2 text-red-500' /> Product Name
                                    </label>
                                    <SellerInput
                                        required
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        placeholder="Ex. Vase, Tie-Dye Shirts etc"
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    <Label text="Name of the Product" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="text-gray-700 text-sm font-medium flex items-center">
                                        <LuAsterisk className='ml-2 text-red-500' /> Product Description
                                    </label>
                                    <textarea
                                        required
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="focus:outline-none focus:ring-0 border focus:border-lime-600 py-3 px-4 w-full rounded-md border-gray-500 bg-transparent"
                                        placeholder="Describe the product"
                                    />
                                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                                    <Label text="Maximum of 255 words. Exceeding this limit requires shortening." />
                                </div>
                            </div>
                            <div className="border h-96 px-6 py-4 rounded-3xl w-full">
                                <SectionHeader text="Pricing & Stock" />
                                <div className="mb-4">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <LuAsterisk className='ml-2 text-red-500' /> Price
                                    </label>
                                    <SellerInput
                                        required
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter base price"
                                    />
                                    {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                                    <Label text="Enter the original price of the product." />
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <LuAsterisk className='ml-2 text-red-500' /> Stock
                                    </label>
                                    <SellerInput
                                        required
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter stock quantity"
                                    />
                                    {errors.stock && <span className="text-red-500 text-sm">{errors.stock}</span>}
                                    <Label text="Enter the available stock quantity for the product." />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
                        <div className='w-full col-span-2 border px-6 py-4 rounded-3xl'>
                                <div className="mb-4">
                                            <SectionHeader text="Product Images" />
                                            <div className="flex flex-wrap mt-4">
                            {data.images.length > 0 ? (
                data.images.map((image, index) => (
                    <div key={index} className="border mt-2 w-full rounded-md px-3 py-2 flex items-center">
                        <img
                            src={`/storage/${image.image_path}`}
                            alt={`Product Image ${index + 1}`}
                            className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-grow">
                            <h2 className="font-semibold text-sm text-gray-700">{`Product Image ${index + 1}`}</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="text-gray-400 hover:bg-gray-100 px-1 py-1 rounded-md"
                        >
                            <IoClose size={18} />
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No images found.</p>
            )}
        </div>

                                    <div className="mt-4">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="block w-full text-gray-700"
                                        />
                                    </div>
                                </div>
                                </div>
                                
                                </div>
                    </form>
                </div>
            </div>
        </SellerLayout>
    );
}
