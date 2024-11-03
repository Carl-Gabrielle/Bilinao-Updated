import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { RxUpdate } from "react-icons/rx";
import TextInput from "@/Components/TextInput";
import SellerInput from "@/Components/SellerInput";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import DivContainer from "@/Components/DivContainer";

export default function Edit({ auth, category }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: "",
        name: category.name || "",
        _method: "PUT",
    });
    const [imagePreview, setImagePreview] = useState(category.image_path || "");

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("category.update", { category: category.id }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Edit Category" />
                <DivContainer>
                    <Link
                        href={route("category.index")}
                        className="mb-5 flex items-center  text-sm bg-slate-100  w-36 px-6 py-1 rounded-full font-semibold"
                    >
                        <MdOutlineKeyboardArrowLeft className="mr-2" />
                        <span>Go Back</span>
                    </Link>
                    <form
                        onSubmit={onSubmit}
                        className="p-6 bg-slate-50 bg-opacity-80  backdrop-blur-lg    rounded-3xl"
                    >
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                            Edit Category
                        </h1>
                        {imagePreview && (
                            <div className="mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Category Preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="category_image_path"
                                    value="Category Image"
                                />
                                <SellerInput
                                    id="category_image_path"
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2 text-red-600"
                                />
                            </div>
                            <div className="mb-6">
                                <InputLabel
                                    htmlFor="category_name"
                                    value="Category Name"
                                />
                                <SellerInput
                                    id="category_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2 text-red-600"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-center px-4 py-3 bg-slate-800  text-white text-sm font-medium rounded-2xl transition-all duration-200 w-full"
                            disabled={processing}
                        >
                            Update Category
                        </button>
                    </form>
                </DivContainer>
            </AuthenticatedLayout>
        </>
    );
}
