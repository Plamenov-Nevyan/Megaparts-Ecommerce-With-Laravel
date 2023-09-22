<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProductController extends Controller {
    public function createNewProduct(Request $request){
        $productData = $request->all();
        $product = Product::create([
            'name' => $productData["name"],
            'description' => $productData["description"],
            'price' => $productData["price"],
            'quantityAvailable' => $productData["quantityAvailable"],
            'image' => $productData["image"],
        ]);
        $response = json_encode(["productId" => $product->id]);
        return $response;
    }

    public function getProducts(){
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json($products);
    }
}