<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? array_merge($request->user()->toArray(), [
                    'roles' => $request->user()->getRoleNames()->values()->toArray(),
                    'permissions' => (function () use ($request) {
                        $user = $request->user();
                        $perms = $user->getAllPermissions()->pluck('name')->values()->toArray();

                        // Add dynamic permissions for display logic in frontend
                        if ($user->hasRole('santa_maria')) {
                            $santaMariaPerms = [
                                'view finance',
                                'view reports',
                                'view petty_cash',
                                'approve petty_cash',
                                'reject petty_cash',
                                'manage petty cash',
                                'export reports'
                            ];
                            $perms = array_values(array_unique(array_merge($perms, $santaMariaPerms)));
                        }

                        return $perms;
                    })(),
                ]) : null,
                'notifications' => $request->user() ? $request->user()->notifications()->take(5)->get() : [],
                'unread_notifications_count' => $request->user() ? $request->user()->unreadNotifications()->count() : 0,
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'message' => fn() => $request->session()->get('message'),
            ],
            'clinicInfo' => [
                'name'         => config('clinic.name'),
                'tagline'      => config('clinic.tagline'),
                'address'      => config('clinic.address'),
                'phone'        => config('clinic.phone'),
                'email'        => config('clinic.email'),
                'website'      => config('clinic.website'),
                'bankAccounts' => config('clinic.bank_accounts', []),
            ],
        ];
    }
}
