<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforcePatientCompletion
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->hasRole('patient')) {
            if (!$user->isProfileComplete()) {
                return redirect()->route('dashboard')->with('error', 'Silakan lengkapi profil dan selesaikan skrining terlebih dahulu untuk dapat memesan layanan.');
            }
        }

        return $next($request);
    }
}
