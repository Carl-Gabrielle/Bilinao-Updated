import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="flex justify-start mt-6 text-sm">
            <ul className="inline-flex items-center space-x-1">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            preserveScroll
                            href={link.url || "#"}
                            className={`inline-block py-1 px-3 rounded-lg border ${
                                link.active 
                                    ? "bg-slate-800 border-slate-800 text-white" 
                                    : link.url 
                                        ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400" 
                                        : "bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            aria-disabled={!link.url} 
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
