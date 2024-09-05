import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center px-4 py-2 my-4 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg ${
                active
                    ? 'bg-lime-700 text-white shadow-lg'
                    : 'text-gray-700  hover:bg-gray-100'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
