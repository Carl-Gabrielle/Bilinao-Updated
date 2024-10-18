import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { FaCheck, FaPesoSign } from "react-icons/fa6";
import SellerLayout from "@/Layouts/SellerLayout";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import Pagination from "@/Components/Pagination";
import ConfirmationModal from "@/Components/ConfirmationModal";

export default function ShowProduct({ success }) {
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    const { props } = usePage();
    const user = props.auth.user;
    const products = props.products || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setVisibleSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            router.delete(route("products.destroy", productToDelete.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setProductToDelete(null);
                },
            });
        }
    };
    return (
        <SellerLayout user={user}>
            <Head title="Show Products" />
            <div className="container mx-auto px-4 py-6 ">
                {visibleSuccess && (
                    <div className="mt-3 bg-gray-50 py-3 px-5 rounded-lg mb-5 flex items-center justify-center w-1/2 ml-auto shadow-lg">
                        <div className="bg-green-500 p-1 rounded-full flex items-center justify-center">
                            <FaCheck className="text-white text-lg" />
                        </div>
                        <span className="ml-3 text-gray-700 font-medium">
                            {success}
                        </span>
                    </div>
                )}
                <div className="px-10 bg-white bg-opacity-55 backdrop-blur-lg py-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="font-semibold sm:text-2xl text-md text-gray-800 leading-tight">
                            Your Products
                        </h1>
                        <Link
                            href={route("products.create")}
                            className="bg-slate-800 py-3 px-6 text-white rounded-md font-bold shadow text-xs flex items-center whitespace-nowrap"
                        >
                            <MdAdd className="mr-2 size-4" /> Add a New Product
                        </Link>
                    </div>
                    {products.data.length > 0 ? (
                        <div className="overflow-x-auto scroll-bar">
                            <table className="min-w-full bg-white bg-opacity-65 backdrop-blur-lg rounded-lg ">
                                <thead className="bg-gray-100 border-b border-gray-200 text-xs uppercase">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Image
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Name
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Description
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Price
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Stock
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Category
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium whitespace-nowrap">
                                            Weight (g)
                                        </th>
                                        <th className="py-3 px-6 text-left text-gray-600 font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b hover:bg-gray-50 transition duration-150 ease-in-out text-sm"
                                        >
                                            <td className="py-4 px-6">
                                                {product.images &&
                                                product.images.length > 0 ? (
                                                    <img
                                                        src={`/storage/${product.images[0].image_path}`}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg shadow-sm">
                                                        <span className="text-gray-500">
                                                            No Image
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="hover:underline"
                                            >
                                                <td className="py-4 px-6 text-gray-800 font-semibold whitespace-nowrap">
                                                    {product.name}
                                                </td>
                                            </Link>
                                            <td className="py-4 px-6 text-gray-800">
                                                <div className="truncate max-w-[150px]">
                                                    {product.description}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-800 font-bold flex items-center">
                                                <FaPesoSign className="mr-1" />
                                                {product.price}
                                            </td>
                                            <td className="py-4 px-6 text-gray-800 font-bold">
                                                {product.stock}
                                            </td>
                                            <td className="py-4 px-6 text-gray-800 whitespace-nowrap">
                                                {product.category?.name ||
                                                    "N/A"}
                                            </td>
                                            <td className="py-4 px-6 text-gray-800">
                                                {product.weight}
                                                <span className="ml-1">
                                                    (g)
                                                </span>
                                            </td>
                                            <td className="py-10 px-6 text-center flex items-center justify-center">
                                                <Link
                                                    href={`/products/${product.id}/edit`}
                                                    className="flex items-center justify-center"
                                                >
                                                    <LiaEditSolid className="w-5 h-5 mr-2" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            product
                                                        )
                                                    }
                                                    className="flex items-center justify-center text-red-600"
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                links={products.links}
                                className="mb-10"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-600 text-sm text-center">
                            {" "}
                            No products found. Start showcasing your amazing
                            creations by adding your first product!🚀
                        </p>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Are you sure you want to delete ${productToDelete?.name}?`}
            />
        </SellerLayout>
    );
}
