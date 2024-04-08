<?php

namespace App\Http\Requests;

use App\Rules\CheckCakeTypeRule;
use Illuminate\Foundation\Http\FormRequest;

class GetListCakeRequest extends FormRequest
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
            'page' => 'numeric|min:1',
            'cakeType' => ['json', new CheckCakeTypeRule()],
            'min' => 'numeric|min:0',
            'max' => 'numeric|min:0',
        ];
    }
}
