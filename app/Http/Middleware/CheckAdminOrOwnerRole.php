<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckAdminOrOwnerRole
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $userRole = Auth::user()->userRole;
            if ($userRole === 'admin' || $userRole === 'owner') {
                return $next($request);
            }
        }
        $response = [
            'error' => 'Нямате необходимите права за тези действия.',
        ];
        return response()->json($response, Response::HTTP_FORBIDDEN);
    }
}
