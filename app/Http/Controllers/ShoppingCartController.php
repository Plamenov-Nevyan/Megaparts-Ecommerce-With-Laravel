<?php

namespace App\Http\Controllers;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    public function addToCart(Request $request){
        $cartData = $request->json()->all();
        ShoppingCart::create([
            'userId' => $cartData['userId'],
            'productId' => $cartData['productId'],
            'quantity' => $cartData['quantity']
        ]);
    }
}
