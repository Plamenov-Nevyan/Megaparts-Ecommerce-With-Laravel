<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    use HasFactory;
    protected $table = 'shopping_cart';
    
    protected $fillable = [
      'userId',
      'productId',
      'quantity'
    ];

    public function product() {
      return $this->belongsTo(Product::class, 'productId', 'id');
  }
}
