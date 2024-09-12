import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { GrCart } from "react-icons/gr";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";

export default function Products({ products, auth, category }) {
    const categoryData = category?.data ?? [];
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Products" />
            <div className="min-h-screen pt-20 pb-1">
                <div className="h-72 w-full bg-lime-700 mt-6 flex items-center justify-center rounded-b-3xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl text-white text-center">
                        Products
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row mt-12">
                    {/* Sidebar for Filters */}
                    <aside className="lg:w-1/4 lg:ml-6 mb-6 lg:mb-0 bg-white rounded-lg  border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2">
                                Filters
                            </h3>
                            {/* Category Filter */}
                            <div className="mb-6">
                                <h4 className="text-md font-semibold mb-4">
                                    Category
                                </h4>
                                <ul className="space-y-2">
                                    {/* Replace with actual category options */}
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Home Decorations
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Tie Dye Shirts
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Hand Made Bags
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Accessories
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Paintings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Hand Made Mats
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Availability Filter */}
                            <div>
                                <h4 className="text-md font-semibold mb-4">
                                    Availability
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            In Stock
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 rounded hover:bg-lime-100 transition-colors"
                                        >
                                            Out of Stock
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <CustomerContainer className="flex-1">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route("product.show", product.id)}
                                >
                                    <div className="bg-gray-50 rounded-2xl p-4 ">
                                        <img
                                            src={`/storage/${product.images[0].image_path}`}
                                            alt={product.name}
                                            className="w-full h-48 object-cover mb-4 rounded-lg"
                                        />
                                    </div>
                                    <div className="rounded-2xl text-xs p-3 flex items-center justify-between  ">
                                        <div>
                                            <h3 className="pb-1 text-md font-semibold">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm">
                                                <FaPesoSign className="inline-block mr-1" />
                                                {product.price}
                                            </p>
                                        </div>
                                        <div className="bg-yellow-500 px-3 py-3 rounded-full text-white">
                                            <GrCart size={15} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CustomerContainer>
                </div>
            </div>
        </CustomerLayout>
    );
}
