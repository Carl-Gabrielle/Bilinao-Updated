import React, { useState, useEffect } from "react";
import { LuCookie } from "react-icons/lu";
export default function CookieConsent() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const isInteracted = localStorage.getItem("cookieConsent");
        if (!isInteracted) {
            setShowPopup(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowPopup(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowPopup(false);
    };

    if (!showPopup) return null;

    return (
        <div
            className="fixed bottom-4 right-10 bg-white shadow-xl rounded-lg p-6 w-80 sm:w-96 z-50 transform transition-transform translate-y-0 animate-slide-up"
        >
            <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary text-white p-2 rounded-full">
                    <LuCookie />
                </div>
                <div className="ml-4">
                    <p className="text-base font-semibold text-gray-900">
                        We Value Your Privacy
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                        We use cookies to enhance your experience. By continuing to use
                        our site, you agree to our use of cookies.{" "}
                    </p>
                    <div className="flex items-center justify-end mt-4 space-x-3">
                        <button
                            onClick={declineCookies}
                            className="px-4 py-2 bg-gray-100 text-primary rounded-lg text-sm hover:bg-gray-200 "
                        >
                            Decline
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm "
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
