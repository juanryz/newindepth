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

        $driver = \Illuminate\Support\Facades\DB::getDriverName();
        // Chart Data: Revenue per Month (last 12 months)
        $revenueByMonth = Transaction::select(
            \Illuminate\Support\Facades\DB::raw('SUM(amount) as total'),
            \Illuminate\Support\Facades\DB::raw($driver === 'sqlite' ? 'strftime("%m-%Y", created_at) as month_year' : 'DATE_FORMAT(created_at, "%m-%Y") as month_year'),
            \Illuminate\Support\Facades\DB::raw($driver === 'sqlite' ? 'strftime("%Y-%m", created_at) as sort_key' : 'DATE_FORMAT(created_at, "%Y-%m") as sort_key')
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

        // Chart Data: Expenses by Category (this month)
        $expensesByCategory = Expense::select(
            'category',
            \Illuminate\Support\Facades\DB::raw('SUM(amount) as total')
        )
            ->whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->groupBy('category')
            ->get();

        $recentTransactions = Transaction::with(['user', 'transactionable'])
            ->where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $recentExpenses = Expense::whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->orderBy('expense_date', 'desc')
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
            'recentExpenses' => $recentExpenses,
            'filters' => [
                'month' => $month,
                'year' => $year,
            ],
            'charts' => [
                'revenueByMonth' => $revenueByMonth,
                'topTherapists' => $topTherapists,
                'bookingsByStatus' => $bookingsByStatus,
                'expensesByCategory' => $expensesByCategory,
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

        $expenses = Expense::whereMonth('expense_date', $month)
            ->whereYear('expense_date', $year)
            ->orderBy('expense_date', 'asc')
            ->get();

        $filename = "Laporan_Keuangan_{$year}_{$month}.csv";

        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $callback = function () use ($transactions, $expenses) {
            $file = fopen('php://output', 'w');

            // Pemasukan Section
            fputcsv($file, ['BAGIAN 1: PEMASUKAN (PENDAPATAN)']);
            fputcsv($file, ['Tanggal', 'Invoice', 'Customer', 'Jenis', 'Nominal (Rp)']);

            $totalRevenue = 0;
            foreach ($transactions as $tx) {
                $type = $tx->transactionable_type === \App\Models\Booking::class ? 'Sesi Terapi' : 'Kelas E-Learning';
                fputcsv($file, [
                    $tx->created_at->format('Y-m-d H:i'),
                    $tx->invoice_number,
                    $tx->user->name ?? 'Unknown',
                    $type,
                    $tx->amount
                ]);
                $totalRevenue += $tx->amount;
            }
            fputcsv($file, ['', '', '', 'TOTAL PEMASUKAN', $totalRevenue]);
            fputcsv($file, []); // Empty line

            // Pengeluaran Section
            fputcsv($file, ['BAGIAN 2: PENGELUARAN (BIAYA OPERASIONAL)']);
            fputcsv($file, ['Tanggal', 'Kategori', 'Deskripsi', '', 'Nominal (Rp)']);

            $totalExpenses = 0;
            foreach ($expenses as $ex) {
                fputcsv($file, [
                    $ex->expense_date,
                    $ex->category,
                    $ex->description,
                    '',
                    $ex->amount
                ]);
                $totalExpenses += $ex->amount;
            }
            fputcsv($file, ['', '', '', 'TOTAL PENGELUARAN', $totalExpenses]);
            fputcsv($file, []);

            // Summary Section
            fputcsv($file, ['RINGKASAN']);
            fputcsv($file, ['Total Pemasukan', '', '', '', $totalRevenue]);
            fputcsv($file, ['Total Pengeluaran', '', '', '', $totalExpenses]);
            fputcsv($file, ['LABA BERSIH', '', '', '', $totalRevenue - $totalExpenses]);

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
