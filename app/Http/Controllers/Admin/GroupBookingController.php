<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\GroupBooking;
use App\Models\GroupBookingMember;
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

class GroupBookingController extends Controller
{
    // Constants — soft-coded, single source of truth
    private const OFFLINE_ASSIGNABLE_ROLES = ['patient'];

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

    // Grup hanya bisa offline → kedua metode pembayaran tersedia
    private const PAYMENT_METHODS_OFFLINE = ['Transfer Bank', 'Cash'];

    // ── INDEX ──────────────────────────────────────────────────────────────────

    public function index(Request $request)
    {
        $groups = GroupBooking::with(['createdBy', 'members'])
            ->withCount('members')
            ->when($request->filled('search'), fn($q) =>
                $q->where('group_name', 'like', '%' . $request->search . '%')
                  ->orWhere('institution_name', 'like', '%' . $request->search . '%')
                  ->orWhere('pic_name', 'like', '%' . $request->search . '%')
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

    // ── STORE (simpan data grup) ───────────────────────────────────────────────

    public function store(Request $request)
    {
        $request->validate([
            'group_name'       => 'required|string|max:255',
            'institution_name' => 'nullable|string|max:255',
            'address'          => 'nullable|string|max:1000',
            'pic_name'         => 'required|string|max:255',
            'pic_phone'        => 'nullable|string|max:20',
            'pic_email'        => 'nullable|email|max:255',
            'notes'            => 'nullable|string|max:2000',
        ]);

        $group = GroupBooking::create([
            'invoice_number'   => GroupBooking::generateInvoiceNumber(),
            'group_name'       => $request->group_name,
            'institution_name' => $request->institution_name,
            'address'          => $request->address,
            'pic_name'         => $request->pic_name,
            'pic_phone'        => $request->pic_phone,
            'pic_email'        => $request->pic_email,
            'session_type'     => 'offline', // grup selalu offline
            'payment_method'   => null,       // diisi setelah anggota ditambahkan
            'payment_status'   => 'pending',
            'notes'            => $request->notes,
            'created_by'       => auth()->id(),
        ]);

        return redirect()->route('admin.group-bookings.show', $group->id)
            ->with('success', 'Grup berhasil dibuat. Tambahkan anggota lalu tentukan metode pembayaran.');
    }

    // ── EDIT (form edit grup) ─────────────────────────────────────────────────

    public function edit(GroupBooking $groupBooking)
    {
        return Inertia::render('Admin/GroupBookings/Create', [
            'group' => $groupBooking,
        ]);
    }

    // ── UPDATE (simpan perubahan grup) ────────────────────────────────────────

    public function update(Request $request, GroupBooking $groupBooking)
    {
        $request->validate([
            'group_name'       => 'required|string|max:255',
            'institution_name' => 'nullable|string|max:255',
            'address'          => 'nullable|string|max:1000',
            'pic_name'         => 'required|string|max:255',
            'pic_phone'        => 'nullable|string|max:20',
            'pic_email'        => 'nullable|email|max:255',
            'notes'            => 'nullable|string|max:2000',
        ]);

        $groupBooking->update([
            'group_name'       => $request->group_name,
            'institution_name' => $request->institution_name,
            'address'          => $request->address,
            'pic_name'         => $request->pic_name,
            'pic_phone'        => $request->pic_phone,
            'pic_email'        => $request->pic_email,
            'notes'            => $request->notes,
        ]);

        // If you are coming from the unified User Management tab:
        return redirect()->route('admin.users.index', ['tab' => 'groups'])
            ->with('success', 'Data grup berhasil diperbarui.');
    }

    // ── DESTROY (hapus grup) ──────────────────────────────────────────────────

    public function destroy(GroupBooking $groupBooking)
    {
        return DB::transaction(function () use ($groupBooking) {
            // Delete associated bookings if any
            foreach ($groupBooking->members as $member) {
                if ($member->booking_id) {
                    Booking::find($member->booking_id)?->delete();
                }
            }
            $groupBooking->delete();

            return redirect()->route('admin.users.index', ['tab' => 'groups'])
                ->with('success', 'Grup dan seluruh datanya berhasil dihapus.');
        });
    }

    // ── SHOW (detail grup + daftar anggota) ───────────────────────────────────

    public function show(GroupBooking $groupBooking)
    {
        $groupBooking->load([
            'createdBy',
            'schedule.therapist',
            'members.user',
            'members.booking.schedule.therapist',
        ]);

        // Append profile_completion to each member's user
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
            'invoiceData'     => $this->buildInvoiceData($groupBooking),
            'schedules'       => $schedules,
            'bookingPackages' => $bookingPackages,
            'paymentMethods'  => self::PAYMENT_METHODS_OFFLINE,
            'bankAccounts'    => config('clinic.bank_accounts', []),
        ]);
    }

    // ── UPDATE PAYMENT METHOD + PACKAGE (pilih metode bayar & paket di level grup) ──

    public function updatePaymentMethod(Request $request, GroupBooking $groupBooking)
    {
        $packageValues = Package::pluck('slug')->toArray();

        $request->validate([
            'payment_method' => ['required', Rule::in(self::PAYMENT_METHODS_OFFLINE)],
            'package_type'   => ['nullable', Rule::in($packageValues)],
        ], [
            'payment_method.required' => 'Pilih metode pembayaran terlebih dahulu.',
            'payment_method.in'       => 'Metode pembayaran tidak valid.',
            'package_type.in'         => 'Paket tidak valid.',
        ]);

        if ($groupBooking->payment_status === 'paid') {
            return redirect()->back()->with('error', 'Grup sudah lunas, tidak bisa diubah.');
        }

        return DB::transaction(function () use ($request, $groupBooking) {
            // 1. Cari harga paket yang dipilih
            $pricePerMember = 0;
            if ($request->filled('package_type')) {
                $package = Package::where('slug', $request->package_type)->first();
                $pricePerMember = $package?->current_price ?? 0;
            }

            // 2. Update semua anggota: package_type & price
            $groupBooking->members()->update([
                'package_type' => $request->package_type,
                'price'        => $pricePerMember,
            ]);

            // 3. Update grup
            $groupBooking->update([
                'payment_method' => $request->payment_method,
                'package_type'   => $request->package_type,
            ]);

            // 4. Recalculate total (sum of member prices)
            $groupBooking->recalculateTotal();

            return redirect()->back()->with('success', 'Metode pembayaran dan paket berhasil disimpan. Total diperbarui.');
        });
    }


    // ── ADD MEMBER (form tambah anggota) ──────────────────────────────────────

    public function addMember(GroupBooking $groupBooking)
    {
        return Inertia::render('Admin/GroupBookings/AddMember', [
            'group' => $groupBooking,
        ]);
    }

    // ── STORE MEMBER — hanya data dasar (Name, Email, Password) ─────────────

    public function storeMember(Request $request, GroupBooking $groupBooking)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|string|email|max:255|unique:users',
            'password'              => 'required|string|min:8|confirmed',
        ], [
            'name.required'    => 'Nama anggota wajib diisi.',
            'email.required'   => 'Email anggota wajib diisi.',
            'email.unique'     => 'Email ini sudah terdaftar. Gunakan email lain.',
            'password.min'     => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
        ]);

        return DB::transaction(function () use ($request, $groupBooking) {
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => bcrypt($request->password),
            ]);
            $user->markEmailAsVerified();
            $user->assignRole('patient');

            $groupMember = GroupBookingMember::create([
                'group_booking_id' => $groupBooking->id,
                'user_id'          => $user->id,
                'booking_id'       => null,
                'package_type'     => $groupBooking->package_type,
                'price'            => 0,
            ]);

            $groupBooking->recalculateTotal();
            $this->syncMemberBookings($groupBooking);

            return redirect()->route('admin.group-bookings.show', $groupBooking->id)
                ->with('success', "Anggota {$request->name} berhasil ditambahkan ke grup. Lengkapi profilnya melalui tombol edit.");
        });
    }

    // ── UPDATE SCHEDULE (jadwal di level grup) ─────────────────────────────

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

        return redirect()->back()->with('success', 'Jadwal sesi grup berhasil disimpan dan disinkronisasikan ke Order Manajemen.');
    }


    // ── UPDATE PAYMENT STATUS ─────────────────────────────────────────────────

    public function updatePayment(Request $request, GroupBooking $groupBooking)
    {
        $request->validate([
            'payment_status' => ['required', Rule::in(['pending', 'paid'])],
            'payment_method' => ['nullable', Rule::in(self::PAYMENT_METHODS_OFFLINE)],
        ]);

        $groupBooking->update([
            'payment_status' => $request->payment_status,
            'payment_method' => $request->payment_method ?? $groupBooking->payment_method,
            'paid_at'        => $request->payment_status === 'paid' ? now() : null,
        ]);

        // Konfirmasi semua booking anggota jika grup sudah bayar
        if ($request->payment_status === 'paid') {
            $groupBooking->members()
                ->whereNotNull('booking_id')
                ->each(function ($member) use ($request) {
                    if ($member->booking && $member->booking->status === 'pending_payment') {
                        $member->booking->update(['status' => 'confirmed']);

                        $schedule = $member->booking->schedule;
                        if ($schedule) {
                            $schedule->increment('booked_count');
                            if ($schedule->booked_count >= $schedule->quota) {
                                $schedule->update(['status' => 'full']);
                            }
                        }
                    } else if ($member->booking && $request->payment_status === 'pending') {
                        $member->booking->update(['status' => 'pending_payment']);
                    }
                });
        }
        
        $this->syncMemberBookings($groupBooking);

        return redirect()->back()->with('success', 'Status pembayaran grup berhasil diperbarui.');
    }

    // ── REMOVE MEMBER ─────────────────────────────────────────────────────────

    public function removeMember(GroupBooking $groupBooking, GroupBookingMember $group_booking_member)
    {
        // Hanya bisa hapus jika belum paid
        if ($groupBooking->payment_status === 'paid') {
            return redirect()->back()->with('error', 'Tidak dapat menghapus anggota dari grup yang sudah lunas.');
        }

        DB::transaction(function () use ($groupBooking, $group_booking_member) {
            // Hapus booking jika ada dan masih pending
            if ($group_booking_member->booking && $group_booking_member->booking->status === 'pending_payment') {
                $group_booking_member->booking->transaction()->delete();
                $group_booking_member->booking->delete();
            }

            $group_booking_member->delete();
            $groupBooking->recalculateTotal();
        });

        return redirect()->back()->with('success', 'Anggota berhasil dihapus dari grup.');
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────

    private function buildInvoiceData(GroupBooking $group): array
    {
        $members = $group->members->map(function ($m) {
            return [
                'name'         => $m->user->name ?? '-',
                'email'        => $m->user->email ?? '-',
                'package_type' => $m->package_type ?? '-',
                'schedule'     => $m->booking?->schedule
                    ? [
                        'date'       => $m->booking->schedule->date,
                        'start_time' => $m->booking->schedule->start_time,
                        'therapist'  => $m->booking->schedule->therapist?->name ?? 'TBD',
                    ]
                    : null,
                'price'        => $m->price,
            ];
        });

        return [
            'invoice_number'   => $group->invoice_number,
            'group_name'       => $group->group_name,
            'institution_name' => $group->institution_name,
            'pic_name'         => $group->pic_name,
            'pic_phone'        => $group->pic_phone,
            'pic_email'        => $group->pic_email,
            'address'          => $group->address,
            'payment_method'   => $group->payment_method,
            'payment_status'   => $group->payment_status,
            'total_amount'     => $group->total_amount,
            'created_at'       => $group->created_at,
            'paid_at'          => $group->paid_at,
            'members'          => $members,
            'created_by'       => $group->createdBy?->name,
        ];
    }

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
        $isPaid = $groupBooking->payment_status === 'paid';

        foreach ($groupBooking->members as $member) {
            if (!$member->booking_id) {
                // Create a booking for this member
                $packageSlug = $member->package_type ?? $groupBooking->package_type ?? 'reguler';
                
                $booking = Booking::create([
                    'booking_code' => $this->generateBookingCode(),
                    'patient_id'   => $member->user_id,
                    'schedule_id'  => $schedule->id,
                    'therapist_id' => $schedule->therapist_id,
                    'package_type' => $packageSlug,
                    'session_type' => $groupBooking->session_type,
                    'status'       => $isPaid ? 'confirmed' : 'pending_payment',
                    'notes'        => $groupBooking->notes,
                ]);

                $member->update(['booking_id' => $booking->id]);

                // If paid, slot gets occupied
                if ($isPaid) {
                    $schedule->increment('booked_count');
                    if ($schedule->booked_count >= $schedule->quota) {
                        $schedule->update(['status' => 'full']);
                    }
                }
            } else {
                // Update existing booking schedule if it differs
                $booking = Booking::find($member->booking_id);
                if ($booking && $booking->schedule_id !== $schedule->id) {
                    $booking->update([
                        'schedule_id' => $schedule->id,
                        'therapist_id' => $schedule->therapist_id,
                    ]);
                }
            }
        }
    }
}
