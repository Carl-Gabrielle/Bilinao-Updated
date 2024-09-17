import React from "react";
import { Link } from "@inertiajs/react";

export default function Menu({ href = "#", className = "", children }) {
    return (
        <Link
            href={href}
            className={`hover:text-white text-slate-500 transition-colors duration-300 block leading-7 ${className}`}
        >
            {children}
        </Link>
    );
}
