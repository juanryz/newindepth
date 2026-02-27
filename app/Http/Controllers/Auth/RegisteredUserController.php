<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $package = $request->query('package', null);
        $validPackages = ['hipnoterapi', 'vip', 'upgrade'];
        $recommendedPackage = in_array($package, $validPackages) ? $package : null;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'recommended_package' => $recommendedPackage, // Optional pre-fill from URL param if available
        ]);

        // Ensure 'patient' role exists before assignment
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'patient', 'guard_name' => 'web']);
        $user->assignRole('patient');

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('verification.notice');
    }
}
