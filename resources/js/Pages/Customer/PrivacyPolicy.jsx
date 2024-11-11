import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import CustomerContainer from "@/Components/CustomerContainer";

export default function PrivacyPolicy({ auth }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return (
            <CustomerLayout user={auth.user}>
                <Head title="Privacy Policy" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Privacy Policy" />
            <CustomerContainer>
                <div className="min-h-screen pt-20 pb-1">
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold text-center text-slate-800 mb-6 uppercase tracking-wide">
                            Privacy Policy
                        </h1>
                        <div className="space-y-4 text-slate-700 leading-8 tracking-wide">
                            <p>Welcome to Bili-Nao, an e-commerce platform dedicated to showcasing and selling traditional crafts by local artisans. Protecting your privacy and data is essential to us.This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website or use our services. By using Bili-Nao, you consent to the terms outlined in this policy. </p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-bold text-primary  text-xl"> Information We Collect</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">We collect information to improve and personalize our services, including personal details such as your name, email address, shipping and billing addresses, phone number, and payment information provided during account registration, checkout, or when making a purchase.</p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-bold text-primary  text-xl"> How We Use Your Information</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">We respect your privacy and only share your personal information when necessary. This includes sharing contact and order details with artisans to fulfill and ship your order, providing third-party service providers like payment processors and shipping companies with the information needed to perform tasks on our behalf, and in the event of a merger, acquisition, or sale of assets, transferring your information to the involved parties.</p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-bold text-primary  text-xl"> Your Rights and Choices</h1>
                            <p className="space-y-4  text-slate-700 leading-8 tracking-wide mt-4">Depending on your location, you may have certain rights regarding your personal information, including the ability to access and update your account details by logging in. However, please note that account deletion is not permitted, though you can request the removal of certain personal information, subject to any legal or contractual obligations.</p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-bold text-primary  text-xl">Data Security </h1>
                            <p className="space-y-4  text-slate-700 leading-8 tracking-wide mt-4">We implement industry-standard security measures, including encryption, secure servers, and access controls, to protect your information from unauthorized access, disclosure, or misuse. While we take all necessary precautions, please note that no online data transmission or storage method is 100% secure, and we cannot guarantee absolute security.</p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-bold text-primary  text-xl"> Contact Us</h1>
                            <p className="space-y-4  text-slate-700 leading-8 tracking-wide mt-4">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at  bilinao@gmail.com</p>
                        </div>
                    </div>
                </div>
            </CustomerContainer>
        </CustomerLayout>
    );
}
