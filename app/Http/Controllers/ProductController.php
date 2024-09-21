<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductImage;
use App\Models\Category;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function search()
    {
        $query = request('query');
        
        if (!$query) {
            return redirect()->route('products.list')->withErrors('No search query provided');
        }
    
        $products = Product::where('name', 'like', '%' . $query . '%')
            ->with(['images']) 
            ->get(['id', 'name', 'price']); 
    
        return Inertia::render('Customer/SearchResults', [
            'products' => $products,
            'query' => $query,
        ]);
    }
    
    

    public function products()
{
    $products = Product::with('images')->get();
    return Inertia::render('Customer/Products', [
        'success' => session('success'),
        'products' => $products,
    ]);
}

    public function productsByCategory(Category $category)
{
    $sortOption = request('sort');  

    $query = Product::where('category_id', $category->id)
        ->with(['images', 'category', 'seller']);
        
    if ($sortOption === 'price-asc') {
        $query->orderBy('price', 'asc'); 
    } elseif ($sortOption === 'price-desc') {
        $query->orderBy('price', 'desc'); 
    }

    $products = $query->paginate(8);

    return Inertia::render('Customer/CategoryProducts', [
        'products' => $products,
        'success' => session('success'),
        'category' => $category->name,
        'sort' => $sortOption,  
    ]);
}

    public function index()
    {
        $user = Auth::user();
        
        $products = Product::where('seller_id', $user->id)
            ->with(['images', 'category'])
            ->paginate(5);
        return Inertia::render('Seller/ShowProduct', [
            'products' => $products,
            'success' => session('success'),
            'auth' => [
                'user' => $user
            ]
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Seller/AddProduct', [
            'categories' => $categories,
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['seller_id'] = Auth::id();
        $product = Product::create($data);
        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store(`product_images/` . $product->id, 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                ]);
            }
        }
        return redirect()->route('products.index')
            ->with('success', 'Product added successfully!');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['images', 'category', 'seller']);
    
        $relatedProducts = Product::where('category_id', $product->category_id)
                            ->where('id', '!=', $product->id)
                            ->with('images')
                            ->take(4)
                            ->get();
                            
        return Inertia::render('Customer/ProductDetails', [
            'product' => $product,
            'success' => session('success'),
            'relatedProducts' => $relatedProducts,
        ]);
    }
    
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->load('images');
        return Inertia::render('Seller/ProductEdit', [
            'product' => $product,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validatedData = $request->validated();
        $product->update($validatedData);
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }
    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
{
    $product->delete();
    return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
}

}
