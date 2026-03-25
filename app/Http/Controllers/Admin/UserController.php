<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use App\Models\Schedule;
use App\Models\ScreeningResult;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    private const PACKAGE_OPTIONS = [
        ['value' => 'hipnoterapi', 'label' => 'Hipnoterapi'],
        ['value' => 'vip',         'label' => 'VIP'],
        ['value' => 'upgrade',     'label' => 'Upgrade'],
    ];

    private const GENDER_OPTIONS = [
        ['value' => 'male',   'label' => 'Laki-laki'],
        ['value' => 'female', 'label' => 'Perempuan'],
        ['value' => 'other',  'label' => 'Lainnya'],
    ];

    private const SEVERITY_OPTIONS = [
        'Ringan', 'Sedang', 'Berat Akut', 'Berat Kronis', 'High Risk',
    ];

    public function index(Request $request)
    {
        $query = User::with('roles');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        // Also fetch roles for the roles management tab
        $roles = \Spatie\Permission\Models\Role::with('permissions')->get();
        $permissions = \Spatie\Permission\Models\Permission::all();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'permissions' => $permissions,
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
            'screeningResults' => $user->screeningResults()->orderBy('completed_at', 'desc')->get(),
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

    public function createOffline()
    {
        $now = Carbon::now('Asia/Jakarta');

        $schedules = Schedule::where('schedule_type', 'consultation')
            ->where('date', '>=', $now->toDateString())
            ->whereNotNull('therapist_id')
            ->where('status', 'available')
            ->withCount(['bookings as confirmed_count' => fn($q) => $q->whereIn('status', Booking::SLOT_OCCUPYING_STATUSES)])
            ->with('therapist:id,name')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get()
            ->filter(fn($s) => $s->confirmed_count < $s->quota)
            ->values();

        $bookingPackages = Package::where('is_active', true)
            ->get()
            ->map(fn($p) => [
                'slug'  => $p->slug,
                'name'  => $p->name,
                'price' => $p->current_price,
            ]);

        return Inertia::render('Admin/Users/CreateOffline', [
            'roles'           => Role::all(),
            'severityOptions' => self::SEVERITY_OPTIONS,
            'packageOptions'  => self::PACKAGE_OPTIONS,
            'genderOptions'   => self::GENDER_OPTIONS,
            'schedules'       => $schedules,
            'bookingPackages' => $bookingPackages,
        ]);
    }

    public function storeOffline(Request $request)
    {
        $genderValues        = array_column(self::GENDER_OPTIONS, 'value');
        $packageValues       = array_column(self::PACKAGE_OPTIONS, 'value');
        $severityValues      = self::SEVERITY_OPTIONS;
        $bookingPackageSlugs = Package::where('is_active', true)->pluck('slug')->toArray();

        $request->validate([
            'disclaimer_confirmed'        => 'required|accepted',
            // Identitas
            'name'                        => 'required|string|max:255',
            'email'                       => 'required|string|email|max:255|unique:users',
            'password'                    => 'required|string|min:8|confirmed',
            'phone'                       => 'nullable|string|max:20',
            'age'                         => 'nullable|integer|min:1|max:120',
            'gender'                      => ['nullable', Rule::in($genderValues)],
            'ktp_photo'                   => 'nullable|image|max:5120',
            // Kontak darurat
            'emergency_contact_name'      => 'nullable|string|max:255',
            'emergency_contact_phone'     => 'nullable|string|max:20',
            'emergency_contact_relation'  => 'nullable|string|max:255',
            // Role
            'roles'                       => 'array',
            // Skrining
            'screening_type'              => 'required|in:online,manual',
            'severity_label'              => ['nullable', 'required_if:screening_type,manual', Rule::in($severityValues)],
            'recommended_package'         => ['nullable', 'required_if:screening_type,manual', Rule::in($packageValues)],
            'admin_notes'                 => 'nullable|string',
            'is_high_risk'                => 'nullable|boolean',
            // Perjanjian
            'agreement_signed_offline'    => 'nullable|boolean',
            // Booking
            'schedule_id'                 => 'nullable|exists:schedules,id',
            'package_type'                => ['nullable', 'required_with:schedule_id', Rule::in($bookingPackageSlugs)],
            'booking_notes'               => 'nullable|string|max:1000',
            // Pembayaran
            'payment_status'              => ['nullable', 'required_with:schedule_id', Rule::in(['pending', 'paid'])],
            'payment_proof'               => 'nullable|image|max:5120',
            'payment_method'              => 'nullable|string|max:50',
            'payment_bank'                => 'nullable|string|max:50',
            'payment_account_number'      => 'nullable|string|max:50',
            'payment_account_name'        => 'nullable|string|max:100',
        ], [
            'disclaimer_confirmed.accepted'   => 'Anda harus menyetujui disclaimer sebelum mendaftarkan pasien.',
            'severity_label.required_if'      => 'Tingkat keparahan wajib diisi untuk skrining manual.',
            'severity_label.in'               => 'Tingkat keparahan tidak valid.',
            'recommended_package.required_if' => 'Rekomendasi paket wajib dipilih untuk skrining manual.',
            'recommended_package.in'          => 'Rekomendasi paket tidak valid.',
            'gender.in'                       => 'Jenis kelamin tidak valid.',
            'package_type.required_with'      => 'Tipe paket wajib dipilih jika jadwal dipilih.',
            'package_type.in'                 => 'Tipe paket tidak valid.',
            'payment_status.required_with'    => 'Status pembayaran wajib dipilih jika jadwal dipilih.',
        ]);

        return DB::transaction(function () use ($request) {
            // ── 1. BUAT USER ──────────────────────────────────────────────
            $userData = [
                'name'                       => $request->name,
                'email'                      => $request->email,
                'password'                   => bcrypt($request->password),
                'phone'                      => $request->phone,
                'age'                        => $request->age,
                'gender'                     => $request->gender,
                'emergency_contact_name'     => $request->emergency_contact_name,
                'emergency_contact_phone'    => $request->emergency_contact_phone,
                'emergency_contact_relation' => $request->emergency_contact_relation,
            ];

            if ($request->hasFile('ktp_photo')) {
                $userData['ktp_photo'] = $request->file('ktp_photo')->store('ktp', 'public');
            }

            if ($request->boolean('agreement_signed_offline')) {
                $userData['agreement_signed']    = true;
                $userData['agreement_signed_at'] = now();
                $userData['agreement_data']      = [
                    'signed_offline'       => true,
                    'signed_by_admin_id'   => auth()->id(),
                    'signed_by_admin_name' => auth()->user()->name,
                    'signed_at'            => now()->toDateTimeString(),
                ];
            }

            $user = User::create($userData);
            $user->markEmailAsVerified();

            if ($request->filled('roles')) {
                $user->syncRoles($request->roles);
            }

            // ── 2. SKRINING ───────────────────────────────────────────────
            if ($request->screening_type === 'manual') {
                ScreeningResult::create([
                    'user_id'             => $user->id,
                    'severity_label'      => $request->severity_label,
                    'recommended_package' => $request->recommended_package,
                    'admin_notes'         => $request->admin_notes,
                    'is_high_risk'        => $request->boolean('is_high_risk'),
                    'completed_at'        => now(),
                ]);

                $user->update([
                    'recommended_package'    => $request->recommended_package,
                    'screening_completed_at' => now(),
                ]);
            }

            // ── 3. BOOKING + PEMBAYARAN (opsional) ────────────────────────
            if ($request->filled('schedule_id')) {
                $schedule = Schedule::lockForUpdate()->findOrFail($request->schedule_id);

                if ($schedule->status !== 'available' || $schedule->booked_count >= $schedule->quota) {
                    throw new \Exception('Slot jadwal yang dipilih sudah penuh atau tidak tersedia.');
                }

                $package   = Package::where('slug', $request->package_type)->first();
                $basePrice = $package ? $package->current_price : 0;
                $amount    = round(($basePrice * 1.11) + rand(101, 999));

                $isPaid         = $request->payment_status === 'paid';
                $bookingStatus  = $isPaid ? 'confirmed' : 'pending_payment';

                $booking = Booking::create([
                    'booking_code' => $this->generateOfflineBookingCode(),
                    'patient_id'   => $user->id,
                    'schedule_id'  => $schedule->id,
                    'therapist_id' => $schedule->therapist_id,
                    'package_type' => $request->package_type,
                    'status'       => $bookingStatus,
                    'notes'        => $request->booking_notes,
                ]);

                $paymentProofPath = null;
                if ($request->hasFile('payment_proof')) {
                    $paymentProofPath = $request->file('payment_proof')->store('payments', 'public');
                }

                $transactionData = [
                    'user_id'                => $user->id,
                    'invoice_number'         => 'INV-' . strtoupper(Str::random(10)),
                    'amount'                 => $amount,
                    'status'                 => 'pending',
                    'ip_address'             => $request->ip(),
                    'payment_agreement_data' => [
                        'registered_offline_by_admin_id'   => auth()->id(),
                        'registered_offline_by_admin_name' => auth()->user()->name,
                        'registered_at'                    => now()->toDateTimeString(),
                    ],
                ];

                if ($isPaid) {
                    $transactionData['status']                   = 'paid';
                    $transactionData['payment_method']           = $request->payment_method;
                    $transactionData['payment_bank']             = $request->payment_bank;
                    $transactionData['payment_proof']            = $paymentProofPath;
                    $transactionData['payment_proof_uploaded_at'] = now();
                    $transactionData['validated_by']             = auth()->id();
                    $transactionData['validated_at']             = now();
                    $transactionData['payment_agreement_data']   = array_merge(
                        $transactionData['payment_agreement_data'],
                        [
                            'payment_account_number' => $request->payment_account_number,
                            'payment_account_name'   => $request->payment_account_name,
                            'validated_offline'      => true,
                        ]
                    );

                    $schedule->increment('booked_count');
                    if ($schedule->booked_count >= $schedule->quota) {
                        $schedule->update(['status' => 'full']);
                    }
                }

                $booking->transaction()->create($transactionData);
            }

            return redirect()->route('admin.users.show', $user->id)
                ->with('success', 'Pasien offline berhasil didaftarkan.');
        });
    }

    private function generateOfflineBookingCode(): string
    {
        $year = now()->year;
        do {
            $count = Booking::whereYear('created_at', $year)->count() + 1;
            $code  = sprintf('BK-%d-%04d', $year, $count + rand(0, 9));
        } while (Booking::where('booking_code', $code)->exists());

        return $code;
    }
}
