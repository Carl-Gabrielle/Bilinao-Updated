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
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
