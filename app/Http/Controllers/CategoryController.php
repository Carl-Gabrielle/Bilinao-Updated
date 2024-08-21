<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Category::query();
        $category = $query->paginate(10);
        return Inertia('Admin/Category/CategoryIndex',[
            'category' => CategoryResource::collection($category),
            'success'=>session('success'),
        ]);      
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Admin/Category/CategoryCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        $image =$data['image'] ?? null;
        // dd($data);
        /** @var $image \Illuminate\Http\UploadedFile */
        if($image){
            $data['image_path']= $image->store('categoryimg/'.Str::random(),'public');
        }
        $category=Category::create($data);
        return to_route('category.index')
        ->with('success','Category Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
    
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia('Admin/Category/CategoryEdit',[
            'category' => new CategoryResource($category),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        $image =$data['image'] ?? null;
        // dd($data);
        if($image){
            if($category->image_path){
                Storage::disk('public')->deleteDirectory(dirname($category->image_path));
            }
            $data['image_path']= $image->store('categoryimg/'.Str::random(),'public');
        }
        $category->update($data);
        return to_route('category.index')
        ->with('success',"Project  \"$category->name\" Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
    $name =$category->name;
    $category->delete();
    if($category->image_path){
        Storage::disk('public')->deleteDirectory
        (dirname($category->image_path));
    }
    return to_route('category.index')
    ->with('success', "Category \"$name\" Was Deleted");
    }
}
