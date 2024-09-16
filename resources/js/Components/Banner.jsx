import React from "react";
import { CiStar } from "react-icons/ci";

const Banner = ({ title, suffix, prefix }) => {
    return (
        <>
            <div className="h-72 w-full bg-primary mt-6 flex items-center justify-center rounded-b-3xl relative overflow-hidden">
                <h2 className=" text-center  text-2xl md:text-3xl lg:text-4xl  text-white  text-wrap">
                    {title} {suffix} {prefix}
                </h2>
                <CiStar className="hidden sm:block absolute top-20 left-32 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute top-24 left-56 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute top-20 right-32 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute top-24 right-56 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute bottom-20 right-52 text-white size-7 opacity-30" />
                <CiStar className="hidden sm:block absolute bottom-20 left-52 text-white size-7 opacity-30" />
                <div className="absolute size-52 rounded-full border opacity-30  right-0 sm:-right-10 -top-10 p-10"></div>
                <div className="absolute size-52 rounded-full border opacity-30 -bottom-10 -left-10 p-10"></div>
            </div>
        </>
    );
};

export default Banner;
