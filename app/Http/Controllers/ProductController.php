<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use Inertia\Inertia;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
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
            ->get();

        return Inertia::render('Customer/SearchResults', [
            'products' => $products,
            'query' => $query,
        ]);
    }


    public function products()
    {
        $category = Category::where('is_active', 1)->paginate(4);
        
        $products = Product::with(['images', 'seller', 'category'])
            ->whereHas('seller', function ($query) {
                $query->where('is_active', 1);  
            })
            ->paginate(9);
        
        $products->getCollection()->transform(function ($product) {
            $product->is_published = $product->category->is_active ? true : false;
            return $product;
        });
    
        return Inertia::render('Customer/Products', [
            'success' => session('success'),
            'category' => CategoryResource::collection($category),
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
            'success' => session('success'),
            'products' => $products,
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
        $categories = Category::where('is_active', 1)->get();
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
    // public function show(Product $product)
    // {
    //     $product->load(['images', 'category', 'seller']);
    
    //     $reviews = Review::where('product_id', $product->id)
    //         ->with('user')
    //         ->orderBy('created_at', 'desc')
    //         ->get();
    
    
    //     $relatedProducts = Product::where('category_id', $product->category_id)
    //         ->where('id', '!=', $product->id)
    //         ->with('images')
    //         ->take(4)
    //         ->get();
    
    //     return Inertia::render('Customer/ProductDetails', [
    //         'product' => $product,
    //         'reviews' => $reviews,
    //         'relatedProducts' => $relatedProducts,
    //         'success' => session('success'),
    //     ]);
    // }
    public function show(Product $product)
{
    $product->load(['images', 'category', 'seller']);
    
    // Check if the product's category is active
    $isCategoryActive = $product->category->is_active;

    $reviews = Review::where('product_id', $product->id)
        ->with('user')
        ->orderBy('created_at', 'desc')
        ->get();

    $relatedProducts = Product::where('category_id', $product->category_id)
        ->where('id', '!=', $product->id)
        ->with('images')
        ->take(4)
        ->get();

    return Inertia::render('Customer/ProductDetails', [
        'product' => $product,
        'reviews' => $reviews,
        'relatedProducts' => $relatedProducts,
        'success' => session('success'),
        'isCategoryActive' => $isCategoryActive, 
    ]);
}




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        // dd($product);

        $product->load('images');
        $categories = Category::all();
        return Inertia::render('Seller/ProductEdit', [
            'product' => $product,
            'auth' => [
                'user' => Auth::user()
            ],
            'categories' => $categories
        ]);
    }

    /**
     * Update the product data here
     */
    public function update(UpdateProductRequest $request, Product $product)
    {

        $request->validated();
        try {
            // dd($request->all());

            DB::beginTransaction();
            $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock,
                'weight' => $request->weight,
                'category_id' => $request->category_id
            ]);

            $currentImageIds = ProductImage::where('product_id', $product->id)
                ->pluck('id')
                ->toArray();

            $imageIdsToKeep = collect($request->images ?? [])->pluck('id')->toArray();

            if ($currentImageIds !== $imageIdsToKeep) {

                $imagesToDelete = ProductImage::where('product_id', $product->id)
                    ->whereNotIn('id', $imageIdsToKeep)
                    ->get();

                if ($imagesToDelete->isNotEmpty()) {
                    foreach ($imagesToDelete as $image) {
                        Storage::disk('public')->delete($image->image_path);
                        $image->delete();
                    }
                }
            }

            if ($request->has('new_uploaded_images') && count($request->new_uploaded_images) > 0) {
                foreach ($request->file('new_uploaded_images') as $image) {
                    $path = $image->store(`product_images/` . $product->id, 'public');
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                    ]);
                }
            }

            DB::commit();
            return redirect()->route('products.index')->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return redirect()->route('products.index')->with('success', 'ERROR: ' . $e->getMessage());

        }

    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    public function reviews($productId)
    {
        $reviews = Review::with('user') 
            ->where('product_id', $productId)
            ->get();

        $averageRating = $reviews->avg('rate');

        return Inertia::render('ProductRatingReviews', [
            'reviews' => $reviews,
            'averageRating' => $averageRating,
        ]);
    }

}