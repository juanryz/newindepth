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
        $user->load(['roles', 'permissions', 'screeningResults']);

        // Load activity based on role
        $bookings = [];
        $schedules = [];
        $transactions = [];

        if ($user->hasRole('patient')) {
            $bookings = \App\Models\Booking::with(['schedule.therapist', 'transaction', 'therapist'])
                ->where('patient_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            // Get transactions directly linked to user
            $directTransactions = \App\Models\Transaction::with(['transactionable', 'validatedBy'])->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            // Also get transactions linked via bookings (polymorphic)
            $bookingIds = $bookings->pluck('id')->toArray();
            $bookingTransactions = \App\Models\Transaction::with(['transactionable', 'validatedBy'])->where('transactionable_type', \App\Models\Booking::class)
                ->whereIn('transactionable_id', $bookingIds)
                ->orderBy('created_at', 'desc')
                ->get();

            // Merge and deduplicate by ID
            $transactions = $directTransactions->merge($bookingTransactions)->unique('id')->sortByDesc('created_at')->values();
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
            $bookings = \App\Models\Booking::with(['patient', 'schedule', 'therapist'])
                ->where('therapist_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        // Get course enrollments (transactions for courses)
        $courseTransactions = \App\Models\Transaction::where('user_id', $user->id)
            ->where('transactionable_type', 'App\\Models\\Course')
            ->with('transactionable')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Users/Show', [
            'userModel' => $user,
            'bookings' => $bookings,
            'transactions' => $transactions,
            'schedules' => $schedules,
            'screeningResults' => $user->screeningResults,
            'profileCompletion' => $user->getProfileCompletionStats(),
            'courseTransactions' => $courseTransactions,
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
            'emergency_contact_name' => $request->emergency_contact_name,
            'emergency_contact_phone' => $request->emergency_contact_phone,
            'emergency_contact_relation' => $request->emergency_contact_relation,
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
            'emergency_contact_name' => $request->emergency_contact_name,
            'emergency_contact_phone' => $request->emergency_contact_phone,
            'emergency_contact_relation' => $request->emergency_contact_relation,
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

        try {
            // Cleanup related data to avoid integrity constraint violations
            $user->bookings()->delete();
            $user->transactions()->delete();
            $user->screeningResults()->delete();

            // If they are a therapist, handle their managed sessions
            if ($user->hasRole('therapist')) {
                \App\Models\Schedule::where('therapist_id', $user->id)->delete();
                \App\Models\Booking::where('therapist_id', $user->id)->update(['therapist_id' => null]);
            }

            $user->delete();

            return redirect()->route('admin.users.index')->with('success', 'User dan data terkait berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus user karena masih memiliki data aktif: ' . $e->getMessage());
        }
    }

    public function agreement(User $user)
    {
        return Inertia::render('Admin/Users/Agreement', [
            'userModel' => $user
        ]);
    }
}
