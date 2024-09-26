import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DivContainer from "@/Components/DivContainer";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Head, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import SellerInput from "@/Components/SellerInput";

export default function Shipping({ auth, shipping }) {
    const { data, setData } = useForm({
        weightMin: shipping?.weight_min || "",
        weightMax: shipping?.weight_max || "",
        luzon: shipping?.luzon || "",
        visayas: shipping?.visayas || "",
        mindanao: shipping?.mindanao || "",
        island: shipping?.island || "",
        _method: "PUT",
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Shipping" />
            <DivContainer>
                <Link
                    href={route("shipping.index")}
                    className="mb-5 flex items-center text-sm bg-slate-100 w-36 px-6 py-1 rounded-full font-semibold"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="mt-10 bg-slate-50 bg-opacity-80 backdrop-blur-lg overflow-hidden shadow-sm rounded-3xl p-6">
                    <form>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-semibold text-gray-800">
                                Update Shipping Rates
                            </h1>
                            <button
                                type="submit"
                                className="flex items-center px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-md transition-all duration-200"
                            >
                                <RxUpdate className="mr-2" /> Update Shipping
                                Rates
                            </button>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Minimum Weight(g)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Maximum Weight
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        <SellerInput
                                            id="weightMin"
                                            type="text"
                                            value={data.weightMin}
                                            onChange={(e) =>
                                                setData(
                                                    "weightMin",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        <SellerInput
                                            id={"weightMax"}
                                            type="text"
                                            value={data.weightMax}
                                            onChange={(e) =>
                                                setData(
                                                    "weightMax",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        <SellerInput
                                            id={"luzon"}
                                            type="text"
                                            value={data.luzon}
                                            onChange={(e) =>
                                                setData("luzon", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        <SellerInput
                                            id={"visayas"}
                                            type="text"
                                            value={data.visayas}
                                            onChange={(e) =>
                                                setData(
                                                    "visayas",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        <SellerInput
                                            id={"mindanao"}
                                            type="text"
                                            value={data.mindanao}
                                            onChange={(e) =>
                                                setData(
                                                    "mindanao",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        <SellerInput
                                            id={"island"}
                                            type="text"
                                            value={data.island}
                                            onChange={(e) =>
                                                setData(
                                                    "island",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
