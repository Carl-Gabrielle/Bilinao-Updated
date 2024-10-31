import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MdUpdate } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DivContainer from "@/Components/DivContainer";
import { Head, Link } from "@inertiajs/react";
import AdminInput from "@/Components/AdminInput";

export default function ShippingUpdate({ auth, shipping }) {
    const { data, setData, put, errors } = useForm({
        weight_min: shipping.weight_min,
        weight_max: shipping.weight_max,
        luzon: shipping.luzon,
        visayas: shipping.visayas,
        mindanao: shipping.mindanao,
        island: shipping.island,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("shipping.update", shipping.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Update Shipping" />
            <DivContainer>
                <Link
                    href={route("shipping.index")}
                    className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-1 rounded-full font-semibold"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2" />
                    <span>Go Back</span>
                </Link>
                <div className="w-full h-auto">
                    <div className="bg-slate-50 bg-opacity-80 backdrop-blur-lg overflow-hidden shadow-sm rounded-3xl p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-5">
                                    Update Shipping Rate
                                </h2>
                                <button
                                    type="submit"
                                    className="bg-slate-800 text-slate-50 px-4 py-2 rounded-md flex items-center"
                                >
                                    <MdUpdate className="mr-2" />
                                    Update Shipping Rate
                                </button>
                            </div>
                            <div className="grid   lg:grid-cols-3 gap-6 mb-4">
                                <div>
                                    <label
                                        htmlFor="weight_min"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Minimum Weight (g)
                                    </label>
                                    <AdminInput
                                        type="number"
                                        name="weight_min"
                                        value={data.weight_min}
                                        onChange={(e) =>
                                            setData(
                                                "weight_min",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.weight_min && (
                                        <p className="text-red-600 text-sm">
                                            {errors.weight_min}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="weight_max"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Maximum Weight (g)
                                    </label>
                                    <AdminInput
                                        type="number"
                                        name="weight_max"
                                        value={data.weight_max}
                                        onChange={(e) =>
                                            setData(
                                                "weight_max",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.weight_max && (
                                        <p className="text-red-600 text-sm">
                                            {errors.weight_max}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="luzon"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Luzon Rate
                                    </label>
                                    <AdminInput
                                        type="number"
                                        name="luzon"
                                        value={data.luzon}
                                        onChange={(e) =>
                                            setData("luzon", e.target.value)
                                        }
                                    />
                                    {errors.luzon && (
                                        <p className="text-red-600 text-sm">
                                            {errors.luzon}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="visayas"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Visayas Rate
                                    </label>
                                    <AdminInput
                                        type="number"
                                        name="visayas"
                                        value={data.visayas}
                                        onChange={(e) =>
                                            setData("visayas", e.target.value)
                                        }
                                    />
                                    {errors.visayas && (
                                        <p className="text-red-600 text-sm">
                                            {errors.visayas}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="mindanao"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mindanao Rate
                                    </label>
                                    <AdminInput
                                        type="number"
                                        name="mindanao"
                                        value={data.mindanao}
                                        onChange={(e) =>
                                            setData("mindanao", e.target.value)
                                        }
                                    />
                                    {errors.mindanao && (
                                        <p className="text-red-600 text-sm">
                                            {errors.mindanao}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="island"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Island Rate
                                    </label>
                                    <AdminInput
                                        type="number"
                                        name="island"
                                        value={data.island}
                                        onChange={(e) =>
                                            setData("island", e.target.value)
                                        }
                                    />
                                    {errors.island && (
                                        <p className="text-red-600 text-sm">
                                            {errors.island}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DivContainer>
        </AuthenticatedLayout>
    );
}
