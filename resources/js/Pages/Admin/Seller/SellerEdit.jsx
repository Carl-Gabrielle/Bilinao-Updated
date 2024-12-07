import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DivContainer from "@/Components/DivContainer";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Head, useForm, Link } from "@inertiajs/react";
import { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import SellerInput from "@/Components/SellerInput";

export default function SellerCreate({ auth, seller }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: seller.name || "",
        address: seller.address || "",
        contact_number: seller.contact_number || "",
        email: seller.email || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("seller.update", { seller: seller.id }));
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Seller" />
                <DivContainer>
                    <Link
                        href={route("seller.index")}
                        className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-2 rounded-full font-semibold"
                    >
                        <MdOutlineKeyboardArrowLeft className="mr-2" />
                        <span>Go Back</span>
                    </Link>
                    <div className="mt-10 bg-slate-50 bg-opacity-80  backdrop-blur-lg    overflow-hidden shadow-sm rounded-3xl p-6">
                        <form onSubmit={onSubmit}>
                            <h1 className="text-xl font-medium text-gray-800 mb-6">
                                Edit Seller{" "}
                                <span className="font-semibold">
                                    {seller.name}
                                </span>
                            </h1>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                                <div className="mb-4">
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <SellerInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel htmlFor="address">
                                        Address
                                    </InputLabel>
                                    <SellerInput
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                                <div className="mb-4">
                                    <InputLabel htmlFor="contact_number">
                                        Contact Number
                                    </InputLabel>
                                    <SellerInput
                                        id="contact_number"
                                        type="text"
                                        value={data.contact_number}
                                        onChange={(e) =>
                                            setData(
                                                "contact_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.contact_number && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.contact_number}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <SellerInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-center px-4 py-2 bg-slate-800  text-white text-sm font-medium rounded-2xl transition-all duration-200 w-full"
                                disabled={processing}
                            >
                                Update Seller
                            </button>
                        </form>
                    </div>
                </DivContainer>
            </AuthenticatedLayout>
        </>
    );
}
