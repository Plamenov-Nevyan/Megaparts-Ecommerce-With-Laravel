<?php

namespace App\Http\Controllers;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ShoppingCartController extends Controller
{
    public function addToCart(Request $request) {
        try {
            $cartData = $request->json()->all();
            $validator = Validator::make($cartData, [
                'userId' => 'required',
                'productId' => 'required',
                'quantity' => 'required',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            ShoppingCart::create([
                'userId' => $cartData['userId'],
                'productId' => $cartData['productId'],
                'quantity' => $cartData['quantity'],
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Невалидни данни при добаввяне на продукта в количката'], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при добаввяне на продукта в количката'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function checkIfInCart(Request $request) {
        try {
            $productId = $request->query('productId');
            $userId = $request->query('userId');
            $validator = Validator::make($request->all(), [
                'productId' => 'required',
                'userId' => 'required',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $cartItems = ShoppingCart::where('productId', $productId)
                ->where('userId', $userId)
                ->get();
    
            if ($cartItems->count() > 0) {
                return response()->json(['isItInCart' => true]);
            } else {
                return response()->json(['isItInCart' => false]);
            }
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Невалидни данни при проверяване за продукти в количката..'], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при проверяване за продукти в количката'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function removeFromCart(Request $request) {
        try {
            $data = $request->json()->all();
            $productId = intval($data['productId']);
            $userId = intval($data['userId']);
            $quantity = intval($data['quantity']);
            $validator = Validator::make($data, [
                'productId' => 'required',
                'userId' => 'required',
                'quantity' => 'required|integer|min:1',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $cartItem = ShoppingCart::where('productId', $productId)
                ->where('userId', $userId)
                ->firstOrFail();
            if ($quantity >= $cartItem->quantity) {
                $cartItem->delete();
            } else {
                $cartItem->quantity -= $quantity;
                $cartItem->save();
            }
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Невалидни данни при премахване от количката.'], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Вашата количка не беше намерена.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при премахване от количката'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCurrentQuantity(Request $request) {
        try {
            $productId = $request->query('productId');
            $userId = $request->query('userId');
            $validator = Validator::make($data, [
                'productId' => 'required',
                'userId' => 'required',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $cartItem = ShoppingCart::where('productId', intval($productId))
                ->where('userId', intval($userId))
                ->firstOrFail(); 
            return response()->json(['quantity' => $cartItem->quantity]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Вашата количка не беше намерена.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при отчитане текущо количество в количката.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCart(Request $request) {
        try {
            $userId = $request->query('userId');
            if (!$userId) {
                return response()->json(['error' => 'Невалидни данни при търсенето на вашата количка'], Response::HTTP_BAD_REQUEST);
            }
            $cart = ShoppingCart::with('product')
                ->where('userId', intval($userId))
                ->get();
            return response()->json($cart);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Продукти в количката не бяха намерени успешно.'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при търсенето на продукти във вашата количка.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCartCount(Request $request) {
        try {
            $userId = $request->query('userId');
            if (!$userId) {
                return response()->json(['error' => 'Невалидни данни при отчитане брой продукти в количката'], Response::HTTP_BAD_REQUEST);
            }
            $cart = ShoppingCart::where('userId', intval($userId))->get();
            $cartCount = $cart->count();
            return response()->json(['count' => $cartCount]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Грешка при отчитане брой продукти в количката'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
