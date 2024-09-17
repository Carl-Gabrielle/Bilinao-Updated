import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { LiaHandHoldingHeartSolid, LiaPeopleCarrySolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import Banner from "@/Components/Banner";
import { MdOutlineRocket } from "react-icons/md";
import { Head } from "@inertiajs/react";

export default function About({ auth }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="About Us" />
            <div className="min-h-screen   pt-20 pb-1 ">
                <Banner title="About Us" />
                <div className=" w-full h-auto  py-10  ">
                    <div className="max-w-5xl mx-auto px-6 ">
                        <div className="flex items-center space-x-3">
                            <hr className="w-28 border  border-slate-500 mb-6" />
                            <h1 className=" font-bold text text-3xl mb-6 uppercase tracking-widest">
                                About Bilinao
                            </h1>
                        </div>

                        <h1 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-slate-800 mb-6 uppercase tracking-wide">
                            Know Our Story
                        </h1>

                        <p className="text-md  leading-8 mx-auto tracking-wide">
                            Bili-Nao is dedicated to preserving and protecting
                            the revered practice of traditional crafts. Our main
                            aim is to provide an online platform that functions
                            as a specialized space for local artisans to
                            showcase and distribute their extensive artisanal
                            crafts to a worldwide audience that values the skill
                            and cultural importance behind each handmade piece.
                        </p>
                    </div>
                </div>
                {/* bg-gradient-to-r from-blue-50 to-blue-100 */}
                <div className="py-10 w-full h-auto mb-10 ">
                    <div className="max-w-5xl mx-auto px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-20 gap-6 items-center">
                            <div className="order-1 md:order-2 h-72 w-full bg-slate-50 rounded-md"></div>
                            <div className="order-2 md:order-1 text-center md:text-left">
                                <div className="flex items-center space-x-3">
                                    <hr className="w-28 border  border-slate-500 mb-6" />
                                    <h1 className=" font-bold text text-3xl mb-6 uppercase tracking-widest">
                                        Mission
                                    </h1>
                                </div>
                                <h1 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-slate-800 mb-6 uppercase tracking-wide">
                                    Our Mission
                                </h1>
                                <p className="text-md leading-8 max-w-3xl mx-auto md:mx-0 tracking-wide">
                                    To promote and preserve the traditional
                                    handicrafts of Bolinao while supporting
                                    local artisans
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-10 w-full h-auto mb-10 ">
                    <div className="max-w-5xl mx-auto px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-20 gap-6 items-center">
                            <div className="order-2 md:order-1 h-72 w-full bg-slate-50 rounded-md"></div>
                            <div className="order-1 md:order-2 text-center md:text-left">
                                <div className="flex items-center space-x-3">
                                    <hr className="w-28 border  border-slate-500 mb-6" />
                                    <h1 className=" font-bold text text-3xl mb-6 uppercase tracking-widest">
                                        Vision
                                    </h1>
                                </div>
                                <h1 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-slate-800 mb-6 uppercase tracking-wide">
                                    Our Vision
                                </h1>
                                <p className="text-md leading-8 max-w-3xl mx-auto md:mx-0 tracking-wide">
                                    To become the leading platform for Bolinao's
                                    handcrafted products, recognized globally
                                    for quality and authenticity
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-full h-auto mb-10 bg-slate-200 py-10">
                    <div className="max-w-5xl mx-auto px-6 py-5 ">
                        <h1 className="text-lg text-center font-bold text-slate-800 mb-6 uppercase tracking-wide">
                            Why We Are Here?
                        </h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-4xl mx-auto px-6">
                            <div className="px-6 py-4 bg-white tracking-wide  rounded-md text-xs font-medium flex flex-col gap-3 items-center ">
                                <div className="bg-slate-800 size-12 rounded-full flex items-center justify-center">
                                    <LiaHandHoldingHeartSolid className="text-white size-6 " />
                                </div>
                                <span className="text-center text-slate-800">
                                    Preserving Traditions
                                </span>
                            </div>
                            <div className="px-6 py-4 bg-white tracking-wide  rounded-md text-xs font-medium flex flex-col gap-3 items-center">
                                <div className="bg-slate-800 size-12 rounded-full flex items-center justify-center">
                                    <LiaPeopleCarrySolid className="text-white size-6" />
                                </div>
                                <span className="text-center text-slate-800">
                                    Supporting Artisans
                                </span>
                            </div>
                            <div className="px-6 py-4 bg-white  tracking-wide  rounded-md text-xs font-medium flex flex-col gap-3 items-center ">
                                <div className="bg-slate-800 size-12 rounded-full flex items-center justify-center">
                                    <MdOutlineRocket className="text-white size-6 " />
                                </div>
                                <span className="text-center text-slate-800">
                                    Successful Digital Business
                                </span>
                            </div>
                            <div className="px-6 py-4 bg-white tracking-wide rounded-md text-xs font-medium flex flex-col gap-3 items-center">
                                <div className="bg-slate-800 size-12 rounded-full flex items-center justify-center">
                                    <IoHomeOutline className="text-white size-6" />
                                </div>
                                <span className="text-center text-slate-800  ">
                                    Showcasing Craftsmanship
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
