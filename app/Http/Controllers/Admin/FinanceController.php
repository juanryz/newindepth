<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Commission;
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
        $year  = $request->get('year',  now()->format('Y'));
        $driver = DB::getDriverName();

        // --- PEMASUKAN: gunakan corrected_amount jika tersedia ---
        $paidTransactions = Transaction::with(['user', 'transactionable', 'correctedBy'])
            ->where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($tx) {
                $tx->effective_amount = $tx->corrected_amount !== null
                    ? (float) $tx->corrected_amount
                    : (float) $tx->amount;
                return $tx;
            });

        $revenue = $paidTransactions->sum('effective_amount');

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

        $pettyCashBalance = PettyCashTransaction::where('type', 'in')->sum('amount')
            - PettyCashTransaction::where('type', 'out')->sum('amount');

        $netIncome = $revenue - (float) $commissions - (float) $pettyCashExpenses;

        // Tren pendapatan 12 bulan (gunakan COALESCE agar koreksi diperhitungkan)
        $revenueByMonth = Transaction::select(
            DB::raw('SUM(COALESCE(corrected_amount, amount)) as total'),
            DB::raw($driver === 'sqlite'
                ? 'strftime("%m-%Y", created_at) as month_year'
                : 'DATE_FORMAT(created_at, "%m-%Y") as month_year'),
            DB::raw($driver === 'sqlite'
                ? 'strftime("%Y-%m", created_at) as sort_key'
                : 'DATE_FORMAT(created_at, "%Y-%m") as sort_key')
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

        // --- KAS KECIL ---
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
                    'revenue'               => (float) $revenue,
                    'commissions'           => (float) $commissions,
                    'operational_expenses'  => (float) $pettyCashExpenses,
                    'petty_cash_expenses'   => (float) $pettyCashExpenses,
                    'petty_cash_balance'    => (float) $pettyCashBalance,
                    'petty_cash_inflow'     => (float) $pettyCashInflow,
                    'expenses'              => (float) $pettyCashExpenses,
                    'netIncome'             => (float) $netIncome,
                ],
                'charts' => [
                    'revenueByMonth'      => $revenueByMonth->toArray(),
                    'expensesByCategory'  => $expensesByCategory->toArray(),
                ],
                'transactions' => $paidTransactions->map(fn($tx) => [
                    'id'               => $tx->id,
                    'invoice_number'   => $tx->invoice_number,
                    'created_at'       => $tx->created_at,
                    'user_name'        => $tx->user?->name ?? 'N/A',
                    'amount'           => (float) $tx->amount,
                    'corrected_amount' => $tx->corrected_amount !== null ? (float) $tx->corrected_amount : null,
                    'effective_amount' => (float) $tx->effective_amount,
                    'payment_method'   => $tx->payment_method,
                    'correction_reason'   => $tx->correction_reason,
                    'corrected_by_name'   => $tx->correctedBy?->name,
                    'corrected_at'        => $tx->corrected_at,
                ])->values(),
            ],
            'pettyCash' => [
                'transactions'   => $pettyCashTransactions,
                'proposals'      => $pettyCashProposals,
                'currentBalance' => (float) $pettyCashBalance,
            ],
            'userRole' => auth()->user()->roles->pluck('name')->toArray(),
            'filters'  => [
                'month'           => $month,
                'year'            => $year,
                'proposal_status' => $proposalStatus,
                'active_tab'      => $request->get('active_tab', 'reports'),
            ],
        ]);
    }

    /**
     * Koreksi nominal pemasukan — menghapus angka unik untuk pembayaran Cash.
     */
    public function correctRevenue(Request $request, Transaction $transaction)
    {
        $request->validate([
            'corrected_amount'  => 'required|numeric|min:0',
            'correction_reason' => 'required|string|max:255',
        ]);

        $transaction->update([
            'corrected_amount'  => $request->corrected_amount,
            'correction_reason' => $request->correction_reason,
            'corrected_by'      => auth()->id(),
            'corrected_at'      => now(),
        ]);

        return redirect()->back()->with(
            'success',
            "Koreksi berhasil disimpan untuk invoice {$transaction->invoice_number}."
        );
    }

    public function storePettyCash(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => 'required|date',
            'amount'           => 'required|numeric|min:0',
            'type'             => 'required|in:in,out',
            'description'      => 'required|string|max:255',
            'category'         => 'nullable|string|max:100',
            'receipt'          => 'nullable|image|max:2048',
        ]);

        $validated['recorded_by'] = auth()->id();

        if ($request->hasFile('receipt')) {
            $validated['receipt'] = $request->file('receipt')->store('petty_cash', 'public');
        }

        $currentBalance = PettyCashTransaction::where('type', 'in')->sum('amount')
            - PettyCashTransaction::where('type', 'out')->sum('amount');

        $validated['balance_after'] = $validated['type'] === 'in'
            ? $currentBalance + $validated['amount']
            : $currentBalance - $validated['amount'];

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
        $year  = $request->get('year',  now()->format('Y'));

        $transactions = Transaction::with(['user', 'transactionable'])
            ->where('status', 'paid')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('created_at', 'asc')
            ->get();

        $filename = "Laporan_Keuangan_{$year}_{$month}.csv";
        $headers  = [
            'Content-type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=$filename",
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0',
        ];

        $callback = function () use ($transactions) {
            $file = fopen('php://output', 'w');

            fputcsv($file, ['BAGIAN 1: PEMASUKAN (PENDAPATAN)'], ';');
            fputcsv($file, [
                'Tanggal', 'Invoice', 'Customer', 'Jenis', 'Metode',
                'Nominal Asli (Rp)', 'Nominal Koreksi (Rp)', 'Nominal Efektif (Rp)', 'Alasan Koreksi'
            ], ';');

            $totalRevenue = 0;
            foreach ($transactions as $tx) {
                $type      = $tx->transactionable_type === \App\Models\Booking::class ? 'Sesi Terapi' : 'E-Learning';
                $effective = $tx->corrected_amount !== null ? $tx->corrected_amount : $tx->amount;
                fputcsv($file, [
                    $tx->created_at->format('Y-m-d H:i'),
                    $tx->invoice_number,
                    $tx->user?->name ?? 'Unknown',
                    $type,
                    $tx->payment_method ?? 'transfer',
                    $tx->amount,
                    $tx->corrected_amount ?? '-',
                    $effective,
                    $tx->correction_reason ?? '-',
                ], ';');
                $totalRevenue += $effective;
            }
            fputcsv($file, ['', '', '', '', 'TOTAL', '', '', $totalRevenue, ''], ';');
            fputcsv($file, [], ';');
            fputcsv($file, ['RINGKASAN'], ';');
            fputcsv($file, ['Total Pemasukan Efektif', '', '', '', '', '', '', $totalRevenue, ''], ';');

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
