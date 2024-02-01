<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shipping_address',
        'shipping_phone',
        'status_id',
        'created_at',
        'finished_at',
    ];
}
