<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Change this to authorization logic if needed
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'images' => 'nullable|array',
            'images.*.image_path' => 'required|string', 
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'description.required' => 'The product description is required.',
            'price.required' => 'The price is required and must be a valid number.',
            'stock.required' => 'The stock quantity is required and must be a valid number.',
            'images.*.image_path.required' => 'Each product image must have a valid path.',
        ];
    }
}
