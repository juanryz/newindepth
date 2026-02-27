<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PettyCashProposal;
use App\Models\PettyCashProof;
use App\Models\PettyCashTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PettyCashController extends Controller
{
    public function index()
    {
        $proposals = PettyCashProposal::with(['user', 'approver', 'proofs.approver'])
            ->latest()
            ->paginate(10);

        $currentBalance = PettyCashTransaction::where('type', 'in')->sum('amount')
            - PettyCashTransaction::where('type', 'out')->sum('amount');

        return Inertia::render('Admin/PettyCash/Index', [
            'proposals' => $proposals,
            'currentBalance' => (float) $currentBalance,
            'userRole' => auth()->user()->roles->pluck('name')->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:funding,spending',
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['status'] = 'pending';

        PettyCashProposal::create($validated);

        return redirect()->back()->with('success', 'Pengajuan kas kecil berhasil dikirim.');
    }

    public function approveProposal(Request $request, PettyCashProposal $proposal)
    {
        if ($proposal->type === 'funding') {
            $request->validate([
                'transfer_proof' => 'required|image|max:2048',
            ]);

            $path = $request->file('transfer_proof')->store('petty_cash/funding', 'public');

            $proposal->update([
                'status' => 'completed',
                'approved_by' => auth()->id(),
                'approved_at' => now(),
                'transfer_proof' => $path,
            ]);

            // record transaction
            PettyCashTransaction::create([
                'transaction_date' => now()->toDateString(),
                'amount' => $proposal->amount,
                'type' => 'in',
                'description' => "Pengisian Saldo: " . $proposal->title,
                'recorded_by' => auth()->id(),
                'balance_after' => $this->calculateNewBalance('in', $proposal->amount),
            ]);

        } else {
            $proposal->update([
                'status' => 'approved',
                'approved_by' => auth()->id(),
                'approved_at' => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Pengajuan berhasil disetujui.');
    }

    public function rejectProposal(Request $request, PettyCashProposal $proposal)
    {
        $request->validate([
            'rejection_reason' => 'required|string',
        ]);

        $proposal->update([
            'status' => 'rejected',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Pengajuan ditolak.');
    }

    public function storeProof(Request $request, PettyCashProposal $proposal)
    {
        $validated = $request->validate([
            'amount_spent' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'receipt' => 'required|image|max:2048',
        ]);

        $path = $request->file('receipt')->store('petty_cash/proofs', 'public');

        $proposal->proofs()->create([
            'amount_spent' => $validated['amount_spent'],
            'description' => $validated['description'],
            'receipt_path' => $path,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Bukti belanja berhasil diunggah.');
    }

    public function approveProof(PettyCashProof $proof)
    {
        $proof->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        // Record as expense in PettyCashTransaction
        PettyCashTransaction::create([
            'transaction_date' => now()->toDateString(),
            'amount' => $proof->amount_spent,
            'type' => 'out',
            'description' => "Belanja: " . $proof->description . " (Ref: " . $proof->proposal->title . ")",
            'receipt' => $proof->receipt_path,
            'recorded_by' => auth()->id(),
            'balance_after' => $this->calculateNewBalance('out', $proof->amount_spent),
        ]);

        // If it's a spending proposal and all spending is accounted for, maybe mark as completed?
        // But the requirements are not specific, so we just stick to proof approval.

        return redirect()->back()->with('success', 'Bukti belanja disetujui.');
    }

    public function rejectProof(PettyCashProof $proof)
    {
        $proof->update([
            'status' => 'rejected',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Bukti belanja ditolak.');
    }

    private function calculateNewBalance($type, $amount)
    {
        $current = PettyCashTransaction::where('type', 'in')->sum('amount')
            - PettyCashTransaction::where('type', 'out')->sum('amount');

        return $type === 'in' ? $current + $amount : $current - $amount;
    }
}
