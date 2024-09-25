<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'weight_min'=>$this->weight_min,
            'weight_max'=>$this->weight_max,
            'luzon'=>$this->luzon,
            'visayas'=>$this->visayas,
            'mindanao'=>$this->mindanao,
            'island'=>$this->island,
        ];
    }
}
