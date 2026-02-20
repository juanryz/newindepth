<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackReferral
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->query('ref')) {
            $refCode = $request->query('ref');
            // Simpan di cookie 30 hari (60 menit * 24 jam * 30 hari)
            cookie()->queue('ref_code', $refCode, 60 * 24 * 30);
        }

        return $next($request);
    }
}
