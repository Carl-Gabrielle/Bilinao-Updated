import React, { useState, useRef } from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import { RxUpdate } from "react-icons/rx";
import { GoUpload } from "react-icons/go";
import { LuAsterisk } from "react-icons/lu";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import SellerLayout from "@/Layouts/SellerLayout";
import Label from "@/Components/Label";
import SectionHeader from "@/Components/SectionHeader";
import SellerInput from "@/Components/SellerInput";

export default function ProductEdit() {
    const { props } = usePage();
    const product = props.product;
    const categories = props.categories;
    console.log(categories);
    console.log(product);
    const fileInputRef = useRef(null);
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category_id: product.category_id,
        stock: product.stock || "",
        weight: product.weight || "",
        images: product.images || [],
        new_uploaded_images: [],
        _method: "PUT",
    });
    const [newImages, setNewImages] = useState([]);
    const [isolatedImages, setIsolatedImages] = useState(product.images);
    const [originalImages, setOriginalImages] = useState(product.images);

    const handleImageChange = (index, event) => {
        const newImagesArray = [...data.images];
        newImagesArray[index].image_path = event.target.value;
        setData("images", newImagesArray);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = data.images.filter((_, i) => i !== index);
        setData("images", updatedImages);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setData("new_uploaded_images", [...data.new_uploaded_images, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
        post(route("products.update", product.id), {
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
            <div className="container px-4 py-6 mx-auto">
                <Link
                    href={route("products.index")}
                    className="flex items-center px-6 py-2 mb-5 font-semibold w-36 text-slate-800"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" /> Go Back
                </Link>
                <div className="px-10 py-8 ">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="mb-6 text-2xl font-bold">
                                Edit Product
                            </h1>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center px-6 py-3 text-sm font-semibold text-white rounded-md shadow-lg bg-slate-800"
                            >
                                <RxUpdate className="mr-2" /> Update Product
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-3">
                            <div className="w-full col-span-2 px-6 py-4 bg-slate-50  rounded-3xl">
                                <div className="mb-4">
                                    <SectionHeader text="Product Information" />
                                    <label
                                        htmlFor="title"
                                        className="flex items-center text-sm font-medium text-gray-700"
                                    >
                                        <LuAsterisk className="ml-2 text-red-500" />{" "}
                                        Product Name
                                    </label>
                                    <SellerInput
                                        required
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                        placeholder="Ex. Vase, Tie-Dye Shirts etc"
                                    />
                                    {errors.name && (
                                        <span className="text-sm text-red-500">
                                            {errors.name}
                                        </span>
                                    )}
                                    <Label text="Name of the Product" />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="flex items-center text-sm font-medium text-gray-700"
                                    >
                                        <LuAsterisk className="ml-2 text-red-500" />{" "}
                                        Product Description
                                    </label>
                                    <textarea
                                        required
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-lime-600"
                                        placeholder="Describe the product"
                                    />
                                    {errors.description && (
                                        <span className="text-sm text-red-500">
                                            {errors.description}
                                        </span>
                                    )}
                                    <Label text="Maximum of 255 words. Exceeding this limit requires shortening." />
                                </div>
                            </div>
                            <div className="w-full px-6 py-4  h-96 bg-slate-50  rounded-3xl">
                                <SectionHeader text="Pricing & Stock" />
                                <div className="mb-4">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <LuAsterisk className="ml-2 text-red-500" />{" "}
                                        Price
                                    </label>
                                    <SellerInput
                                        required
                                        type="number"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter base price"
                                    />
                                    {errors.price && (
                                        <span className="text-sm text-red-500">
                                            {errors.price}
                                        </span>
                                    )}
                                    <Label text="Enter the original price of the product." />
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <LuAsterisk className="ml-2 text-red-500" />{" "}
                                        Stock
                                    </label>
                                    <SellerInput
                                        required
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData("stock", e.target.value)
                                        }
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter stock quantity"
                                    />
                                    {errors.stock && (
                                        <span className="text-sm text-red-500">
                                            {errors.stock}
                                        </span>
                                    )}
                                    <Label text="Enter the available stock quantity for the product." />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-3">
                            <div className="w-full col-span-2 px-6 py-4 bg-slate-50  rounded-3xl">
                                <div className="mb-4">
                                    <SectionHeader text="Product Images" />
                                    <div className="flex flex-wrap mt-4">
                                        <div className="w-full border-slate-600 border-opacity-30 border-2 border-dashed rounded-md h-52 flex items-center justify-center relative">
                                            <input
                                                type="file"
                                                id="product_images"
                                                name="product_images"
                                                accept="image/*"
                                                className="hidden"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                multiple
                                            />
                                            <label
                                                htmlFor="product_images"
                                                className="flex flex-col items-center cursor-pointer"
                                            >
                                                <div className="text-white bg-slate-800 p-2 rounded-md flex items-center justify-center">
                                                    <GoUpload size={20} />
                                                </div>
                                                <h1 className="font-medium mt-3 text-gray-800 text-sm">
                                                    Click to upload product
                                                    images
                                                </h1>
                                                <Label text="Maximum file size 2MB" />
                                            </label>
                                        </div>
                                        {errors.images && (
                                            <span className="text-red-500 text-sm">
                                                {errors.images}
                                            </span>
                                        )}
                                        <Label text="Upload the images of your product" />
                                        {data.images.length > 0 ? (
                                            data.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center w-full px-3 py-2 mt-2 border rounded-md"
                                                >
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt={`Product Image ${
                                                            index + 1
                                                        }`}
                                                        className="object-cover w-12 h-12 mr-3 rounded-md"
                                                    />
                                                    <div className="flex-grow">
                                                        <h2 className="text-sm font-semibold text-gray-700">{`Product Image ${
                                                            index + 1
                                                        }`}</h2>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteImage(
                                                                index
                                                            )
                                                        }
                                                        className="px-1 py-1 text-gray-400 rounded-md hover:bg-gray-100"
                                                    >
                                                        <IoClose size={18} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">
                                                No images found.
                                            </p>
                                        )}

                                        {data.new_uploaded_images.map(
                                            (image, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center w-full px-3 py-2 mt-2 border rounded-md"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            image
                                                        )}
                                                        alt={`Product Image ${
                                                            index + 1
                                                        }`}
                                                        className="object-cover w-12 h-12 mr-3 rounded-md"
                                                    />
                                                    <div className="flex-grow">
                                                        <h2 className="text-sm font-semibold text-gray-700">{`Product Image ${
                                                            index + 1
                                                        }`}</h2>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteImage(
                                                                index
                                                            )
                                                        }
                                                        className="px-1 py-1 text-gray-400 rounded-md hover:bg-gray-100"
                                                    >
                                                        <IoClose size={18} />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-6 py-4 bg-slate-50  h-96 rounded-3xl ">
                                <SectionHeader text="Select Category & Weight" />
                                <div className="mb-4">
                                    <label className="flex items-center text-sm font-medium text-gray-700 ">
                                        <LuAsterisk className="ml-2 text-red-500" />
                                        Select Category
                                    </label>
                                    <select
                                        required
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-0 focus:border-lime-600 focus:border hover:border-gray-900"
                                    >
                                        <option value="">
                                            Select category
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <span className="text-sm text-red-500">
                                            {errors.category_id}
                                        </span>
                                    )}
                                    <Label text="Select a category for your product" />
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center text-sm font-medium text-gray-700 ">
                                        <LuAsterisk className="ml-2 text-red-500" />
                                        Type the Weight
                                    </label>
                                    <SellerInput
                                        required
                                        type="number"
                                        value={data.weight}
                                        onChange={(e) =>
                                            setData("weight", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter Weight (g)"
                                    />

                                    {errors.weight && (
                                        <span className="text-red-500 text-sm">
                                            {errors.weight}
                                        </span>
                                    )}
                                    <Label text="Input the weight for your product" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SellerLayout>
    );
}
