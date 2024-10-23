import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { Head, Link, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination"; // Import your Pagination component

export default function PendingOrder({
    auth = {},
    processOrders,
    totalOrdersCount = 0,
}) {
    const user = auth.user || {};

    return (
        <SellerLayout user={user}>
            <Head title="On Process Orders" />
            <div className="container mx-auto px-4 py-6">
                <div className="px-7 py-8 ">
                    <div className="w-full ">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-800 mb-0">
                                On Process Orders
                            </h1>
                            <span className="px-3 py-1 text-slate-50 bg-slate-800  text-sm font-medium rounded-md">
                                {totalOrdersCount}
                            </span>
                        </div>
                        <div className="w-full border mt-5 overflow-x-auto scroll-bar rounded-lg bg-slate-50 bg-opacity-65 backdrop-blur-lg ">
                            <table className="min-w-full">
                                <thead className="bg-slate-50 border-b border-gray-200 text-xs uppercase">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            No.
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Customer Name
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Amount
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Status
                                        </th>
                                        <th className="py-3 px-6 text-left text-slate-600 font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processOrders.data.length > 0 ? (
                                        processOrders.data.map(
                                            (order, index) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-b text-xs font-medium"
                                                >
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <div className="truncate max-w-[150px]">
                                                            {index +
                                                                1 +
                                                                (processOrders.current_page -
                                                                    1) *
                                                                    processOrders.per_page}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        {order.name}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800 flex items-center">
                                                        <FaPesoSign className="mr-1" />
                                                        {order.amount}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <span className="bg-yellow-200 text-yellow-800 text-medium font-semibold px-2 py-0.5 rounded-md">
                                                            {order.remarks ||
                                                                "Unknown"}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800">
                                                        <Link
                                                            href={route(
                                                                "seller.OrderDetails",
                                                                { id: order.id }
                                                            )}
                                                        >
                                                            <button className="px-4 py-1 flex items-center bg-slate-800 text-slate-50 rounded-md">
                                                                <AiOutlineEye className="mr-2" />
                                                                <span>
                                                                    View
                                                                </span>
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-4 px-6 text-slate-800 text-center text-sm "
                                            >
                                                No on process orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Add the Pagination component */}
                        <Pagination links={processOrders.links} />
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
