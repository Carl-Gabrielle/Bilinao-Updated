<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShippingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'weightMin' => 'required|numeric|min:0',
        'weightMax' => 'required|numeric|min:0',
        'luzon' => 'required|numeric|min:0',
        'manila' => 'required|numeric|min:0',
        'visayas' => 'required|numeric|min:0',
        'mindanao' => 'required|numeric|min:0',
        'island' => 'required|numeric|min:0',
    ];
}

}
