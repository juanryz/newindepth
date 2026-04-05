<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\GroupBooking;
use App\Models\GroupBookingMember;
use App\Models\Package;
use App\Models\Schedule;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class GroupBookingController extends Controller
{
    private const PACKAGE_OPTIONS = [
        ['value' => 'reguler',     'label' => 'Reguler'],
        ['value' => 'hipnoterapi', 'label' => 'Hipnoterapi'],
        ['value' => 'premium',     'label' => 'Premium'],
        ['value' => 'vip',         'label' => 'VIP'],
    ];

    private const GENDER_OPTIONS = [
        ['value' => 'male',   'label' => 'Laki-laki'],
        ['value' => 'female', 'label' => 'Perempuan'],
        ['value' => 'other',  'label' => 'Lainnya'],
    ];

    private const SEVERITY_OPTIONS = [
        'Ringan', 'Sedang', 'Berat Akut', 'Berat Kronis', 'High Risk',
    ];

    private const SESSION_TYPE_OPTIONS = [
        ['value' => 'online',  'label' => 'Online',  'desc' => 'Sesi melalui video call. Pembayaran hanya via Transfer Bank.'],
        ['value' => 'offline', 'label' => 'Offline', 'desc' => 'Sesi tatap muka di klinik. Pembayaran bisa Transfer Bank atau Cash.'],
    ];

    // ── INDEX ──────────────────────────────────────────────────────────────────

    public function index(Request $request)
    {
        $groups = GroupBooking::with(['createdBy', 'members.booking.transaction', 'user'])
            ->withCount('members')
            ->when($request->filled('search'), fn($q) =>
                $q->where('group_name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('phone', 'like', '%' . $request->search . '%')
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/GroupBookings/Index', [
            'groups'  => $groups,
            'filters' => $request->only(['search']),
        ]);
    }

    // ── CREATE (form buat grup baru) ───────────────────────────────────────────

    public function create()
    {
        return Inertia::render('Admin/GroupBookings/Create');
    }

    // ── STORE (simpan data grup + buat akun login grup) ────────────────────────

    public function store(Request $request)
    {
        $request->validate([
            'group_name' => 'required|string|max:255',
            'email'      => 'required|email|max:255|unique:users,email',
            'phone'      => 'nullable|string|max:20',
            'address'    => 'nullable|string|max:1000',
            'password'   => 'required|string|min:8|confirmed',
            'notes'      => 'nullable|string|max:2000',
        ], [
            'email.unique'    => 'Email ini sudah digunakan. Gunakan email lain untuk akun grup.',
            'password.min'    => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
        ]);

        return DB::transaction(function () use ($request) {
            // Buat akun User untuk login grup
            Role::firstOrCreate(['name' => 'patient', 'guard_name' => 'web']);

            $groupUser = User::create([
                'name'              => $request->group_name,
                'email'             => $request->email,
                'phone'             => $request->phone,
                'password'          => Hash::make($request->password),
                'email_verified_at' => now(),
            ]);
            $groupUser->assignRole('patient');

            $group = GroupBooking::create([
                'invoice_number' => GroupBooking::generateInvoiceNumber(),
                'user_id'        => $groupUser->id,
                'group_name'     => $request->group_name,
                'email'          => $request->email,
                'phone'          => $request->phone,
                'address'        => $request->address,
                'session_type'   => 'offline',
                'notes'          => $request->notes,
                'created_by'     => auth()->id(),
            ]);

            return redirect()->route('admin.group-bookings.show', $group->id)
                ->with('success', 'Grup berhasil dibuat. Tambahkan anggota lalu tentukan jadwal.');
        });
    }

    // ── EDIT (form edit grup) ─────────────────────────────────────────────────

    public function edit(GroupBooking $groupBooking)
    {
        return Inertia::render('Admin/GroupBookings/Create', [
            'group' => $groupBooking,
        ]);
    }

    // ── UPDATE (simpan perubahan grup + update akun login grup) ──────────────

    public function update(Request $request, GroupBooking $groupBooking)
    {
        $request->validate([
            'group_name' => 'required|string|max:255',
            'email'      => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($groupBooking->user_id)],
            'phone'      => 'nullable|string|max:20',
            'address'    => 'nullable|string|max:1000',
            'password'   => 'nullable|string|min:8|confirmed',
            'notes'      => 'nullable|string|max:2000',
        ], [
            'email.unique' => 'Email ini sudah digunakan. Gunakan email lain.',
            'password.min' => 'Password minimal 8 karakter.',
        ]);

        return DB::transaction(function () use ($request, $groupBooking) {
            // Update akun User grup jika ada
            if ($groupBooking->user_id) {
                $userUpdates = [
                    'name'  => $request->group_name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                ];
                if ($request->filled('password')) {
                    $userUpdates['password'] = Hash::make($request->password);
                }
                $groupBooking->user?->update($userUpdates);
            }

            $groupBooking->update([
                'group_name' => $request->group_name,
                'email'      => $request->email,
                'phone'      => $request->phone,
                'address'    => $request->address,
                'notes'      => $request->notes,
            ]);

            return redirect()->route('admin.users.index', ['tab' => 'groups'])
                ->with('success', 'Data grup berhasil diperbarui.');
        });
    }

    // ── DESTROY (hapus grup + akun login grup) ────────────────────────────────

    public function destroy(GroupBooking $groupBooking)
    {
        return DB::transaction(function () use ($groupBooking) {
            $groupUserId = $groupBooking->user_id;

            // Hapus booking anggota
            foreach ($groupBooking->members as $member) {
                if ($member->booking_id) {
                    Booking::find($member->booking_id)?->delete();
                }
            }

            $groupBooking->delete();

            // Hapus akun User milik grup (bukan akun anggota)
            if ($groupUserId) {
                User::find($groupUserId)?->delete();
            }

            return redirect()->route('admin.users.index', ['tab' => 'groups'])
                ->with('success', 'Grup dan seluruh datanya berhasil dihapus.');
        });
    }

    // ── SHOW (detail grup + daftar anggota) ───────────────────────────────────

    public function show(GroupBooking $groupBooking)
    {
        $groupBooking->load([
            'user',
            'createdBy',
            'schedule.therapist',
            'members.user',
            'members.booking.schedule.therapist',
            'members.booking.transaction.validatedBy',
        ]);

        $groupBooking->members->each(function ($m) {
            if ($m->user) {
                $m->user->append('profile_completion');
            }
        });

        $now = Carbon::now('Asia/Jakarta');
        $schedules = Schedule::where('schedule_type', 'consultation')
            ->where('date', '>=', $now->toDateString())
            ->whereNotNull('therapist_id')
            ->where('status', 'available')
            ->withCount(['bookings as confirmed_count' => fn($q) => $q->whereIn('status', Booking::SLOT_OCCUPYING_STATUSES)])
            ->with('therapist:id,name')
            ->orderBy('date')->orderBy('start_time')
            ->get()
            ->filter(fn($s) => $s->confirmed_count < $s->quota)
            ->values();

        $bookingPackages = Package::orderBy('base_price')->get()->map(fn($p) => [
            'slug'  => $p->slug,
            'name'  => $p->name,
            'price' => $p->current_price,
        ]);

        return Inertia::render('Admin/GroupBookings/Show', [
            'group'           => $groupBooking,
            'schedules'       => $schedules,
            'bookingPackages' => $bookingPackages,
        ]);
    }

    // ── ADD MEMBER (form tambah anggota) ──────────────────────────────────────

    public function addMember(GroupBooking $groupBooking)
    {
        $roles = Role::whereNotIn('name', ['super_admin'])->get(['id', 'name']);
        
        $now = Carbon::now('Asia/Jakarta');
        $schedules = Schedule::where('schedule_type', 'consultation')
            ->where('date', '>=', $now->toDateString())
            ->whereNotNull('therapist_id')
            ->where('status', 'available')
            ->withCount(['bookings as confirmed_count' => fn($q) => $q->whereIn('status', Booking::SLOT_OCCUPYING_STATUSES)])
            ->with('therapist:id,name')
            ->orderBy('date')->orderBy('start_time')
            ->get()
            ->filter(fn($s) => $s->confirmed_count < $s->quota)
            ->values();

        $bookingPackages = Package::orderBy('base_price')->get()->map(fn($p) => [
            'slug'  => $p->slug,
            'name'  => $p->name,
            'price' => $p->current_price,
            'online_price' => $p->online_current_price ?? $p->current_price,
        ]);

        return Inertia::render('Admin/GroupBookings/AddMember', [
            'group'           => $groupBooking,
            'roles'           => $roles,
            'genderOptions'   => self::GENDER_OPTIONS,
            'severityOptions' => self::SEVERITY_OPTIONS,
            'packageOptions'  => self::PACKAGE_OPTIONS,
            'schedules'       => $schedules,
            'bookingPackages' => $bookingPackages,
            'paymentMethodsBySession' => [
                'online'  => ['Transfer Bank'],
                'offline' => ['Transfer Bank', 'Cash'],
            ],
            'bankAccounts'    => config('clinic.bank_accounts', []),
            'sessionTypeOptions' => self::SESSION_TYPE_OPTIONS,
        ]);
    }

    // ── STORE MEMBER ──────────────────────────────────────────────────────────

    public function storeMember(Request $request, GroupBooking $groupBooking)
    {
        $genderValues   = array_column(self::GENDER_OPTIONS, 'value');
        $severityValues = self::SEVERITY_OPTIONS;
        $packageValues  = Package::pluck('slug')->toArray();

        $request->validate([
            'disclaimer_confirmed'       => 'required|accepted',
            'name'                       => 'required|string|max:255',
            'email'                      => 'required|string|email|max:255|unique:users',
            'password'                   => 'required|string|min:8|confirmed',
            'phone'                      => 'nullable|string|max:20',
            'age'                        => 'nullable|integer|min:1|max:120',
            'gender'                     => ['nullable', Rule::in($genderValues)],
            'ktp_photo'                  => 'nullable|image|max:5120',
            'emergency_contact_name'     => 'nullable|string|max:255',
            'emergency_contact_phone'    => 'nullable|string|max:20',
            'emergency_contact_relation' => 'nullable|string|max:255',
            'roles'                      => 'array',
            'screening_type'             => 'required|in:online,manual',
            'severity_label'             => ['nullable', 'required_if:screening_type,manual', Rule::in($severityValues)],
            'recommended_package'        => ['nullable', 'required_if:screening_type,manual', Rule::in($packageValues)],
            'admin_notes'                => 'nullable|string',
            'is_high_risk'               => 'nullable|boolean',
            'agreement_signed_offline'   => 'nullable|boolean',
            // Booking & Payment
            'schedule_id'                => 'nullable|exists:schedules,id',
            'package_type'               => ['nullable', Rule::in($packageValues)],
            'payment_status'             => 'nullable|in:pending,paid',
            'payment_method'             => 'nullable|string',
            'payment_proof'              => 'nullable|image|max:5120',
        ], [
            'disclaimer_confirmed.accepted' => 'Anda harus menyetujui disclaimer sebelum mendaftarkan anggota.',
            'email.unique'                  => 'Email ini sudah terdaftar. Gunakan email lain.',
        ]);

        return DB::transaction(function () use ($request, $groupBooking) {
            // 1. Buat User
            $userData = [
                'name'                       => $request->name,
                'email'                      => $request->email,
                'password'                   => Hash::make($request->password),
                'phone'                      => $request->phone,
                'age'                        => $request->age,
                'gender'                     => $request->gender,
                'emergency_contact_name'     => $request->emergency_contact_name,
                'emergency_contact_phone'    => $request->emergency_contact_phone,
                'emergency_contact_relation' => $request->emergency_contact_relation,
                'email_verified_at'          => now(),
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
            
            $roles = $request->filled('roles') ? $request->roles : ['patient'];
            $user->syncRoles($roles);

            // 2. Skrining (Manual)
            if ($request->screening_type === 'manual') {
                \App\Models\ScreeningResult::create([
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

            // 3. Tambah ke Grup
            $member = GroupBookingMember::create([
                'group_booking_id' => $groupBooking->id,
                'user_id'          => $user->id,
                'booking_id'       => null,
                'package_type'     => $request->package_type ?? $request->recommended_package ?? $groupBooking->package_type,
                'price'            => 0,
            ]);

            // 4. Buat Booking & Transaksi Individual (honor payment_status)
            $scheduleId  = $request->schedule_id ?? $groupBooking->schedule_id;
            $packageSlug = $member->package_type;
            
            if ($scheduleId) {
                $schedule = Schedule::findOrFail($scheduleId);
                $isPaid   = $request->payment_status === 'paid';

                $booking = Booking::create([
                    'booking_code' => $this->generateBookingCode(),
                    'patient_id'   => $user->id,
                    'schedule_id'  => $schedule->id,
                    'therapist_id' => $schedule->therapist_id,
                    'package_type' => $packageSlug,
                    'session_type' => $groupBooking->session_type ?? 'offline',
                    'status'       => $isPaid ? 'confirmed' : 'pending_payment',
                    'notes'        => $groupBooking->notes,
                ]);

                $member->update(['booking_id' => $booking->id]);

                $package       = Package::where('slug', $packageSlug)->first();
                $basePrice     = $package?->current_price ?? 0;
                $taxPercent    = config('clinic.tax_percentage', 11);
                $priceWithTax  = $basePrice * (1 + ($taxPercent / 100));
                $amount        = round($priceWithTax) + rand(101, 999);

                $transactionData = [
                    'user_id'        => $user->id,
                    'invoice_number' => 'INV-' . strtoupper(Str::random(10)),
                    'amount'         => $amount,
                    'status'         => $isPaid ? 'paid' : 'pending',
                    'payment_method' => $request->payment_method ?? 'Transfer Bank',
                    'paid_at'        => $isPaid ? now() : null,
                ];

                if ($request->hasFile('payment_proof')) {
                    $transactionData['payment_proof'] = $request->file('payment_proof')->store('payment_proofs', 'public');
                }

                $booking->transaction()->create($transactionData);
            }

            // Pastikan session type grup tetap offline
            if ($groupBooking->session_type !== 'offline') {
                $groupBooking->update(['session_type' => 'offline']);
            }

            return redirect()->route('admin.group-bookings.show', $groupBooking->id)
                ->with('success', "Anggota {$request->name} berhasil ditambahkan ke grup" . ($scheduleId ? " dan jadwal disinkronkan." : "."));
        });
    }

    // ── UPDATE SCHEDULE ───────────────────────────────────────────────────────

    public function updateSchedule(Request $request, GroupBooking $groupBooking)
    {
        $packageValues = Package::pluck('slug')->toArray();

        $request->validate([
            'schedule_id'  => 'required|exists:schedules,id',
            'package_type' => ['nullable', Rule::in($packageValues)],
        ]);

        $groupBooking->update([
            'schedule_id'  => $request->schedule_id,
            'package_type' => $request->package_type,
        ]);

        $this->syncMemberBookings($groupBooking);

        return redirect()->back()->with('success', 'Jadwal grup berhasil disimpan. Booking anggota telah disinkronkan.');
    }

    // ── REMOVE MEMBER ─────────────────────────────────────────────────────────

    public function removeMember(GroupBooking $groupBooking, GroupBookingMember $group_booking_member)
    {
        DB::transaction(function () use ($group_booking_member) {
            if ($group_booking_member->booking) {
                $group_booking_member->booking->transaction()->delete();
                $group_booking_member->booking->delete();
            }
            $group_booking_member->delete();
        });

        return redirect()->back()->with('success', 'Anggota berhasil dihapus dari grup.');
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────

    private function generateBookingCode(): string
    {
        $year = now()->year;
        do {
            $count = Booking::whereYear('created_at', $year)->count() + 1;
            $code  = sprintf('BK-%d-%04d', $year, $count + rand(0, 9));
        } while (Booking::where('booking_code', $code)->exists());

        return $code;
    }

    private function syncMemberBookings(GroupBooking $groupBooking): void
    {
        if (!$groupBooking->schedule_id) return;

        $schedule = Schedule::find($groupBooking->schedule_id);
        if (!$schedule) return;

        $groupBooking->loadMissing('members');

        foreach ($groupBooking->members as $member) {
            $packageSlug = $member->package_type ?? $groupBooking->package_type ?? 'reguler';

            if (!$member->booking_id) {
                // Buat booking individual untuk anggota — anggota bayar sendiri
                $booking = Booking::create([
                    'booking_code' => $this->generateBookingCode(),
                    'patient_id'   => $member->user_id,
                    'schedule_id'  => $schedule->id,
                    'therapist_id' => $schedule->therapist_id,
                    'package_type' => $packageSlug,
                    'session_type' => $groupBooking->session_type,
                    'status'       => 'pending_payment',
                    'notes'        => $groupBooking->notes,
                ]);

                $member->update(['booking_id' => $booking->id]);

                // Buat Transaction — amount dihitung (anggota pilih Transfer/Tunai di halaman pembayaran)
                $package       = Package::where('slug', $packageSlug)->first();
                $basePrice     = $package?->current_price ?? 0;
                
                // Use config-based tax or fallback to 11%
                $taxPercent    = config('clinic.tax_percentage', 11);
                $priceWithTax  = $basePrice * (1 + ($taxPercent / 100));
                
                $uniqueCode    = rand(101, 999); 
                $amount        = round($priceWithTax) + $uniqueCode;

                $booking->transaction()->create([
                    'user_id'        => $member->user_id,
                    'invoice_number' => 'INV-' . strtoupper(Str::random(10)),
                    'amount'         => $amount,
                    'status'         => 'pending',
                    // payment_method null → anggota pilih sendiri di halaman pembayaran
                ]);
            } else {
                // Update jadwal jika berubah
                $booking = Booking::find($member->booking_id);
                if ($booking && $booking->schedule_id !== $schedule->id) {
                    $booking->update([
                        'schedule_id'  => $schedule->id,
                        'therapist_id' => $schedule->therapist_id,
                    ]);
                }
            }
        }
    }
}
