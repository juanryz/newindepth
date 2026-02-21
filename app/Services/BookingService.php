<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
use Exception;

class BookingService
{
    /**
     * Creates a new booking with pessimistic locking to prevent race conditions.
     *
     * @param array $data
     * @param int $patientId
     * @return Booking
     * @throws Exception
     */
    public function createBooking(array $data, int $patientId): Booking
    {
        return DB::transaction(function () use ($data, $patientId) {
            // Lock the specific schedule row to prevent parallel bookings
            $schedule = Schedule::where('id', $data['schedule_id'])
                ->lockForUpdate()
                ->first();

            if (!$schedule) {
                throw new Exception('Jadwal tidak ditemukan.');
            }

            // Check if still available after acquiring lock
            if ($schedule->status !== 'available' || $schedule->booked_count >= $schedule->quota) {
                throw new Exception('Maaf, slot ini baru saja penuh. Silakan pilih slot lain.');
            }

            // Increment booked count
            $schedule->increment('booked_count');

            // Update status if quota reached
            if ($schedule->booked_count >= $schedule->quota) {
                $schedule->update(['status' => 'full']);
            }

            // Create booking
            $booking = Booking::create([
                'booking_code' => $this->generateBookingCode(),
                'patient_id' => $patientId,
                'schedule_id' => $schedule->id,
                'package_type' => $data['package_type'], // Using locked package from controller
                'affiliate_ref_code' => cookie('ref_code'), // Automatically pulls from cookie
                'status' => 'pending_payment', // Skip screening status, go straight to payment since screening is done earlier
            ]);

            $basePrice = match ($data['package_type']) {
                'vip' => 8000000,
                'upgrade' => 1500000,
                default => 1000000,
            };
            $uniqueCode = rand(101, 999);
            $amount = $basePrice + $uniqueCode;

            $booking->transaction()->create([
                'user_id' => $patientId,
                'invoice_number' => 'INV-' . strtoupper(\Illuminate\Support\Str::random(10)),
                'amount' => $amount,
                'status' => 'pending',
            ]);

            return $booking;
        });
    }

    private function generateBookingCode(): string
    {
        $year = now()->year;
        $count = Booking::whereYear('created_at', $year)->count() + 1;
        return sprintf('BK-%d-%04d', $year, $count);
    }
}
