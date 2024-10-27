import SellerLayout from "@/Layouts/SellerLayout";
import { FaPesoSign } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { Head, Link, usePage } from "@inertiajs/react";
export default function ShippedOrders({ auth = {},
    shippedOrders = {},
    success, }) {
    const { props } = usePage();
    const user = props.auth.user;
    return (
        <SellerLayout user={user}>
            <Head title="Shipped Orders" />
            <div className="container mx-auto px-4 py-6">
                <div className="px-7 py-8 ">
                    <div className="w-full ">
                        <h1 className="text-xl font-semibold text-gray-800 mb-0">
                            Shipped Orders
                        </h1>
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
                                    {shippedOrders.data.length > 0 ? (
                                        shippedOrders.data.map((order, index) => (
                                            <tr key={order.id} className="border-b  text-xs font-medium">
                                                <td className="py-4 px-6 text-slate-800">
                                                    <div className="truncate max-w-[150px]">
                                                        {index +
                                                            1 +
                                                            (shippedOrders.current_page -
                                                                1) *
                                                            shippedOrders.per_page}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-slate-800">
                                                    {order.name}
                                                </td>
                                                <td className="py-4 px-6 text-slate-800 flex items-center">
                                                    <FaPesoSign className="mr-2" />
                                                    {order.amount}
                                                </td>
                                                <td className="py-4 px-6 text-slate-800">
                                                    <span className="bg-blue-200  text-blue-800 text-medium font-semibold px-2 py-0.5 rounded-md whitespace-nowrap">
                                                        {order.remarks ||
                                                            "Unknown"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-800">
                                                    <Link href={route(
                                                        "seller.OrderDetails",
                                                        { id: order.id }
                                                    )}>
                                                        <button className="px-4 py-1 flex items-center  bg-slate-800 text-slate-50 rounded-md">
                                                            <AiOutlineEye className="mr-2" />
                                                            <span>View</span>
                                                        </button>{" "}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    ) : (
                                        < tr >
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
                    </div>
                </div>
            </div>
        </SellerLayout >
    );
}
