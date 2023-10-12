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

    public function checkIfInCart(Request $request){
        $productId = $request->query('productId');
        $userId = $request->query('userId');
        $cartItems = ShoppingCart::where('productId', $productId)
        ->where('userId', $userId)
        ->get();
        if ($cartItems->count() > 0) {
            return response()->json(['isItInCart' => true]);
        } else {
            return response()->json(['isItInCart' => false]);
        }
    }

    public function removeFromCart(Request $request){
        $data = $request->json()->all();
        $cartItems = ShoppingCart::where('productId', intval($data["productId"]))
        ->where('userId', intval($data['userId']))
        ->get()
        ->first();
        if (intval($data['quantity'])>= $cartItems->quantity) {
            // If the quantity to remove is greater than or equal to the cart item's quantity,
            // then delete the record entirely.
            $cartItems->delete();
        } else {
            // If the quantity to remove is less than the cart item's quantity,
            // subtract it and then update the record.
            $cartItems->quantity -= intval($data['quantity']);
            $cartItems->save();
        }
    }

    public function getCurrentQuantity(Request $request){
        $productId = $request->query('productId');
        $userId = $request->query('userId');
        $cartItems = ShoppingCart::where('productId', intval($productId))
        ->where('userId', intval($userId))
        ->get()
        ->first();
        return response()->json(['quantity' => $cartItems['quantity']]);
    }
}
