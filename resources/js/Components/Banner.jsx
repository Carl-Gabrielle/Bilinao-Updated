import React from "react";
import { CiStar } from "react-icons/ci";
const Banner = ({ title, suffix, prefix }) => {
    return (
        <>
            <div className="h-72 w-full bg-slate-800 mt-6 flex items-center justify-center rounded-b-3xl relative overflow-hidden">
                {/* Main text */}
                <h2 className="text-center text-2xl md:text-3xl lg:text-5xl text-slate-100 font-medium z-10">
                    {title} {suffix} {prefix}
                </h2>

                {/* Star icons */}
                <CiStar className="hidden sm:block absolute top-20 left-32 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute top-24 left-56 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute top-20 right-32 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute top-24 right-56 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute bottom-20 right-52 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute bottom-20 left-52 text-white size-7 opacity-30" />

                {/* Decorative circles */}
                <div className="absolute size-52 rounded-full border opacity-30 right-0 sm:-right-10 -top-10 p-10"></div>
                <div className="absolute size-52 rounded-full border opacity-30 -bottom-10 -left-10 p-10"></div>

                {/* Duplicate text for background effect */}
                <h2 className="absolute top-28 text-center text-2xl md:text-3xl lg:text-5xl text-slate-100 font-medium opacity-10 transform translate-y-3 blur-sm tracking-wider">
                    {title} {suffix} {prefix}
                </h2>
            </div>
        </>
    );
};

export default Banner;
