import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MdAdd } from "react-icons/md";
import DivContainer from "@/Components/DivContainer";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import { Head, Link, router } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import Pagination from "@/Components/Pagination";

export default function SellerIndex({ auth, sellers, success }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    const [sellerToDelete, setSellerToDelete] = useState(null);
    const [sellerName, setSellerName] = useState("");

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setVisibleSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const openModal = (seller) => {
        setSellerToDelete(seller);
        setSellerName(seller.name);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSellerToDelete(null);
        setSellerName("");
        setIsModalOpen(false);
    };

    const confirmDelete = () => {
        if (sellerToDelete) {
            router.delete(
                route("seller.destroy", { seller: sellerToDelete.id })
            );
            setSellerToDelete(null);
            setSellerName("");
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Seller" />
                <DivContainer>
                    {visibleSuccess && (
                        <div className="mt-3 bg-green-600 py-2 px-4 text-white rounded mb-5 flex items-center justify-center w-full">
                            <FaCheck className="mr-2" /> {success}
                        </div>
                    )}
                    <div className=" bg-slate-50 bg-opacity-80  backdrop-blur-lg     overflow-hidden shadow-sm rounded-3xl p-6  ">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                                Sellers
                            </h2>
                            <Link
                                href={route("seller.create")}
                                className="bg-slate-800 py-3 px-6 text-white rounded-md font-bold shadow text-xs flex items-center"
                            >
                                <MdAdd className="mr-2 size-4" /> Add a New
                                Seller
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  whitespace-nowrap">
                                            Contact Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                    {sellers.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {user.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {user.contact_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 flex items-center space-x-4">
                                                <Link
                                                    href={route(
                                                        "seller.edit",
                                                        user.id
                                                    )}
                                                    className="border border-slate-800 text-slate-800 px-3 py-2 rounded"
                                                >
                                                    <LiaEditSolid />
                                                </Link>
                                                <Link
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal(user);
                                                    }}
                                                    className="bg-slate-800 text-slate-50 px-3 py-2 rounded"
                                                >
                                                    <RiDeleteBinLine />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={sellers.links} />
                    </div>
                </DivContainer>
            </AuthenticatedLayout>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message={`Are you sure you want to delete ${sellerName}?`}
            />
        </>
    );
}
