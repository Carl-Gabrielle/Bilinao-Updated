import { useState, useRef, useEffect } from "react";
import DivContainer from "@/Components/DivContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TbSpeakerphone } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { Head, usePage, router } from "@inertiajs/react";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdOutlineAnnouncement } from "react-icons/md";
import SellerInput from "@/Components/SellerInput";

export default function Announcement({ auth, announcements }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const menuRef = useRef(null);

    const handleToggleMenu = (id, event) => {
        event.stopPropagation();
        setActiveMenuId((prevId) => (prevId === id ? null : id));
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setActiveMenuId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        setTags("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = tags.split(" ").filter(Boolean);
        router.post(route("announcements.store"), {
            title,
            description,
            tags: tagsArray,
        }, {
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this announcement?")) {
            router.delete(route("announcements.destroy", { id }));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Announcements" />
            <DivContainer>
                <div className="w-full h-auto">
                    <div className="bg-slate-50 bg-opacity-80 backdrop-blur-lg shadow-sm rounded-3xl p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-primary">Announcements</h1>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-slate-800 py-3 px-6 text-white rounded-2xl font-bold shadow text-xs flex items-center"
                            >
                                <MdAdd className="mr-2 size-4" />
                                Add New
                            </button>
                        </div>
                        <p className="mb-6 text-md text-gray-700 flex items-center">
                            <MdOutlineAnnouncement className="mr-2 text-primary" />
                            Share Announcements to Keep Users Informed and Updated
                        </p>
                        <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
                            {announcements.map((announcement) => (
                                <div key={announcement.id} className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden">
                                    <div className="p-4 flex flex-col justify-between w-full relative">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-primary flex items-center">
                                                <TbSpeakerphone className="mr-2 size-4" />
                                                {announcement.title}
                                            </h2>
                                            <button
                                                onClick={(event) => handleToggleMenu(announcement.id, event)}
                                                ref={menuRef}
                                                className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                                            >
                                                <CiMenuKebab className="size-4" />
                                            </button>
                                        </div>
                                        {activeMenuId === announcement.id && (
                                            <div className="absolute w-36 h-auto flex flex-col items-start p-2 bg-white shadow-lg border rounded-md right-12 top-5 z-10">
                                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded-md transition duration-200">
                                                    <AiOutlineEdit className="mr-2 text-blue-500" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(announcement.id)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded-md transition duration-200"
                                                >
                                                    <AiOutlineDelete className="mr-2 text-red-500" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-700 mb-4">{announcement.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {announcement.tags.map((tag, index) => (
                                                <span key={index} className="text-xs font-medium bg-blue-100 text-blue-700 py-1 px-3 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center mt-4 text-sm text-gray-500 font-medium">
                                            <FaRegClock className="mr-2" />
                                            <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DivContainer>
            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 ">Add a  New Announcement</h2>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-700 p-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                                >
                                    <IoClose className="size-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <SellerInput
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="focus:outline-none focus:ring-0 border focus:border-slate-800 focus:border hover:border-gray-900 py-2 px-4 w-full rounded-2xl border-gray-500 bg-transparent"
                                        rows="5"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                    <SellerInput
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        placeholder="#tag1 #tag2"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary py-2 px-6 rounded-2xl text-slate-50 text-sm font-semibold"
                                >
                                    Publish
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </AuthenticatedLayout >
    );
}
