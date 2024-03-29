<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    protected $cast = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp',
    ];
}
