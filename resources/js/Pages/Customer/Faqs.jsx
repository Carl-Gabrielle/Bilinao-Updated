import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/Components/LoadingSkeletal";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import CustomerContainer from "@/Components/CustomerContainer";

export default function Faqs({ auth }) {
    const [loading, setLoading] = useState(true);

    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is Bili-Nao E-commerce platform?",
            answer:
                "Bili-Nao is an online marketplace connecting customers with local artisans who create authentic traditional crafts. Our platform allows artisans to showcase their unique products, and customers can easily browse and purchase these items to support local craftsmanship.",
        },
        {
            question: "How do I create an account on Bili-Nao?",
            answer:
                "To create an account, click on the  \"Sign Up\" button on our homepage and enter the required details. You’ll need to provide a valid email address and create a password. Once registered, you can browse, purchase, or even apply to sell your own crafts on the platform. ",
        },
        {
            question: "I’m an artisan. How can I sell my products on Bili-Nao?",
            answer:
                "We’re thrilled you’re interested in joining Bili-Nao! To become an artisan on our platform, the account creation process is managed by our admin team. Once approved, the admin will create your seller account and provide you with a unique username for logging in. You will receive a confirmation message with your login details once your application is successfully processed. ",
        },
        {
            question: "What payment methods do you accept",
            answer:
                "Bili-Nao accepts digital payments through GCash and PayMaya, providing a secure and convenient way to complete transactions. Both payment methods are fully integrated into the platform, ensuring a smooth and safe checkout experience. All transactions are processed securely, giving you peace of mind while shopping ",
        },
        {
            question: "Is it possible to return an item?",
            answer:
                "We do not offer a standard return policy. However, if you receive a damaged or incorrect product, you may be eligible for a replacement or refund. ",
        },
        {
            question: "Can I trust that my payment details are protected?",
            answer:
                "Yes, you can trust that your payment details are fully protected. We use industry-leading encryption and security protocols to safeguard your payment information. Bili-Nao does not store any credit card details, and all transactions are securely processed through trusted third-party payment gateways, ensuring your financial data remains safe and private.",
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) {
        return (
            <CustomerLayout user={auth.user}>
                <Head title="Faq's" />
                <LoadingSpinner />
            </CustomerLayout>
        );
    }
    return (
        <CustomerLayout user={auth.user}>
            <Head title="FAQ's" />
            <CustomerContainer>
                <div className="min-h-screen pt-20 pb-1">
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold text-center text-slate-800 mb-6 uppercase tracking-wide">
                            <span className="font-normal">Frequently</span> Asked Questions
                        </h1>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div className=" bg-slate-200 rounded-2xl p-3  pb-4 flex items-center space-x-5 justify-center">
                                    <span className="bg-blue-200 text-blue-600 font-medium rounded-lg px-4 py-1">Q</span>
                                    <div key={index}>
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => toggleAnswer(index)}
                                        >
                                            <h2 className="text-md font-medium text-slate-800 tracking-wide">
                                                {faq.question}
                                            </h2>
                                            <MdKeyboardArrowRight
                                                className={`transform transition-all ${activeIndex === index ? "rotate-90" : ""
                                                    }`}
                                                size={24}
                                            />
                                        </div>
                                        <div
                                            className={`faq-answer transition-all duration-500 ease-in-out overflow-hidden border-t   leading-relaxed tracking-wide ${activeIndex === index ? "max-h-screen opacity-100" : "max-h-0  opacity-0"
                                                }`}
                                        >
                                            <p className="mt-2 text-slate-700 text-base">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CustomerContainer>
        </CustomerLayout>
    );
}
