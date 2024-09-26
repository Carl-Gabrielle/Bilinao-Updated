<?php

    namespace App\Http\Controllers;
    use Inertia\Inertia;

    use App\Models\Shipping;
use App\Http\Resources\ShippingResource;
    use App\Http\Requests\StoreShippingRequest;
    use App\Http\Requests\UpdateShippingRequest;

    class ShippingController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function index()
        {
            $shipping = Shipping::all();
            return Inertia('Admin/Ship/Shipping',[
            'shipping' => ShippingResource::collection($shipping),
            ]);
        }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {
            //
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(StoreShippingRequest $request)
        {
            //
        }

        /**
         * Display the specified resource.
         */
        public function show(Shipping $shipping)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         */
        public function edit(Shipping $shipping)
{
    
    return Inertia('Admin/Ship/ShippingUpdate', [
        'shipping' => $shipping, // Directly pass $shipping to see if data is valid
    ]);
}

        

        /**
         * Update the specified resource in storage.
         */
        public function update(UpdateShippingRequest $request, Shipping $shipping)
{
    
    $data = $request->validated();

    $shipping->update([
        'weight_min' => $data('weightMin'),
        'weight_max' => $data('weightMax'),
        'luzon' => $data('luzon'),
        'manila' => $data('manila'),
        'visayas' => $data('visayas'),
        'mindanao' => $data('mindanao'),
        'island' => $data('island'),
    ]);

    return redirect()->route('shipping.index')->with('success', 'Shipping rates updated successfully');
}
        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Shipping $shipping)
        {
            //
        }
    }
