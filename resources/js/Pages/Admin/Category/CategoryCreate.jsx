import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { MdPublish } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { HiX } from "react-icons/hi";
import SellerInput from "@/Components/SellerInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        image: "",
        name: "",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleImageRemove = () => {
        setImagePreview(null);
        setData("image", null);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("category.store"), data);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Category" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 pt-14">
                <Link
                    href={route("category.index")}
                    className="mb-5 px-6 py-2  font-bold text-lime-700  flex items-center"
                >
                    <MdOutlineKeyboardArrowLeft className="mr-2 text-2xl" /> Go Back
                </Link>

                <div className="bg-white shadow-md sm:rounded-lg">
                    <form
                        onSubmit={onSubmit}
                        className="p-6 sm:p-8 bg-white shadow-md sm:rounded-lg"
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Add Category
                            </h1>
                            <button
                                className="flex items-center px-6 py-2 bg-lime-700 text-white font-semibold rounded-md shadow hover:bg-lime-700 transition duration-200"
                                disabled={processing}
                            >
                                <MdPublish className="mr-2 text-xl" /> Publish Category
                            </button>
                        </div>
                        {imagePreview && (
                                        <div className="mt-4 mb-4 relative">
                                            <img
                                                src={imagePreview}
                                                alt="Image Preview"
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleImageRemove}
                                                className="absolute top-0 left-32 bg-red-500 text-white rounded-full p-1 transform -translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                                            >
                                                <HiX className="size-4" />
                                            </button>
                                        </div>
                                    )}

                        <div className="mt-6">
                            <InputLabel htmlFor="category_image_path" value="Category Image" />
                            <SellerInput
                                id="category_image_path"
                                type="file"
                                name="image"
                                className="mt-2 block w-full"
                                onChange={handleImageChange}
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <InputLabel htmlFor="category_name" value="Category Name" />
                            <SellerInput
                                id="category_name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full"
                                isFocused={true}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
