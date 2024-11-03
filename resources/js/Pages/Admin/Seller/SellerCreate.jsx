import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DivContainer from "@/Components/DivContainer";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Head, useForm, Link } from "@inertiajs/react";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import SellerInput from "@/Components/SellerInput";

export default function SellerCreate({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        contact_number: "",
        email: "",
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("seller.store"), {
            onSuccess: () => {
                console.log("Seller created successfully");
            },
            onError: (errors) => {
                console.log("Form submission errors:", errors);
            },
        });
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Seller" />
                <DivContainer>
                    <Link
                        href={route("seller.index")}
                        className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-1 rounded-full font-semibold"
                    >
                        <MdOutlineKeyboardArrowLeft className="mr-2" />
                        <span>Go Back</span>
                    </Link>
                    <div className="  bg-slate-50 bg-opacity-80  backdrop-blur-lg   overflow-hidden shadow-sm rounded-3xl p-6 ">
                        <form onSubmit={submit}>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                                Create Seller
                            </h1>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                                <div className="mb-4">
                                    <InputLabel className="mb-2" htmlFor="name">
                                        Name
                                    </InputLabel>
                                    <SellerInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Enter seller name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="address"
                                    >
                                        Address
                                    </InputLabel>
                                    <SellerInput
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Enter seller address"
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
                                    <InputLabel
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="contact_number"
                                    >
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
                                        placeholder="Enter contact number"
                                    />
                                    {errors.contact_number && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.contact_number}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </InputLabel>
                                    <SellerInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter seller email"
                                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                disabled={processing}
                                className="bg-slate-800 text-center w-full text-white font-bold px-4 py-2 rounded-2xl focus:outline-none focus:shadow-outline "
                            >
                                Create Seller
                            </button>
                        </form>
                    </div>
                </DivContainer>
            </AuthenticatedLayout>
        </>
    );
}
