<?php

    namespace App\Http\Controllers;
    use App\Models\User;
    use App\Http\Resources\CategoryResource;
    use App\Models\Product;
    use App\Http\Requests\ProfileUpdateRequest;
    use Inertia\Response;
    use App\Models\OrderItem;
    use App\Models\Review;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Storage;
    use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Support\Facades\Redirect;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Inertia\Inertia;
    use App\Models\Category;
    use App\Models\Notifications;
    use Illuminate\Support\Str;
    use Orhanerday\OpenAi\OpenAi;

    use App\Models\Report;
    // use Google\Cloud\Language\LanguageClient;
    class CustomerController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function notifications()
        {
            $notifications = Notifications::where('user_id', Auth::user()->id)
                ->orderBy('updated_at', 'desc')
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
                
                $notifications = Notifications::where('user_id', Auth::user()->id)
                    ->orderBy('updated_at', 'desc') 
                    ->get();
                
                return Inertia::render('Customer/Notifications', [
                    'notifications' => $notifications,
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
            $category = Category::where('is_active', 1)->paginate(7);
            
            $products = Product::with('images')
                ->whereHas('category', function ($query) {
                    $query->where('is_active', 1);
                })
                ->whereHas('seller', function ($query) {
                    $query->where('is_active', 1); 
                })
                ->orderBy('created_at', 'desc')
                ->paginate(6);
        
            return Inertia::render('CustomerDashboard', [
                'category' => CategoryResource::collection($category),
                'products' => $products,
            ]);
        }
            public function  about (){
                return Inertia::render('Customer/About');
            }
            public function faqs (){
                return Inertia::render('Customer/Faqs');
            }
            public function privacyPolicy(){
                return Inertia::render('Customer/PrivacyPolicy');
            }
            public function terms(){
                return Inertia::render('Customer/Terms');
            }
            public function categories()
{
    // Fetch only active categories
    $categories = Category::where('is_active', 1)->get();

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
        $user = $request->user(); 
        $data = $request->validated();
        unset($data['email']);

    
        if ($request->hasFile('profile_photo_path')) {
            $imagePath = $request->file('profile_photo_path')->store('profile_photos', 'public');

    
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }

            
            $data['profile_photo_path'] = $imagePath; 
        }

    
        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'profile_photo_path' => $data['profile_photo_path'] ?? $user->profile_photo_path,
        ]);
        

    
        return Inertia::render('Customer/ProfileIndex', [
            'user' => $user,
        ]);
    }

            
    public function review($orderItemId)
    {
        $orderItem = OrderItem::with('product.images')->find($orderItemId);
    
        return Inertia::render('Customer/Review', [
            'orderItem' => $orderItem,
        ]);
    }

    public function storeReview(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'order_id' => 'required|exists:order_items,id',
            'rate' => 'required|integer|min:1|max:5',
            'description' => 'required|string|min:10|max:200',
        ]);
    
        try {
            DB::beginTransaction();
    
            $orderItem = OrderItem::findOrFail($request->order_id);
            $orderItem->update(['is_rated' => true]);
    
            $product = Product::findOrFail($request->product_id);
            $existingReviews = Review::where('product_id', $product->id)->get();
            $existingRatingsCount = $existingReviews->count();
            $existingRatingsSum = $existingReviews->sum('rate');
    
            $newRatingsCount = $existingRatingsCount + 1;
            $newRatingsSum = $existingRatingsSum + $request->rate;
            $newAverageRating = $newRatingsSum / $newRatingsCount;
    
            $sentiment = $this->analyzeSentiment($request->description);
    
            $product->update(['rating' => $newAverageRating]);
    
            Review::create([
                'user_id' => $request->user_id,
                'product_id' => $product->id,
                'order_id' => $orderItem->id,
                'rate' => $request->rate,
                'description' => $request->description,
                'sentiment' => $sentiment,
            ]);
    
            DB::commit();
    
            return redirect()->route('product.show', ['product' => $product->id])->with('success', 'Review submitted successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
    
            return Inertia::render('Customer/Review', [
                'orderItem' => OrderItem::with('product.images')->find($request->order_id),
                'error' => 'An error occurred while submitting the review.',
            ]);
        }
    }
    
    /**
     * Perform a basic sentiment analysis on the review description.
     *
     * @param string $description
     * @return string
     */
    private function analyzeSentiment(string $description)
    {
        $positiveKeywords = ['good', 'great', 'amazing', 'excellent', 'love' , 'outstanding'];
        $negativeKeywords = ['bad', 'poor', 'terrible', 'hate', 'disappointed'];
    
        $descriptionLower = Str::lower($description);
    
        $positiveScore = 0;
        $negativeScore = 0;
    
        foreach ($positiveKeywords as $keyword) {
            if (Str::contains($descriptionLower, $keyword)) {
                $positiveScore++;
            }
        }
    
        foreach ($negativeKeywords as $keyword) {
            if (Str::contains($descriptionLower, $keyword)) {
                $negativeScore++;
            }
        }
    
        if ($positiveScore > $negativeScore) {
            return 'positive';
        } elseif ($negativeScore > $positiveScore) {
            return 'negative';
        } else {
            return 'neutral';
        }
    }
    
        public function edit()
        {
            return Inertia::render('Customer/ProfileEdit');
        }
    
    }
