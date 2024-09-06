export default function Categories({ category }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.map((cat) => (
                <div key={cat.id} className="bg-white shadow-md rounded-lg p-4">
                    {cat.image_path && (
                        <img
                            src={`/storage/${cat.image_path}`}
                            alt={cat.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                    )}
                    <h2 className="text-xl font-semibold mt-4">{cat.name}</h2>
                </div>
            ))}
        </div>
    );
}
