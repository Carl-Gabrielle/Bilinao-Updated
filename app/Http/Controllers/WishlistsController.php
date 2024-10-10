<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\Wishlists;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
class WishlistsController extends Controller
{
    public function myWishlists(){
        $wishlists = Wishlists::with('product.images')->where('user_id', Auth::id())->get();
        return Inertia::render('Customer/Wishlists', [
            'wishlists' => $wishlists,
        ]);
    }
    public function storeWishlists(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
        $user = auth()->user();
        $product_id = $validatedData['product_id'];
        $product = Product::find($product_id);
        $existingCart = Wishlists::where('user_id', $user->id)
                            ->where('product_id', $product_id)
                            ->first();
            Wishlists::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
            ]);
        return redirect()->back()->with('success', "  {$product->name} has been added to your  favorites!");
    }
    public function destroy($id)
    {
        $wishItem = Wishlists::where('id', $id)->where('user_id', Auth::id())->first();

        if ($wishItem) {
            $wishItem->delete();
        }

        $wishlists =Wishlists::with('product.images')->where('user_id', Auth::id())->get();

        return Inertia::render('Customer/Wishlists', [
            'wishlists' => $wishlists,
            'success' => 'Item removed from cart.',
        ]);
    }
}
