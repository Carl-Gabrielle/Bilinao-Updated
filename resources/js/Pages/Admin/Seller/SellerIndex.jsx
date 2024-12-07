import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MdAdd } from "react-icons/md";
import DivContainer from "@/Components/DivContainer";
import { FaCheck } from "react-icons/fa6";
import { LiaEditSolid } from "react-icons/lia";
import { Head, Link, router } from "@inertiajs/react";
import { MdOutlineContentCopy } from "react-icons/md";
import { LiaUserAltSlashSolid } from "react-icons/lia";
import { LuCopyCheck } from "react-icons/lu";
import ConfirmationModal from "@/Components/ConfirmationModal";
import Pagination from "@/Components/Pagination";

export default function SellerIndex({ auth, sellers, success }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(!!success);
    const [sellerToDeactivate, setSellerToDeactivate] = useState(null);
    const [sellerName, setSellerName] = useState("");
    const [isReactivating, setIsReactivating] = useState(false);
    const [copiedUsername, setCopiedUsername] = useState("");

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setVisibleSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    const openModal = (seller) => {
        setSellerToDeactivate(seller);
        setSellerName(seller.name);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSellerToDeactivate(null);
        setSellerName("");
        setIsModalOpen(false);
    };
    const handleSellerAction = () => {
        if (sellerToDeactivate) {
            if (isReactivating) {
                router.patch(route("seller.reactivate", sellerToDeactivate.id), {}, {
                    onSuccess: () => closeModal(),
                });
            } else {
                router.patch(route("seller.deactivate", sellerToDeactivate.id), {}, {
                    onSuccess: () => closeModal(),
                });
            }
        }
    };
    const toggleSellerState = (seller) => {
        setIsReactivating(!seller.is_active);
        openModal(seller);
    };
    const handleCopy = (username) => {
        navigator.clipboard.writeText(username).then(() => {
            setCopiedUsername(username);
            setTimeout(() => setCopiedUsername(""), 3000);
        }).catch((error) => {
            console.error('Error copying text: ', error);
        });
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
                    <div className=" bg-slate-50 bg-opacity-80 backdrop-blur-lg overflow-hidden shadow-sm rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Sellers
                            </h2>
                            <Link
                                href={route("seller.create")}
                                className="bg-slate-800 py-3 px-6 text-white rounded-2xl font-bold shadow text-xs flex items-center"
                            >
                                <MdAdd className="mr-2 size-4" /> Add a New Seller
                            </Link>
                        </div>
                        <div className="overflow-x-auto scroll-bar">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap">
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
                                            <td className="px-6 py-4   whitespace-nowrap font-medium text-gray-500">
                                                <span className="text-gray-700 text-sm font-normal">{user.name} - </span>
                                                <span className={`px-4 py-1   rounded-2xl ${user.is_active ? "bg-green-100 text-green-500 " : "bg-red-100 text-red-500"}`}>{user.is_active ? "Active " : "Inactive"}</span>
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
                                                <div className="flex items-center">
                                                    {user.username}
                                                    {copiedUsername === user.username ? (
                                                        <LuCopyCheck className="ml-1 text-green-500" />
                                                    ) : (
                                                        <MdOutlineContentCopy
                                                            className="ml-1 cursor-pointer"
                                                            onClick={() => handleCopy(user.username)}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 flex items-center space-x-4">
                                                <Link
                                                    href={route("seller.edit", user.id)}
                                                    className="border border-slate-500 text-slate-800 px-3 py-2 rounded"
                                                >
                                                    <LiaEditSolid />
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleSellerState(user);
                                                    }}
                                                    className={`px-4 py-2 rounded-2xl ${user.is_active ? "bg-red-200 text-red-500" : "bg-green-100 text-green-500"}`}
                                                >
                                                    {user.is_active ? <LiaUserAltSlashSolid /> : "Reactivate"}
                                                </button>
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
                onConfirm={handleSellerAction}
                message={`Are you sure you want to ${isReactivating ? 'reactivate' : 'deactivate'} ${sellerName}?`}
            />
        </>
    );
}
