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
        return Inertia::render('Admin/GroupBookings/Create', [
            'paymentMethods' => self::PAYMENT_METHODS_OFFLINE,
        ]);
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
            'payment_method'   => ['required', Rule::in(self::PAYMENT_METHODS_OFFLINE)],
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
            'payment_method'   => $request->payment_method,
            'payment_status'   => 'pending',
            'notes'            => $request->notes,
            'created_by'       => auth()->id(),
        ]);

        return redirect()->route('admin.group-bookings.show', $group->id)
            ->with('success', 'Grup berhasil dibuat. Sekarang tambahkan anggota.');
    }

    // ── SHOW (detail grup + daftar anggota) ───────────────────────────────────

    public function show(GroupBooking $groupBooking)
    {
        $groupBooking->load([
            'createdBy',
            'members.user',
            'members.booking.schedule.therapist',
        ]);

        return Inertia::render('Admin/GroupBookings/Show', [
            'group'       => $groupBooking,
            'invoiceData' => $this->buildInvoiceData($groupBooking),
        ]);
    }

    // ── ADD MEMBER (form tambah anggota) ──────────────────────────────────────

    public function addMember(GroupBooking $groupBooking)
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

        $bookingPackages = Package::orderBy('base_price')
            ->get()
            ->map(fn($p) => [
                'slug'  => $p->slug,
                'name'  => $p->name,
                'price' => $p->current_price,
            ]);

        return Inertia::render('Admin/GroupBookings/AddMember', [
            'group'           => $groupBooking,
            'roles'           => Role::whereIn('name', self::OFFLINE_ASSIGNABLE_ROLES)->get(),
            'severityOptions' => self::SEVERITY_OPTIONS,
            'packageOptions'  => self::PACKAGE_OPTIONS,
            'genderOptions'   => self::GENDER_OPTIONS,
            'schedules'       => $schedules,
            'bookingPackages' => $bookingPackages,
        ]);
    }

    // ── STORE MEMBER (simpan anggota) ─────────────────────────────────────────

    public function storeMember(Request $request, GroupBooking $groupBooking)
    {
        $packageValues = Package::pluck('slug')->toArray();
        $genderValues  = array_column(self::GENDER_OPTIONS, 'value');
        $severityValues = self::SEVERITY_OPTIONS;
        $packageOptValues = array_column(self::PACKAGE_OPTIONS, 'value');

        $request->validate([
            'disclaimer_confirmed'        => 'required|accepted',
            'name'                        => 'required|string|max:255',
            'email'                       => 'required|string|email|max:255|unique:users',
            'password'                    => 'required|string|min:8|confirmed',
            'phone'                       => 'nullable|string|max:20',
            'age'                         => 'nullable|integer|min:1|max:120',
            'gender'                      => ['nullable', Rule::in($genderValues)],
            'emergency_contact_name'      => 'nullable|string|max:255',
            'emergency_contact_phone'     => 'nullable|string|max:20',
            'emergency_contact_relation'  => 'nullable|string|max:255',
            'screening_type'              => 'required|in:online,manual',
            'severity_label'              => ['nullable', 'required_if:screening_type,manual', Rule::in($severityValues)],
            'recommended_package'         => ['nullable', 'required_if:screening_type,manual', Rule::in($packageOptValues)],
            'admin_notes'                 => 'nullable|string',
            'is_high_risk'                => 'nullable|boolean',
            'agreement_signed_offline'    => 'nullable|boolean',
            'schedule_id'                 => 'nullable|exists:schedules,id',
            'package_type'                => ['nullable', 'required_with:schedule_id', Rule::in($packageValues)],
            'booking_notes'               => 'nullable|string|max:1000',
        ], [
            'disclaimer_confirmed.accepted'   => 'Anda harus menyetujui disclaimer sebelum mendaftarkan anggota.',
            'severity_label.required_if'      => 'Tingkat keparahan wajib diisi untuk skrining manual.',
            'recommended_package.required_if' => 'Rekomendasi paket wajib dipilih untuk skrining manual.',
            'package_type.required_with'      => 'Tipe paket wajib dipilih jika jadwal dipilih.',
        ]);

        return DB::transaction(function () use ($request, $groupBooking) {
            // 1. Buat user baru
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

            if ($request->boolean('agreement_signed_offline')) {
                $userData['agreement_signed']    = true;
                $userData['agreement_signed_at'] = now();
                $userData['agreement_data']      = [
                    'signed_offline'       => true,
                    'signed_by_admin_id'   => auth()->id(),
                    'signed_by_admin_name' => auth()->user()->name,
                    'group_booking_id'     => $groupBooking->id,
                    'signed_at'            => now()->toDateTimeString(),
                ];
            }

            $user = User::create($userData);
            $user->markEmailAsVerified();
            $user->assignRole('patient');

            // 2. Skrining (opsional)
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

            // 3. Booking (opsional) — session_type ikut grup (offline)
            $bookingId = null;
            $memberPrice = 0;

            if ($request->filled('schedule_id') && $request->filled('package_type')) {
                $schedule = Schedule::lockForUpdate()->findOrFail($request->schedule_id);

                if ($schedule->status !== 'available' || $schedule->booked_count >= $schedule->quota) {
                    throw new \Exception('Slot jadwal yang dipilih sudah penuh atau tidak tersedia.');
                }

                $package     = Package::where('slug', $request->package_type)->first();
                $basePrice   = $package?->current_price ?? 0;
                $memberPrice = round(($basePrice * 1.11) + rand(101, 999));

                $booking = Booking::create([
                    'booking_code' => $this->generateBookingCode(),
                    'patient_id'   => $user->id,
                    'schedule_id'  => $schedule->id,
                    'therapist_id' => $schedule->therapist_id,
                    'package_type' => $request->package_type,
                    'session_type' => 'offline', // grup selalu offline
                    'status'       => 'pending_payment',
                    'notes'        => $request->booking_notes,
                ]);

                $bookingId = $booking->id;
            }

            // 4. Tambahkan ke grup
            GroupBookingMember::create([
                'group_booking_id' => $groupBooking->id,
                'user_id'          => $user->id,
                'booking_id'       => $bookingId,
                'package_type'     => $request->package_type,
                'price'            => $memberPrice,
            ]);

            // 5. Update total grup
            $groupBooking->recalculateTotal();

            return redirect()->route('admin.group-bookings.show', $groupBooking->id)
                ->with('success', "Anggota {$request->name} berhasil ditambahkan ke grup.");
        });
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
                ->each(function ($member) {
                    if ($member->booking && $member->booking->status === 'pending_payment') {
                        $member->booking->update(['status' => 'confirmed']);

                        $schedule = $member->booking->schedule;
                        if ($schedule) {
                            $schedule->increment('booked_count');
                            if ($schedule->booked_count >= $schedule->quota) {
                                $schedule->update(['status' => 'full']);
                            }
                        }
                    }
                });
        }

        return redirect()->back()->with('success', 'Status pembayaran grup berhasil diperbarui.');
    }

    // ── REMOVE MEMBER ─────────────────────────────────────────────────────────

    public function removeMember(GroupBooking $groupBooking, GroupBookingMember $member)
    {
        // Hanya bisa hapus jika belum paid
        if ($groupBooking->payment_status === 'paid') {
            return redirect()->back()->with('error', 'Tidak dapat menghapus anggota dari grup yang sudah lunas.');
        }

        DB::transaction(function () use ($groupBooking, $member) {
            // Hapus booking jika ada dan masih pending
            if ($member->booking && $member->booking->status === 'pending_payment') {
                $member->booking->transaction()->delete();
                $member->booking->delete();
            }

            $member->delete();
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
}
