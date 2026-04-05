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
        return Inertia::render('Admin/GroupBookings/AddMember', [
            'group' => $groupBooking,
        ]);
    }

    // ── STORE MEMBER ──────────────────────────────────────────────────────────

    public function storeMember(Request $request, GroupBooking $groupBooking)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required'       => 'Nama anggota wajib diisi.',
            'email.required'      => 'Email anggota wajib diisi.',
            'email.unique'        => 'Email ini sudah terdaftar. Gunakan email lain.',
            'password.min'        => 'Password minimal 8 karakter.',
            'password.confirmed'  => 'Konfirmasi password tidak cocok.',
        ]);

        return DB::transaction(function () use ($request, $groupBooking) {
            $user = User::create([
                'name'              => $request->name,
                'email'             => $request->email,
                'password'          => Hash::make($request->password),
                'email_verified_at' => now(),
            ]);
            $user->assignRole('patient');

            GroupBookingMember::create([
                'group_booking_id' => $groupBooking->id,
                'user_id'          => $user->id,
                'booking_id'       => null,
                'package_type'     => $groupBooking->package_type,
                'price'            => 0,
            ]);

            $this->syncMemberBookings($groupBooking);

            return redirect()->route('admin.group-bookings.show', $groupBooking->id)
                ->with('success', "Anggota {$request->name} berhasil ditambahkan ke grup.");
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
                    'booking_code'     => $this->generateBookingCode(),
                    'patient_id'       => $member->user_id,
                    'group_booking_id' => $groupBooking->id,
                    'schedule_id'      => $schedule->id,
                    'therapist_id'     => $schedule->therapist_id,
                    'package_type'     => $packageSlug,
                    'session_type'     => $groupBooking->session_type,
                    'status'           => 'pending_payment',
                    'notes'            => $groupBooking->notes,
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
