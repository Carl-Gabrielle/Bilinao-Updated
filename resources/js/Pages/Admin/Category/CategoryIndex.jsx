import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import Pagination from "@/Components/Pagination";
import DivContainer from "@/Components/DivContainer";
export default function Index({ auth, category, success, categoryCount }) {
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
            router.delete(
                route("category.destroy", { category: categoryToDelete.id })
            );
            setCategoryToDelete(null);
            setIsModalOpen(false);
        }
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
                    <div className="bg-slate-50 bg-opacity-80  backdrop-blur-lg     overflow-hidden shadow-sm rounded-3xl p-6">
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
                                    <>
                                        <li
                                            key={item.id}
                                            className=" p-2 rounded-lg text-xs  border border-slate-300  "
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
                                                <Link
                                                    href={route(
                                                        "category.edit",
                                                        item.id
                                                    )}
                                                    className="border border-slate-800 text-slate-800 px-3 py-2 rounded"
                                                >
                                                    <LiaEditSolid />
                                                </Link>
                                                <Link
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal(item);
                                                    }}
                                                    className="bg-slate-800 text-slate-50 px-3 py-2 rounded"
                                                >
                                                    <RiDeleteBinLine />
                                                </Link>
                                            </div>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        )}
                        {/* <Pagination links={category.links} /> */}
                    </div>
                </DivContainer>
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
