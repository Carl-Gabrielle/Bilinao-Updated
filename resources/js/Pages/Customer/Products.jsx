import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { GrCart } from "react-icons/gr";
import { FaPesoSign } from "react-icons/fa6";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Products({ products, auth, category }) {
    const categoryData = category?.data ?? [];
    const productData = products.data;
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
                    {/* ASIDE */}
                    {/* Products Grid */}
                    <CustomerContainer className="flex-1">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {productData.map((product) => (
                                <Link
                                    key={product.id}
                                    // href={route("product.show", product.id)}
                                >
                                    <div className="bg-gray-50 rounded-2xl p-4">
                                        <img
                                            src={`/storage/${product.images[0].image_path}`}
                                            alt={product.name}
                                            className="w-full h-48 object-cover mb-4 rounded-lg"
                                        />
                                    </div>
                                    <div className="rounded-2xl text-xs p-3 flex items-center justify-between">
                                        <div>
                                            <h3 className="pb-1 text-md font-semibold">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm">
                                                <FaPesoSign className="inline-block mr-1" />
                                                {product.price}
                                            </p>
                                        </div>
                                        <Link
                                            href={route("cart.store")}
                                            method="post"
                                            data={{
                                                product_id: product.id,
                                                quantity: 1,
                                            }}
                                        >
                                            <div className="bg-yellow-500 px-3 py-3 rounded-full text-white">
                                                <GrCart size={15} />
                                            </div>
                                        </Link>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination links={products.links} />
                    </CustomerContainer>
                </div>
            </div>
        </CustomerLayout>
    );
}
