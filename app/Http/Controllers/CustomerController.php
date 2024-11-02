<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Resources\CategoryResource;
use App\Models\Product;
use App\Http\Requests\ProfileUpdateRequest;
use Inertia\Response;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Notifications;
class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function notifications()
    {
        $notifications = Notifications::where('user_id', Auth::user()->id)
            ->orderBy('updated_at', 'desc') // Order by updated_at descending
            ->get();
    
        return Inertia::render('Customer/Notifications', [
            'notifications' => $notifications, 
        ]);
    }
    
    public function markAsRead($id)
    {
        $notification = Notifications::find($id);
        
        if ($notification) {
            $notification->update(['status' => 'read']);
            
            // Fetch updated notifications ordered by updated_at
            $notifications = Notifications::where('user_id', Auth::user()->id)
                ->orderBy('updated_at', 'desc') // Maintain the same order
                ->get();
            
            return Inertia::render('Customer/Notifications', [
                'notifications' => $notifications, // Send the updated list
            ]);
        }
    
        return response()->json(['success' => false], 404);
    }
    
    


    public function myWishlists(){
        return Inertia::render('Customer/Wishlists');
    }
    public function completeOrders(){
        return Inertia::render('Customer/CompleteOrders');
    }
    
    public function index()
    {
        $query = Category::query();
        $category = $query->paginate(7);
        $products = Product::with('images')->orderBy('created_at', 'desc')->paginate(6);
        return Inertia::render('CustomerDashboard', [
            'category' => CategoryResource::collection($category),
            'products' => $products,
        ]);
    }
        public function  about (){
            return Inertia::render('Customer/About');
        }
        public function categories()
        {
            $categories = Category::all(); 
            return Inertia::render('Customer/Categories', [
                'categories' => CategoryResource::collection($categories),
            ]);
        }
    public function profile()
    {
    return Inertia::render('Customer/ProfileIndex');
    }
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Inertia::render('Customer/ProfileIndex');
    }
    public function review()
    {
    return Inertia::render('Customer/Review');
    }
    public function edit()
    {
        return Inertia::render('Customer/ProfileEdit');
    }
    

   
}
