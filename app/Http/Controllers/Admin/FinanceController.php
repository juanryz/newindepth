<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Commission;
use App\Models\Expense;
use App\Models\PettyCashTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FinanceController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->get('month', now()->format('m'));
        $year = $request->get('year', now()->format('Y'));
        $driver = DB::getDriverName();

        // --- DASHBOARD/REPORTS DATA ---
        $revenue = Transaction::where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('amount');

        $commissions = Commission::whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->sum('commission_amount');

        $pettyCashExpenses = PettyCashTransaction::where('type', 'out')
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->sum('amount');

        $pettyCashInflow = PettyCashTransaction::where('type', 'in')
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->sum('amount');

        $totalExpensesSum = $pettyCashExpenses;

        $pettyCashBalance = PettyCashTransaction::where('type', 'in')->sum('amount')
            - PettyCashTransaction::where('type', 'out')->sum('amount');

        $netIncome = $revenue - $commissions - $totalExpensesSum;

        $revenueByMonth = Transaction::select(
            DB::raw('SUM(amount) as total'),
            DB::raw($driver === 'sqlite' ? 'strftime("%m-%Y", created_at) as month_year' : 'DATE_FORMAT(created_at, "%m-%Y") as month_year'),
            DB::raw($driver === 'sqlite' ? 'strftime("%Y-%m", created_at) as sort_key' : 'DATE_FORMAT(created_at, "%Y-%m") as sort_key')
        )
            ->where('status', 'paid')
            ->where('created_at', '>=', now()->subMonths(11)->startOfMonth())
            ->groupBy('month_year', 'sort_key')
            ->orderBy('sort_key')
            ->get();

        $expensesByCategory = PettyCashTransaction::select(
            DB::raw('"Kas Kecil" as category'),
            DB::raw('SUM(amount) as total')
        )
            ->where('type', 'out')
            ->whereMonth('transaction_date', $month)
            ->whereYear('transaction_date', $year)
            ->groupBy('category')
            ->get();

        // --- PETTY CASH TAB DATA ---
        $pettyCashTransactions = PettyCashTransaction::with('recorder')
            ->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        $proposalStatus = $request->get('proposal_status', 'all');
        $proposalsQuery = \App\Models\PettyCashProposal::with(['user', 'approver', 'proofs.approver'])->latest();

        if ($proposalStatus !== 'all') {
            $proposalsQuery->where('status', $proposalStatus);
        }

        $pettyCashProposals = $proposalsQuery->get();

        return Inertia::render('Admin/Finance/Index', [
            'reports' => [
                'stats' => [
                    'revenue' => (float) $revenue,
                    'commissions' => (float) $commissions,
                    'operational_expenses' => (float) $totalExpensesSum,
                    'petty_cash_expenses' => (float) $pettyCashExpenses,
                    'petty_cash_balance' => (float) $pettyCashBalance,
                    'petty_cash_inflow' => (float) $pettyCashInflow,
                    'expenses' => (float) $totalExpensesSum,
                    'netIncome' => (float) $netIncome,
                ],
                'charts' => [
                    'revenueByMonth' => $revenueByMonth->toArray(),
                    'expensesByCategory' => $expensesByCategory->toArray(),
                ]
            ],
            'pettyCash' => [
                'transactions' => $pettyCashTransactions,
                'proposals' => $pettyCashProposals,
                'currentBalance' => (float) $pettyCashBalance,
            ],
            'userRole' => auth()->user()->roles->pluck('name')->toArray(),
            'filters' => [
                'month' => $month,
                'year' => $year,
                'proposal_status' => $proposalStatus,
                'active_tab' => $request->get('active_tab', 'reports'),
            ]
        ]);
    }

    public function storePettyCash(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:in,out',
            'description' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'receipt' => 'nullable|image|max:2048',
        ]);

        $validated['recorded_by'] = auth()->id();

        if ($request->hasFile('receipt')) {
            $validated['receipt'] = $request->file('receipt')->store('petty_cash', 'public');
        }

        // Calculate balance after
        $currentBalance = PettyCashTransaction::where('type', 'in')->sum('amount')
            - PettyCashTransaction::where('type', 'out')->sum('amount');

        if ($validated['type'] === 'in') {
            $validated['balance_after'] = $currentBalance + $validated['amount'];
        } else {
            $validated['balance_after'] = $currentBalance - $validated['amount'];
        }

        PettyCashTransaction::create($validated);

        return redirect()->back()->with('success', 'Transaksi kas kecil berhasil dicatat.');
    }

    public function destroyPettyCash(PettyCashTransaction $transaction)
    {
        if ($transaction->receipt) {
            Storage::disk('public')->delete($transaction->receipt);
        }
        $transaction->delete();
        return redirect()->back()->with('success', 'Transaksi kas kecil berhasil dihapus.');
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

        $callback = function () use ($transactions) {
            $file = fopen('php://output', 'w');

            // Pemasukan Section
            fputcsv($file, ['BAGIAN 1: PEMASUKAN (PENDAPATAN)'], ';');
            fputcsv($file, ['Tanggal', 'Invoice', 'Customer', 'Jenis', 'Nominal (Rp)'], ';');

            $totalRevenue = 0;
            foreach ($transactions as $tx) {
                $type = $tx->transactionable_type === \App\Models\Booking::class ? 'Sesi Terapi' : 'Kelas E-Learning';
                fputcsv($file, [
                    $tx->created_at->format('Y-m-d H:i'),
                    $tx->invoice_number,
                    $tx->user->name ?? 'Unknown',
                    $type,
                    $tx->amount
                ], ';');
                $totalRevenue += $tx->amount;
            }
            fputcsv($file, ['', '', '', 'TOTAL PEMASUKAN', $totalRevenue], ';');
            fputcsv($file, [], ';'); // Empty line

            // Summary Section
            fputcsv($file, ['RINGKASAN'], ';');
            fputcsv($file, ['Total Pemasukan', '', '', '', $totalRevenue], ';');
            fputcsv($file, ['LABA BERSIH', '', '', '', $totalRevenue], ';');

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
