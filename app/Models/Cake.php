<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cake extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'description',
        'type_id',
        'price',
        'amount',
        'cook_time',
    ];
}
