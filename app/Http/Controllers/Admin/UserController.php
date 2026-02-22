<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        $users = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Users/Form', [
            'userModel' => new User(),
            'roles' => $roles,
            'userRoles' => [],
        ]);
    }

    public function show(User $user)
    {
        $user->load(['roles', 'permissions']);

        // Load activity based on role
        $bookings = [];
        $schedules = [];
        $transactions = [];

        if ($user->hasRole('patient')) {
            $bookings = \App\Models\Booking::with(['schedule.therapist', 'transaction'])
                ->where('patient_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            $transactions = \App\Models\Transaction::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        if ($user->hasRole('therapist')) {
            $schedules = \App\Models\Schedule::withCount('bookings')
                ->whereHas('bookings', function ($q) use ($user) {
                $q->where('therapist_id', $user->id);
            })
                ->orWhere('therapist_id', $user->id) // If legacy link exists
                ->orderBy('date', 'desc')
                ->get();

            // Bookings where they are the therapist
            $bookings = \App\Models\Booking::with(['patient', 'schedule'])
                ->where('therapist_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return Inertia::render('Admin/Users/Show', [
            'userModel' => $user,
            'bookings' => $bookings,
            'transactions' => $transactions,
            'schedules' => $schedules,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'array',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
        ]);

        // Auto-verify email for admin-created users
        $user->markEmailAsVerified();

        if ($request->filled('roles')) {
            $user->syncRoles($request->roles);
        }

        return redirect()->route('admin.users.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        $roles = Role::all();
        $userRoles = $user->roles->pluck('name');

        return Inertia::render('Admin/Users/Form', [
            'userModel' => $user,
            'roles' => $roles,
            'userRoles' => $userRoles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'roles' => 'array',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        return redirect()->route('admin.users.index')->with('success', 'Data user berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User berhasil dihapus.');
    }
}
