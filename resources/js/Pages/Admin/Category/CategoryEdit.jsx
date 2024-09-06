import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { RxUpdate } from "react-icons/rx";
import TextInput from "@/Components/TextInput";
import SellerInput from "@/Components/SellerInput";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ auth, category }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: '',
        name: category.name || '',
        _method: 'PUT'
    });
    const [imagePreview, setImagePreview] = useState(category.image_path || '');

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('category.update', { category: category.id }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
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
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Link href={route('category.index')} className="mb-5 flex items-center text-lime-600  font-semibold">
                            <MdOutlineKeyboardArrowLeft className="mr-2" /> Go Back
                        </Link>
                        <div className="bg-white shadow-md rounded-lg">
                            <form onSubmit={onSubmit} className="p-6 bg-white sm:rounded-lg">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-semibold text-gray-800">Edit Category</h1>
                                    <button
                                        type="submit"
                                        className="flex items-center px-4 py-2 bg-lime-600  text-white text-sm font-medium rounded-md transition-all duration-200"
                                        disabled={processing}
                                    >
                                        <RxUpdate className="mr-2" /> Update Category
                                    </button>
                                </div>
                                {imagePreview && (
                                    <div className="mb-4">
                                        <img src={imagePreview} alt="Category Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
                                    </div>
                                )}
                                <div className="mb-4">
                                    <InputLabel htmlFor="category_image_path" value="Category Image" />
                                    <SellerInput
                                        id="category_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-lime-500 focus:ring-lime-500"
                                        onChange={handleImageChange}
                                    />
                                    <InputError message={errors.image} className="mt-2 text-red-600" />
                                </div>
                                <div className="mb-6">
                                    <InputLabel htmlFor="category_name" value="Category Name" />
                                    <SellerInput
                                        id="category_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-lime-500 focus:ring-lime-500"
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2 text-red-600" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
