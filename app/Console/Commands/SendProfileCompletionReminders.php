<?php

namespace App\Console\Commands;

use App\Mail\ProfileCompletionReminder;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendProfileCompletionReminders extends Command
{
    protected $signature = 'users:send-profile-reminders';
    protected $description = 'Send weekly email reminders to users who have incomplete profiles';

    public function handle()
    {
        $users = User::whereHas('roles', function ($q) {
                $q->whereNotIn('name', ['super_admin', 'admin', 'cs']);
            })
            ->where(function ($q) {
                $q->whereNull('profile_reminder_sent_at')
                    ->orWhere('profile_reminder_sent_at', '<', now()->subDays(7));
            })
            ->get();

        $sent = 0;
        $skipped = 0;

        foreach ($users as $user) {
            $stats = $user->getProfileCompletionStats();

            if ($stats['is_complete']) {
                $skipped++;
                continue;
            }

            try {
                Mail::to($user->email)->send(new ProfileCompletionReminder($user));
                $user->updateQuietly(['profile_reminder_sent_at' => now()]);
                $this->info("Sent profile reminder to: {$user->email} ({$stats['percentage']}% complete)");
                $sent++;
            } catch (\Exception $e) {
                $this->error("Failed to send reminder to {$user->email}: " . $e->getMessage());
            }
        }

        $this->info("Done. Sent: {$sent}, Skipped (complete): {$skipped}");
    }
}
