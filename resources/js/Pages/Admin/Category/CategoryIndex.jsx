import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdAdd, MdUnpublished, MdPublish } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import DivContainer from "@/Components/DivContainer";
import { CiMenuKebab } from "react-icons/ci";

export default function Index({ auth, category, success, categoryCount }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    const [showDropdown, setShowDropdown] = useState(null);

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
        setShowDropdown(null);
    };

    const closeModal = () => {
        setCategoryToDelete(null);
        setIsModalOpen(false);
    };

    const handleTogglePublish = (category) => {
        const action = category.is_active ? "category.unpublish" : "category.publish";
        router.post(route(action, { category: category.id }), {
            _method: "PUT",
        });
        setShowDropdown(null);
    };

    const toggleDropdown = (id) => {
        setShowDropdown((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Category" />
                <DivContainer>
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
                    <div className="bg-slate-50 bg-opacity-80 backdrop-blur-lg overflow-hidden shadow-sm rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                                Category
                            </h2>
                            <Link
                                href={route("category.create")}
                                className="bg-slate-800 py-3 px-6 text-white rounded-2xl font-bold shadow text-xs flex items-center"
                            >
                                <MdAdd className="mr-2 size-4" /> Add New
                                Category
                            </Link>
                        </div>
                        {category.data.length === 0 ? (
                            <p className="text-gray-500">
                                No categories available.
                            </p>
                        ) : (
                            <ul className="space-y-4">
                                {category.data.map((item) => (
                                    <li
                                        key={item.id}
                                        className={`p-2 rounded-lg text-xs border ${item.is_active ? "border-slate-300" : "border-red-300"
                                            } relative`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.image_path}
                                                alt={item.name}
                                                className="size-14 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <span className="font-medium text-sm text-slate-800">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span
                                                className={`px-4 py-1 rounded-2xl ${item.is_active
                                                    ? "bg-green-200 text-green-600"
                                                    : "bg-red-200 text-red-500"
                                                    }`}
                                            >
                                                {item.is_active ? "Published" : "Unpublished"}
                                            </span>
                                            <Link
                                                href={route("category.edit", item.id)}
                                                className="border border-slate-500 text-slate-800 px-3 py-2 rounded"
                                            >
                                                <LiaEditSolid />
                                            </Link>
                                            <div className="relative">
                                                {showDropdown === item.id && (
                                                    <div className="absolute bottom-0.5 right-8 mt-2 w-32 bg-slate-50 border border-slate-300 rounded-md shadow-lg z-10">
                                                        <button
                                                            onClick={() => handleTogglePublish(item)}
                                                            className={`block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 ${item.is_active ? "text-red-500" : "text-green-500"}`}
                                                        >
                                                            {item.is_active ? (
                                                                <>
                                                                    <MdUnpublished className="inline mr-2" />
                                                                    Unpublish
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <MdPublish className="inline mr-2" />
                                                                    Publish
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </DivContainer>
            </AuthenticatedLayout>
        </>
    );
}
