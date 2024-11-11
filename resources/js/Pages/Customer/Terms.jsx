import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import CustomerContainer from "@/Components/CustomerContainer";

export default function Terms({ auth }) {
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
                <Head title="Terms & Conditions" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Terms & Conditions" />
            <CustomerContainer>
                <div className="min-h-screen pt-20 pb-1">
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold text-center text-slate-800 mb-6 uppercase tracking-wide">
                            Terms & Conditions
                        </h1>
                        <div className="space-y-4 text-slate-700 leading-8 tracking-wide">
                            <p>Welcome to Bili-Nao, an online platform connecting customers with authentic traditional crafts from local artisans. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.  </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 1. Acceptance of Terms</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">By using Bili-Nao e-commerce platform, you accept and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our website. </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 2.  Platform Services</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">Bili-Nao provides a platform for artisans to showcase and sell their crafts directly to customers. Bili-Nao does not produce, store, or ship the products listed by artisans but facilitates transactions between buyers and sellers.  </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 3. Eligibility</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">You must be at least 18 years old to use our platform. By using Bili-Nao, you confirm that you meet this eligibility requirement.  </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 4.Account Registration</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">To use certain features of the platform, you must create an account. You agree to provide accurate, current, and complete information and to keep your account information updated. You are responsible for maintaining the confidentiality of your account and password.   </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 5. Pricing and Payments</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">All prices listed on Bili-Nao are in local currency unless otherwise specified. Bili-Nao is not responsible for additional charges or fees incurred by banks or payment processors. By purchasing a product, you agree to pay the specified price and any associated fees. </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 6. Limitation of Liability</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">Bili-Nao is not responsible for any damages arising from the use or inability to use the platform, including but not limited to direct, indirect, incidental, or consequential damages. Bili-Nao does not guarantee the accuracy of any content provided by artisans. </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 7. Indemnification</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">You agree to indemnify and hold harmless Bili-Nao, its affiliates, and partners from any claims, damages, liabilities, costs, or expenses arising from your use of the platform or breach of these Terms and Conditions.  </p>
                        </div>
                        <div className="mt-6 bg-slate-200 rounded-2xl p-3 ">
                            <h1 className="font-bold text-primary  text-xl"> 8. Modification of Terms</h1>
                            <p className="space-y-4 text-slate-700 leading-8 tracking-wide mt-4">Bili-Nao reserves the right to change these Terms and Conditions at any time. We will notify you of any significant changes by posting the revised terms on the platform. Your continued use of the platform following any changes constitutes acceptance of the new terms.  </p>
                        </div>
                    </div>
                </div>
            </CustomerContainer>
        </CustomerLayout>
    );
}
