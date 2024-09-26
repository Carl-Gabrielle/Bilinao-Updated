<?php

    namespace App\Http\Controllers;
    use Inertia\Inertia;

    use App\Models\Shipping;
    use Illuminate\Http\Request;
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
        return inertia('Admin/Ship/Shipping', [
            'shipping' => [
                'data' => $shipping
            ]
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
//         public function edit(Shipping $shipping)
// {
    
//     return Inertia('Admin/Ship/ShippingUpdate', [
//         'shipping' => $shipping, 
//     ]);
// }
public function edit($id)
{
    $shipping = Shipping::findOrFail($id);
    return inertia('Admin/Ship/ShippingUpdate', [
        'shipping' => $shipping
    ]);
}

        

        /**
         * Update the specified resource in storage.
         */
    public function update(Request $request, $id)
    {
        $request->validate([
            'weight_min' => 'required|numeric',
            'weight_max' => 'required|numeric',
            'luzon' => 'required|numeric',
            'visayas' => 'required|numeric',
            'mindanao' => 'required|numeric',
            'island' => 'required|numeric',
        ]);

        $shipping = Shipping::findOrFail($id);
        $shipping->update($request->all());

        return redirect()->route('shipping.index')->with('success', 'Shipping rates updated successfully!');
    }
        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Shipping $shipping)
        {
            //
        }
    }
