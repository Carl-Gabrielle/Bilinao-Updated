import React, { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
export default function Index({ auth, category, success,categoryCount }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setVisibleSuccess(false);
            }, 3000); 
            return () => clearTimeout(timer); 
        }
    }, [success]);

    const openModal = (category) => {
        setCategoryToDelete(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCategoryToDelete(null);
        setIsModalOpen(false);
    };
    const confirmDelete = () => {
        if (categoryToDelete) {
            router.delete(route('category.destroy', { category: categoryToDelete.id }));
            setCategoryToDelete(null);
            setIsModalOpen(false);
        }
    };
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Category" />
                <div className="py-12 bg-gray-50 min-h-screen">
                    <div className="max-w-7xl mx-auto sm:px-20 lg:px-8 pb-10  pt-12">
                        {visibleSuccess && (
                            <div className="mt-3 bg-green-600 py-2 px-4 text-white rounded mb-5 flex items-center justify-center w-full">
                                <FaCheck className="mr-2" /> {success}
                            </div>
                        )}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-5">
                        <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                            Category
                        </h2>
                        <Link
                            href={route("category.create")}
                            className="bg-primary py-3 px-6 text-white rounded-md font-bold shadow text-xs flex items-center"
                        >
                        <MdAdd className='mr-2 size-4'/> Add New Category
                        </Link>
                    </div>
                            {category.data.length === 0 ? (
                                <p className="text-gray-500">No categories available.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {category.data.map((item) => (
                                        <li key={item.id} className="border p-4 rounded-lg shadow-sm text-xs">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item.image_path}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <span className="font-semibold text-sm text-gray-700">{item.name}</span>
                                                </div>
                                                <Link
                                                    href={route("category.edit", item.id)}
                                                    className="border border-lime-700 text-slate-800 px-3 py-2 rounded"
                                                >
                                                    <LiaEditSolid />
                                                </Link>
                                                <Link
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal(item);
                                                    }}
                                                    className="bg-primary text-white px-3 py-2 rounded"
                                                >
                                                    <RiDeleteBinLine />
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this category?"
            />
        </>
    );
}
