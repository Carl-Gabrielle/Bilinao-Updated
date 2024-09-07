<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/* Safeguard by checking if categoryData is an array */}
{categoryData && categoryData.length > 0 ? (
    categoryData.map((cat) => (
        <Link
            key={cat.id}
            href={`/category/${cat.id}/products`}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
            {cat.image_path && (
                <img
                    src={cat.image_path}
                    alt={cat.name}
                    className="w-full h-64 object-cover"
                />
            )}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{cat.name}</h3>
            </div>
        </Link>
    ))
) : (
    <p className="text-center text-gray-600">No categories available</p>
)}
</div>