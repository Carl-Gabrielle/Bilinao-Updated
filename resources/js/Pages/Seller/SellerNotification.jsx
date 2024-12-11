import SellerLayout from "@/Layouts/SellerLayout";
import { Head } from "@inertiajs/react";
import { TbSpeakerphone } from "react-icons/tb";
import { animateText } from '@/gsap';
import React, { useState, useEffect } from "react";

export default function SellerNotification({ auth = {}, success, announcement }) {
    const user = auth.user || {};

    const parseMessage = (message) => {
        const parts = message.split("\n");
        const title = parts[0];
        const description = parts[1];
        const tags = parts.slice(2);
        return { title, description, tags };
    };
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    useEffect(() => {
        if (!loading) {
            animateText();
        }
    }, [loading]);
    return (
        <SellerLayout user={user}>
            <Head title="Announcements" />
            <div className="relative">
                <div className="container mx-auto px-4 py-6">
                    <div className="px-7 py-8">
                        <h1 className="text-xl font-semibold text-gray-800 mb-0">
                            Announcements
                        </h1>
                        <div className="border mt-5 p-6 w-full h-auto shadow-lg bg-slate-50 rounded-3xl dashboard-card bg-opacity-65 backdrop-blur-lg">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-primary mb-4">Stay Updated with Important Announcements</h2>
                                <p className="text-md text-gray-600">Stay informed about key updates, platform changes, and opportunities that could impact your store. Check back regularly for important notifications from the admin.</p>
                            </div>
                            {announcement && announcement.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {announcement.map((item) => {
                                        const { title, description, tags } = parseMessage(item.message);
                                        return (
                                            <div key={item.id} className=" border-b pb-6 bg-white shadow-md rounded-xl p-4 overflow-hidden">
                                                <h2 className="text-lg font-semibold text-primary flex items-center">
                                                    <TbSpeakerphone className="mr-2 size-4" />
                                                    {title}
                                                </h2>
                                                <p className="text-lg text-gray-800 mb-3">{description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {tags.length > 0 ? (
                                                        tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className={`text-sm px-3 py-1 rounded-full ${index % 2 === 0
                                                                    ? "text-xs font-medium bg-blue-100 text-blue-700 py-1 px-3 rounded-full"
                                                                    : "text-xs font-medium bg-green-100 text-green-700 py-1 px-3 rounded-full"
                                                                    }`}
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-500">No tags</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <h1 className="text-gray-500 text-lg">No announcements</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
