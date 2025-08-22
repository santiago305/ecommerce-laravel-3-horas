<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'order_id','product_id','quantity','unit_price','tax_rate','total_line'
    ];

    protected $casts = [ 
        'unit_price' => 'decimal:2',
        'tax_rate'   => 'decimal:2',
        'total_line' => 'decimal:2',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    // Relaciones
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
