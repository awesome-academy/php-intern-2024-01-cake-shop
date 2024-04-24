<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetRevenueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'month' => 'numeric|min:1|max:12',
            'year' => 'numeric',
            'startYear' => 'numeric',
            'endYear' => 'numeric',
            'startMonth' => 'numeric|min:1|max:12',
            'endMonth' => 'numeric|min:1|max:12',
        ];
    }
}
