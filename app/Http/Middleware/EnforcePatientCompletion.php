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

        // Skip if not a patient or accessing profile edit pages
        if ($request->routeIs('profile.*')) {
            return $next($request);
        }

        if ($user && $user->hasRole('patient')) {
            if (!$user->isProfileComplete()) {
                $stats = $user->getProfileCompletionStats();
                $missingLabels = [];
                foreach ($stats['fields'] as $field) {
                    if (!$field['filled']) {
                        $missingLabels[] = $field['label'];
                    }
                }

                $message = 'Mohon lengkapi profil Anda (' . implode(', ', $missingLabels) . ') sebelum melakukan pemesanan.';

                return redirect()->route('dashboard')->with('error', $message);
            }
        }

        return $next($request);
    }
}
