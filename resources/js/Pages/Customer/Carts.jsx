import CustomerContainer from "@/Components/CustomerContainer";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head, Link } from "@inertiajs/react";

export default function Carts({ auth, carts, cartCount }) {
    return (
        <CustomerLayout user={auth.user}>
            <Head title="Carts" />
            <div className="min-h-screen bg-gray-100 pt-20 pb-1">
                <div className="h-72 w-full bg-lime-700 mt-6 flex items-center justify-center rounded-b-3xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl text-white text-center">
                        Carts
                    </h2>
                </div>
                <CustomerContainer className="mt-32">
                    <h1 className="text-2xl font-medium text-slate-900 mb-5">
                        Your Cart{" "}
                        <span className="bg-lime-700 text-white px-4 rounded-md">
                            {cartCount}
                        </span>
                    </h1>
                    {carts.length > 0 ? (
                        <div className="grid gap-6">
                            {carts.map((cart, index) => (
                                <Link
                                    key={cart.product.id}
                                    href={route(
                                        "product.show",
                                        cart.product.id
                                    )}
                                >
                                    <div className="flex items-center bg-white p-4 shadow rounded-lg">
                                        <img
                                            src={`/storage/${cart.product.image}`}
                                            alt={cart.product.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold hover:underline-offset-2 hover:underline">
                                                {cart.product.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                Price: ${cart.product.price}
                                            </p>
                                            <p className="text-gray-600">
                                                Quantity: {cart.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Your cart is empty.
                        </p>
                    )}
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
}
