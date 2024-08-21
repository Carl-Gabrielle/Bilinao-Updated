import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { HiX } from "react-icons/hi";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const [imagePreview, setImagePreview] = useState(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        image: '',
        name: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

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
        setData('image', null); 
    };
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('category.store'), data);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Create new category
                        </h2>
                    </div>
                }
            >
                <Head title="Create category" />
                    <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white shadow-md sm:rounded-lg">
                            {imagePreview && (
                                        <div className="mt-4 mb-4 relative">
                                            <img
                                                src={imagePreview}
                                                alt="Image Preview"
                                                className="size-20 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleImageRemove}
                                                className="absolute top-0 left-20 bg-red-500 text-white rounded-full p-1 transform -translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                                            >
                                                <HiX className="size-4" />
                                            </button>
                                        </div>
                                    )}
                                <div>
                                    <InputLabel htmlFor="category_image_path" value="Category Image" />
                                    <TextInput
                                        id="category_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={handleImageChange}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="category_name" value="Category Name" />
                                    <TextInput
                                        id="category_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("category.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                        disabled={processing}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>  
                    </div>
            </AuthenticatedLayout>
        </>
    );
}
