
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Menu({ href = '#', className = '', children }) {
    return (
        <Link
            href={href}
            className={`hover:text-white text-gray-400 transition-colors duration-300 block leading-7 ${className}`}
        >
            {children}
        </Link>
    );
}
