import React, { useRef, useState, useEffect } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { IoClose } from "react-icons/io5";
import { GoUpload } from "react-icons/go";
import { LuAsterisk } from "react-icons/lu";
import { MdPublish } from "react-icons/md";
import SectionHeader from '@/Components/SectionHeader';
import SellerInput from '@/Components/SellerInput';
import Label from '@/Components/Label';
import SellerLayout from '@/Layouts/SellerLayout';

const SellerDashboard = ({ categories}) => {
    const { props } = usePage();
    const user = props.auth.user;

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        images: [],
    });

    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files).map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
        setData('images', [...data.images, ...e.target.files]);
    };

    const handleRemoveImage = (imageToRemove) => {
        setImages(images.filter((image) => image.name !== imageToRemove.name));
        setData('images', data.images.filter((image) => image.name !== imageToRemove.name));
    };

    const handleRemoveAllImages = () => {
        setImages([]);
        setData('images', []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                reset();
                setImages([]);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };
    return (
        <SellerLayout user={user}>
            <Head title="Add Product" />
            <div className="container mx-auto px-4 py-6">
                <div className='px-10 py-8 bg-white rounded-3xl'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <h1 className="sm:text-2xl text-sm  font-bold mb-6">Add New Product</h1>
                            <button
                                type="submit"
                                className="flex text-xs items-center px-6 py-3 bg-lime-700 text-white font-semibold rounded-md shadow-lg"
                            >
                                <MdPublish className='mr-2' /> Publish Product
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
                            <div className="border h-96 px-6 py-4 rounded-3xl  w-full">
                                <SectionHeader text="Pricing & Stock" />
                                <div className="mb-4">
                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <LuAsterisk className='ml-2 text-red-500' />Price</label>
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
                                        <LuAsterisk className='ml-2 text-red-500' />Stock</label>
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
                            <div className="col-span-2 border px-6 py-4 rounded-3xl  w-full">
                                <SectionHeader text="Product Images" />
                                <div className="mb-4">
                                    <div className="w-full border-2 border-dashed rounded-md h-72 flex items-center justify-center relative">
                                        <input
                                        
                                            type="file"
                                            id="product_images"
                                            name="product_images"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            multiple
                                            required
                                        />
                                        <label htmlFor="product_images" className="flex flex-col items-center cursor-pointer">
                                            <div className="text-white bg-lime-700 p-3 rounded-md flex items-center justify-center">
                                                <GoUpload size={23} />
                                            </div>
                                            <h1 className="font-medium mt-3 text-gray-800 text-sm">Click to upload product images</h1>
                                            <Label text="Maximum file size 2MB" />
                                        </label>
                                    </div>
                                    {errors.images && <span className="text-red-500 text-sm">{errors.images}</span>}
                                    <Label text="Upload the images of your product" />
                                </div>
                                <div className="flex flex-wrap mt-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="border mt-2 w-full rounded-md px-3 py-2 flex items-center">
                                            <img
                                                src={image.url}
                                                alt={`Product Preview ${index + 1}`}
                                                className="w-12 h-12 object-cover rounded-md mr-3"
                                            />
                                            <div className="flex-grow">
                                                <h2 className="font-semibold text-sm text-gray-700">{image.name}</h2>
                                                <p className="text-xs text-gray-500">{(image.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(image)}
                                                className="text-gray-400 hover:bg-gray-100 px-1 py-1 rounded-md"
                                            >
                                                <IoClose size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {images.length > 0 && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-md text-red-600 bg-red-50 text-sm font-semibold"
                                            onClick={handleRemoveAllImages}
                                        >
                                            Remove All
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="border h-96 px-6 py-4 rounded-3xl w-full">
                                <SectionHeader text="Category Selection" />
                                <div className="mb-4">
                                    <label className="flex items-center text-sm font-medium text-gray-700 ">
                                    <LuAsterisk className='ml-2 text-red-500' />Select Category</label>
                                    <select
                                        required
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="focus:outline-none focus:ring-0 border  focus:border-lime-600 focus:border hover:border-gray-900   py-3 px-4 w-full rounded-md  border-gray-500 bg-transparent"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <span className="text-red-500 text-sm">{errors.category_id}</span>}
                                    <Label text="Select a category for your product" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SellerLayout>
    );
};

export default SellerDashboard;
