<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use Carbon\Carbon;

class AutoCloseSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sessions:auto-close';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Otomatis menutup sesi terapi yang sudah berjalan lebih dari 90 menit';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoffTime = Carbon::now()->subMinutes(90);

        $expiredBookings = Booking::where('status', 'in_progress')
            ->where('started_at', '<=', $cutoffTime)
            ->get();

        if ($expiredBookings->isEmpty()) {
            $this->info('Tidak ada sesi yang perlu ditutup.');
            return;
        }

        foreach ($expiredBookings as $booking) {
            /** @var Booking $booking */
            $booking->update([
                'status' => 'completed',
                'ended_at' => $booking->started_at->addMinutes(90),
                'completion_outcome' => 'Normal',
                'therapist_notes' => ($booking->therapist_notes ? $booking->therapist_notes . "\n\n" : "") . "[Sesi ditutup otomatis oleh sistem karena melebihi durasi 90 menit]",
                'patient_visible_notes' => ($booking->patient_visible_notes ? $booking->patient_visible_notes . "\n\n" : "") . "Sesi telah berakhir otomatis sesuai durasi standar.",
            ]);

            $this->info("Booking #{$booking->booking_code} ditutup otomatis.");
        }

        $this->info('Proses penutupan otomatis sesi selesai.');
    }
}
