import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DivContainer from "@/Components/DivContainer";
import { Head, useForm,Link } from "@inertiajs/react";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect } from "react";

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
                console.log('Seller created successfully');
            },
            onError: (errors) => {
                console.log('Form submission errors:', errors);
            }
        });
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Seller" />
                <div className="max-w-7xl mx-auto sm:px-20 lg:px-8 pb-10 pt-24 ">
                    <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 ">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">
                                    Contact Number
                                </label>
                                <input
                                    id="contact_number"
                                    type="text"
                                    value={data.contact_number}
                                    onChange={(e) => setData("contact_number", e.target.value)}
                                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.contact_number && <p className="text-red-500 text-xs mt-1">{errors.contact_number}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div className="flex items-center ">
                                <Link
                                        href={route("seller.index")}
                                        className=" py-1 px-3 text-gray-800 rounded  border border-primary mr-2"
                                    >
                                        Cancel
                                    </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline flex items-center"
                                >
                                <IoCreateOutline className="mr-2" /> Create Seller
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
            </AuthenticatedLayout>
        </>
    );
}
