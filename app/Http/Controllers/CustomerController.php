<?php

namespace App\Http\Controllers;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function categories (){
        return Inertia::render('Customer/Categories');
    }
    public function profile()
    {
    return Inertia::render('Customer/ProfileEdit');
    }

    public function index()
{
    $query = Category::query();
    $category = $query->paginate(7);
    return Inertia::render('CustomerDashboard', [
        'category' => CategoryResource::collection($category)
    ]);
}

    
    
    
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
