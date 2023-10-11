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
        $user = Auth::user();

        $product = Product::create([
            'name' => $productData["name"],
            'description' => $productData["description"],
            'price' => $productData["price"],
            'quantityAvailable' => $productData["quantityAvailable"],
            'image' => $productData["image"],
            'owner' => $user->id,
        ]);
        $response = json_encode(["productId" => $product->id]);
        return $response;
    }

    public function getProducts(){
        $products = Product::orderBy('created_at', 'desc')
        ->with('owner')
        ->get();
        return response()->json($products);
    }

    public function getOneProduct(Request $request){
        $productId = intval($request->input('productId'));
        $product = Product::with('owner')->find($productId);
        return response()->json($product);
    }

    public function showDetails(){
        return view('details');
    }

    public function updateProduct(Request $request){
        $productId = $request->query('productId');
        $updateData = $request->json()->all();
        $product = Product::with('owner')->find(intval($productId));
        $product->update($updateData);
        $product->refresh();
        return response()->json($product);
    }

    public function deleteProduct(Request $request){
        $productId = $request->query('productId');
        $product = Product::find(intval($productId));
        $product->delete();
    }
}