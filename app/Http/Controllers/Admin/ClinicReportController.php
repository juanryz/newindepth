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
            ]
        ]);
    }
}
