import DivContainer from "@/Components/DivContainer";
import { LiaEditSolid } from "react-icons/lia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Shipping({ auth, shipping }) {
    const { user } = auth;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Shipping" />
            <DivContainer>
                <div className="w-full h-auto   ">
                    <div className="bg-slate-50 bg-opacity-80 backdrop-blur-lg overflow-hidden shadow-sm rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Shipping Rates
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50  ">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Minimum Weight(g)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Maximum Weight(g)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Luzon
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Visayas
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mindanao
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Island
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                    {shipping.data.length === 0 ? (
                                        <p className="text-gray-500">
                                            No Shipping Details.
                                        </p>
                                    ) : (
                                        <>
                                            {shipping.data.map((ship) => (
                                                <tr key={ship.id}>
                                                    <td className="px-6 whitespace-nowrap  text-slate-600">
                                                        {ship.weight_min}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-slate-600">
                                                        {ship.weight_max}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap  text-slate-600">
                                                        {formatCurrency(
                                                            ship.luzon
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap  text-slate-600">
                                                        {formatCurrency(
                                                            ship.visayas
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap f text-slate-600">
                                                        {formatCurrency(
                                                            ship.mindanao
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap  text-slate-600">
                                                        {formatCurrency(
                                                            ship.island
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-2 whitespace-nowrap  text-slate-600">
                                                        <Link
                                                            href={route(
                                                                "shipping.edit",
                                                                ship.id
                                                            )}
                                                        >
                                                            <button className=" text-xs   rounded py-2 px-2 flex items-center justify-center">
                                                                <LiaEditSolid className="size-5  text-slate-600 mr-2" />
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
