import { useState, useEffect } from "react";
import mockup from "../Pages/Illustrations/mockup.png";
import mockup1 from "../Pages/Illustrations/mockup1.png";
import BgImage from "../Pages/Illustrations/bg_frame.png";
import Logo from "../Pages/Illustrations/LOGO.png";

export default function Carousel() {
    const [currentImage, setCurrentImage] = useState(mockup);
    const [currentText, setCurrentText] = useState("Endless Choices, Limitless Style!");
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                if (currentImage === mockup) {
                    setCurrentImage(mockup1);
                    setCurrentText("Shop with Confidence – Secure Payments, Guaranteed!");
                } else {
                    setCurrentImage(mockup);
                    setCurrentText("Endless Choices, Limitless Style!");
                }
                setFade(true);
            }, 200);

        }, 4000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="relative overflow-hidden w-full min-h-[310px] flex flex-col items-center justify-end sm:h-full shadow-inner order-1 lg:order-2 space-x-3 bg-slate-300 rounded-b-3xl sm:rounded-none">
            <img src={Logo} alt="" className="h-7 top-5 sm:top-10 sm:h-12 absolute w-auto" />
            <img src={BgImage} className="object-cover" alt="Bilinao Logo" />

            <div
                className={`absolute top-10 sm:top-20 object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
                <img src={currentImage} alt="Mockup" className="transition-opacity duration-500" />
            </div>

            <div
                className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            >
                <p className="text-primary text-lg text-center font-medium tracking-wide">{currentText}</p>
                <p className="bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight bg-clip-text text-transparent text-1xl sm:text-3xl pb-6">
                    Discover Unique, Handcrafted Treasures
                </p>
            </div>
        </div>
    );
}
