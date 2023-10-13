<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ProductController extends Controller {
    public function createNewProduct(Request $request) {
        try {
            $productData = $request->all();
            $validator = Validator::make($productData, [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required|numeric|min:0.01',
                'quantityAvailable' => 'required|integer|min:1',
                'image' => 'required',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
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
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Невалидни данни за създаване на нов продукт.'], Response::HTTP_INTERNAL_BAD_REQUEST);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при създаване на нов продукт.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getProducts() {
        try {
            $products = Product::orderBy('created_at', 'desc')
                ->with('owner')
                ->get();
            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при търсенето на продукти.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getOneProduct(Request $request) {
        try {
            $productId = intval($request->input('productId'));
            if (!$productId) {
                return response()->json(['error' => 'Невалидни данни при извличането на детайли.'], Response::HTTP_BAD_REQUEST);
            }
            $product = Product::with('owner')->find($productId);
            if ($product) {
                return response()->json($product);
            } else {
                return response()->json(['error' => 'Продуктът не беше намерен.'], Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при извличането на детайли.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function showDetails(){
        return view('details');
    }

    public function updateProduct(Request $request) {
        try {
            $productId = $request->query('productId');
            if (!$productId) {
                return response()->json(['error' => 'Невалидни данни при редактиране на продукта.'], Response::HTTP_BAD_REQUEST);
            }
            $updateData = $request->json()->all();
            $validator = Validator::make($updateData, [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required|numeric|min:0.01',
                'quantityAvailable' => 'required|integer|min:1',
                'image' => 'required',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $product = Product::with('owner')->find(intval($productId));
            if ($product) {
                $product->update($updateData);
                $product->refresh();
                return response()->json($product);
            } else {
                return response()->json(['error' => 'Продуктът не беше намерен успешно за редактиране.'], Response::HTTP_NOT_FOUND);
            }
        }catch (ValidationException $e) {
            return response()->json(['error' => 'Невалидни данни за редактиране на продукта.'], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при редактиране на продукта.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteProduct(Request $request) {
        try {
            $productId = $request->query('productId');
            if (!$productId) {
                return response()->json(['error' => 'Невалидни данни при изтриване на продукта.'], Response::HTTP_BAD_REQUEST);
            }
            $product = Product::find(intval($productId));
            if ($product) {
                $product->delete();
            } else {
                return response()->json(['error' => 'Продуктът не беше намерен.'], Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при изтриване на продукта.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}