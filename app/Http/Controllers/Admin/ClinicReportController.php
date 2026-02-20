<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Commission;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClinicReportController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->get('month', now()->format('m'));
        $year = $request->get('year', now()->format('Y'));

        // Chart Data: Revenue per Month (last 12 months)
        $revenueByMonth = Transaction::select(
            \Illuminate\Support\Facades\DB::raw('SUM(amount) as total'),
            \Illuminate\Support\Facades\DB::raw('strftime("%m-%Y", created_at) as month_year'),
            \Illuminate\Support\Facades\DB::raw('strftime("%Y-%m", created_at) as sort_key')
        )
            ->where('status', 'paid')
            ->where('created_at', '>=', now()->subMonths(11)->startOfMonth())
            ->groupBy('month_year', 'sort_key')
            ->orderBy('sort_key')
            ->get();

        // Chart Data: Top 5 Therapists (by paid booking count this month)
        $topTherapists = \App\Models\Booking::select(
            'therapist_id',
            \Illuminate\Support\Facades\DB::raw('COUNT(id) as total_bookings')
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->where('status', 'done')
            ->with('therapist:id,name')
            ->groupBy('therapist_id')
            ->orderByDesc('total_bookings')
            ->take(5)
            ->get()
            ->map(function ($booking) {
                return [
                    'name' => $booking->therapist->name ?? 'Unknown',
                    'bookings' => $booking->total_bookings
                ];
            });

        // Chart Data: Bookings by Status (this month)
        $bookingsByStatus = \App\Models\Booking::select(
            'status',
            \Illuminate\Support\Facades\DB::raw('COUNT(id) as count')
        )
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->groupBy('status')
            ->get();
        $month = $request->get('month', now()->format('m'));
        $year = $request->get('year', now()->format('Y'));

        // Pendapatan (Transactions yang berstatus 'paid')
        $revenue = Transaction::where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('amount');

        // Komisi Afiliasi (Commissions yang berstatus 'paid' atau 'pending' dari transaksi bulan ini)
        $commissions = Commission::whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('commission_amount');

        // Pengeluaran Operasional
        $expenses = Expense::whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->sum('amount');

        $netIncome = $revenue - $commissions - $expenses;

        $recentTransactions = Transaction::with(['user', 'transactionable'])
            ->where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'stats' => [
                'revenue' => $revenue,
                'commissions' => $commissions,
                'expenses' => $expenses,
                'netIncome' => $netIncome,
            ],
            'recentTransactions' => $recentTransactions,
            'filters' => [
                'month' => $month,
                'year' => $year,
            ],
            'charts' => [
                'revenueByMonth' => $revenueByMonth,
                'topTherapists' => $topTherapists,
                'bookingsByStatus' => $bookingsByStatus,
            ]
        ]);
    }

    public function exportCsv(Request $request)
    {
        $month = $request->get('month', now()->format('m'));
        $year = $request->get('year', now()->format('Y'));

        $transactions = Transaction::with(['user', 'transactionable'])
            ->where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('created_at', 'asc')
            ->get();

        $filename = "Laporan_Keuangan_{$year}_{$month}.csv";

        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $columns = ['Tanggal', 'Invoice', 'Customer', 'Jenis', 'Nominal (Rp)'];

        $callback = function () use ($transactions, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            $total = 0;
            foreach ($transactions as $tx) {
                $type = $tx->transactionable_type === \App\Models\Booking::class ? 'Sesi Terapi' : 'Kelas E-Learning';
                fputcsv($file, [
                    $tx->created_at->format('Y-m-d H:i'),
                    $tx->invoice_number,
                    $tx->user->name ?? 'Unknown',
                    $type,
                    $tx->amount
                ]);
                $total += $tx->amount;
            }

            fputcsv($file, ['', '', '', 'TOTAL', $total]);
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
