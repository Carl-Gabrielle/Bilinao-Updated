<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'reason' => 'required|string|max:255',
            'details' => 'nullable|string|max:300',
        ]);
        $product = Product::findOrFail($validated['product_id']);
        Report::create([
            'product_id' => $validated['product_id'],
            'seller_id' => $product->seller_id,
            'reason' => $validated['reason'],
            'details' => $validated['details'],
        ]);
        return back()->with('success', 'Report submitted successfully.');
    }
    public function index()
    {
        $reports = Report::with(['product.seller'])->get();
        return Inertia::render('Customer/Reports', [
            'reports' => $reports,
        ]);
    }
}
