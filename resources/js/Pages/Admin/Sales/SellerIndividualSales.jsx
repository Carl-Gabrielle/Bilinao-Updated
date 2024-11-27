import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaPesoSign } from "react-icons/fa6";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { IoPricetagsOutline } from "react-icons/io5";
import DivContainer from "@/Components/DivContainer";
import ConfirmationModal from "@/Components/ConfirmationModal";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function SellerIndividualSales({ auth }) {
    const { user } = auth;
    const { data, totalContribution } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const markAsPaid = () => {
        if (selectedItem) {
            Inertia.post(`/sales-report/${selectedItem.id}/toggle-status`, { status: "Paid" }, {
                onSuccess: () => closeModal(),
                onError: (errors) => console.error(errors),
            });
        }
    };
    const generateReceipt = () => {
        const doc = new jsPDF();
        const tableColumns = ["Product Name", "Net Pay", "Quantity Sold", "Revenue Share (4%)", "Status"];
        const tableRows = data.map((item) => [
            item.order_items.product.name,
            Math.round(item.net_sales_amount),
            item.solds,
            Math.round(item.contribution),
            item.status,
        ]);

        doc.text(`Sales Report - ${data[0]?.seller?.name}`, 14, 15);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
        doc.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: 30,
        });

        doc.text(
            `Total Revenue Share: ₱${Math.round(totalContribution)}`,
            14,
            doc.lastAutoTable.finalY + 10
        );

        doc.save(`Sales_Report_${data[0]?.seller?.name}.pdf`);
    };
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Sales Report" />
            <DivContainer>
                <Link
                    href={route("admin.salesReport")}
                    className="flex items-center px-6 py-1 mb-5 text-sm font-semibold rounded-full bg-slate-100 w-36"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="w-full h-auto p-6 shadow-lg bg-slate-50 bg-opacity-80 backdrop-blur-lg rounded-3xl">
                    <div className="p-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-primary">
                                Sales Report of {data[0].seller.name}
                            </h2>
                            <button
                                onClick={generateReceipt}
                                className="px-4 py-2 bg-green-600 text-white  rounded-2xl"
                            >
                                Download Receipt
                            </button>
                        </div>
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase text-nowrap">Product Name</th>
                                        <th className="px-6 py-4 text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase text-nowrap">Net Pay</th>
                                        <th className="px-6 py-4 text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase text-nowrap">Quantity Sold</th>
                                        <th className="px-6 py-4 text-[0.7rem] font-medium  tracking-wider text-left text-gray-700 uppercase text-nowrap">Revenue Share (4%)</th>
                                        <th className="px-6 py-4 text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase text-nowrap">Status</th>
                                        <th className="px-6 py-4 text-[0.7rem] font-medium   tracking-wider text-left text-gray-700 uppercase text-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm bg-white divide-y divide-gray-200">
                                    {data.map((item, index) => (
                                        <tr key={index} className="text-xs hover:bg-slate-50 whitespace-nowrap">
                                            <td className="px-6 py-4 font-medium text-gray-800"> <IoPricetagsOutline className="inline-block  mr-1" />  {item.order_items.product.name}</td>
                                            <td className="flex items-center px-6 py-4 text-gray-600">
                                                <FaPesoSign className="mr-1 text-gray-500" />
                                                {Math.round(item.net_sales_amount)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.solds}</td>
                                            <td className="flex items-center px-6 py-4 text-gray-600">
                                                <FaPesoSign className="mr-1 text-green-500" />
                                                {Math.round(item.contribution)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`py-1 px-3 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-7">
                                                {item.status !== "Paid" ? (
                                                    <button
                                                        onClick={() => openModal(item)}
                                                        className="flex items-center justify-center border border-green-600 text-green-600 py-1 px-3 rounded-full  hover:bg-green-600 transition-colors duration-300 ease-in-out hover:text-white"
                                                    >
                                                        <FaCheckCircle className="mr-2" /> Mark Paid
                                                    </button>
                                                ) : (
                                                    <span className="flex items-center justify-center bg-green-100 text-green-700 py-1 px-3 rounded-full  ">
                                                        <FaCheckCircle className="mr-2" /> Paid
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex items-center  p-6 font-medium text-gray-800">
                                <h3 className="text-gray-700 text-sm font-semibold">Total Revenue Share:</h3>
                                <p className="flex items-center text-md text-green-600">
                                    <FaPesoSign className="mr-1" />
                                    {totalContribution !== null && Math.round(totalContribution)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DivContainer>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={markAsPaid}
                title="Mark as Paid"
                message="Are you sure you want to mark this as Paid? This action cannot be undone."
            />
        </AuthenticatedLayout>
    );
}
